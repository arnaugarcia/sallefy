package com.sallefy.web.rest;

import com.sallefy.SallefyApp;
import com.sallefy.domain.FollowUser;
import com.sallefy.repository.FollowUserRepository;
import com.sallefy.service.FollowUserService;
import com.sallefy.service.dto.FollowUserDTO;
import com.sallefy.service.mapper.FollowUserMapper;
import com.sallefy.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static com.sallefy.web.rest.TestUtil.sameInstant;
import static com.sallefy.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link FollowUserResource} REST controller.
 */
@SpringBootTest(classes = SallefyApp.class)
public class FollowUserResourceIT {

    private static final ZonedDateTime DEFAULT_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);
    private static final ZonedDateTime SMALLER_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(-1L), ZoneOffset.UTC);

    @Autowired
    private FollowUserRepository followUserRepository;

    @Autowired
    private FollowUserMapper followUserMapper;

    @Autowired
    private FollowUserService followUserService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restFollowUserMockMvc;

    private FollowUser followUser;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FollowUserResource followUserResource = new FollowUserResource(followUserService);
        this.restFollowUserMockMvc = MockMvcBuilders.standaloneSetup(followUserResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FollowUser createEntity(EntityManager em) {
        FollowUser followUser = new FollowUser()
            .date(DEFAULT_DATE);
        return followUser;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FollowUser createUpdatedEntity(EntityManager em) {
        FollowUser followUser = new FollowUser()
            .date(UPDATED_DATE);
        return followUser;
    }

    @BeforeEach
    public void initTest() {
        followUser = createEntity(em);
    }

    @Test
    @Transactional
    public void createFollowUser() throws Exception {
        int databaseSizeBeforeCreate = followUserRepository.findAll().size();

        // Create the FollowUser
        FollowUserDTO followUserDTO = followUserMapper.toDto(followUser);
        restFollowUserMockMvc.perform(post("/api/follow-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(followUserDTO)))
            .andExpect(status().isCreated());

        // Validate the FollowUser in the database
        List<FollowUser> followUserList = followUserRepository.findAll();
        assertThat(followUserList).hasSize(databaseSizeBeforeCreate + 1);
        FollowUser testFollowUser = followUserList.get(followUserList.size() - 1);
        assertThat(testFollowUser.getDate()).isEqualTo(DEFAULT_DATE);
    }

    @Test
    @Transactional
    public void createFollowUserWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = followUserRepository.findAll().size();

        // Create the FollowUser with an existing ID
        followUser.setId(1L);
        FollowUserDTO followUserDTO = followUserMapper.toDto(followUser);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFollowUserMockMvc.perform(post("/api/follow-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(followUserDTO)))
            .andExpect(status().isBadRequest());

        // Validate the FollowUser in the database
        List<FollowUser> followUserList = followUserRepository.findAll();
        assertThat(followUserList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllFollowUsers() throws Exception {
        // Initialize the database
        followUserRepository.saveAndFlush(followUser);

        // Get all the followUserList
        restFollowUserMockMvc.perform(get("/api/follow-users?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(followUser.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(sameInstant(DEFAULT_DATE))));
    }
    
    @Test
    @Transactional
    public void getFollowUser() throws Exception {
        // Initialize the database
        followUserRepository.saveAndFlush(followUser);

        // Get the followUser
        restFollowUserMockMvc.perform(get("/api/follow-users/{id}", followUser.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(followUser.getId().intValue()))
            .andExpect(jsonPath("$.date").value(sameInstant(DEFAULT_DATE)));
    }

    @Test
    @Transactional
    public void getNonExistingFollowUser() throws Exception {
        // Get the followUser
        restFollowUserMockMvc.perform(get("/api/follow-users/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFollowUser() throws Exception {
        // Initialize the database
        followUserRepository.saveAndFlush(followUser);

        int databaseSizeBeforeUpdate = followUserRepository.findAll().size();

        // Update the followUser
        FollowUser updatedFollowUser = followUserRepository.findById(followUser.getId()).get();
        // Disconnect from session so that the updates on updatedFollowUser are not directly saved in db
        em.detach(updatedFollowUser);
        updatedFollowUser
            .date(UPDATED_DATE);
        FollowUserDTO followUserDTO = followUserMapper.toDto(updatedFollowUser);

        restFollowUserMockMvc.perform(put("/api/follow-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(followUserDTO)))
            .andExpect(status().isOk());

        // Validate the FollowUser in the database
        List<FollowUser> followUserList = followUserRepository.findAll();
        assertThat(followUserList).hasSize(databaseSizeBeforeUpdate);
        FollowUser testFollowUser = followUserList.get(followUserList.size() - 1);
        assertThat(testFollowUser.getDate()).isEqualTo(UPDATED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingFollowUser() throws Exception {
        int databaseSizeBeforeUpdate = followUserRepository.findAll().size();

        // Create the FollowUser
        FollowUserDTO followUserDTO = followUserMapper.toDto(followUser);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFollowUserMockMvc.perform(put("/api/follow-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(followUserDTO)))
            .andExpect(status().isBadRequest());

        // Validate the FollowUser in the database
        List<FollowUser> followUserList = followUserRepository.findAll();
        assertThat(followUserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFollowUser() throws Exception {
        // Initialize the database
        followUserRepository.saveAndFlush(followUser);

        int databaseSizeBeforeDelete = followUserRepository.findAll().size();

        // Delete the followUser
        restFollowUserMockMvc.perform(delete("/api/follow-users/{id}", followUser.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<FollowUser> followUserList = followUserRepository.findAll();
        assertThat(followUserList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FollowUser.class);
        FollowUser followUser1 = new FollowUser();
        followUser1.setId(1L);
        FollowUser followUser2 = new FollowUser();
        followUser2.setId(followUser1.getId());
        assertThat(followUser1).isEqualTo(followUser2);
        followUser2.setId(2L);
        assertThat(followUser1).isNotEqualTo(followUser2);
        followUser1.setId(null);
        assertThat(followUser1).isNotEqualTo(followUser2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(FollowUserDTO.class);
        FollowUserDTO followUserDTO1 = new FollowUserDTO();
        followUserDTO1.setId(1L);
        FollowUserDTO followUserDTO2 = new FollowUserDTO();
        assertThat(followUserDTO1).isNotEqualTo(followUserDTO2);
        followUserDTO2.setId(followUserDTO1.getId());
        assertThat(followUserDTO1).isEqualTo(followUserDTO2);
        followUserDTO2.setId(2L);
        assertThat(followUserDTO1).isNotEqualTo(followUserDTO2);
        followUserDTO1.setId(null);
        assertThat(followUserDTO1).isNotEqualTo(followUserDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(followUserMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(followUserMapper.fromId(null)).isNull();
    }
}
