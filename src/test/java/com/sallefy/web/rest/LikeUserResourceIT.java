package com.sallefy.web.rest;

import com.sallefy.SallefyApp;
import com.sallefy.domain.LikeUser;
import com.sallefy.repository.LikeUserRepository;
import com.sallefy.service.LikeUserService;
import com.sallefy.service.dto.LikeUserDTO;
import com.sallefy.service.mapper.LikeUserMapper;
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
 * Integration tests for the {@link LikeUserResource} REST controller.
 */
@SpringBootTest(classes = SallefyApp.class)
public class LikeUserResourceIT {

    private static final Boolean DEFAULT_LIKED = false;
    private static final Boolean UPDATED_LIKED = true;

    private static final ZonedDateTime DEFAULT_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);
    private static final ZonedDateTime SMALLER_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(-1L), ZoneOffset.UTC);

    @Autowired
    private LikeUserRepository likeUserRepository;

    @Autowired
    private LikeUserMapper likeUserMapper;

    @Autowired
    private LikeUserService likeUserService;

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

    private MockMvc restLikeUserMockMvc;

    private LikeUser likeUser;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final LikeUserResource likeUserResource = new LikeUserResource(likeUserService);
        this.restLikeUserMockMvc = MockMvcBuilders.standaloneSetup(likeUserResource)
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
    public static LikeUser createEntity(EntityManager em) {
        LikeUser likeUser = new LikeUser()
            .liked(DEFAULT_LIKED)
            .date(DEFAULT_DATE);
        return likeUser;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LikeUser createUpdatedEntity(EntityManager em) {
        LikeUser likeUser = new LikeUser()
            .liked(UPDATED_LIKED)
            .date(UPDATED_DATE);
        return likeUser;
    }

    @BeforeEach
    public void initTest() {
        likeUser = createEntity(em);
    }

    @Test
    @Transactional
    public void createLikeUser() throws Exception {
        int databaseSizeBeforeCreate = likeUserRepository.findAll().size();

        // Create the LikeUser
        LikeUserDTO likeUserDTO = likeUserMapper.toDto(likeUser);
        restLikeUserMockMvc.perform(post("/api/like-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(likeUserDTO)))
            .andExpect(status().isCreated());

        // Validate the LikeUser in the database
        List<LikeUser> likeUserList = likeUserRepository.findAll();
        assertThat(likeUserList).hasSize(databaseSizeBeforeCreate + 1);
        LikeUser testLikeUser = likeUserList.get(likeUserList.size() - 1);
        assertThat(testLikeUser.isLiked()).isEqualTo(DEFAULT_LIKED);
        assertThat(testLikeUser.getDate()).isEqualTo(DEFAULT_DATE);
    }

    @Test
    @Transactional
    public void createLikeUserWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = likeUserRepository.findAll().size();

        // Create the LikeUser with an existing ID
        likeUser.setId(1L);
        LikeUserDTO likeUserDTO = likeUserMapper.toDto(likeUser);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLikeUserMockMvc.perform(post("/api/like-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(likeUserDTO)))
            .andExpect(status().isBadRequest());

        // Validate the LikeUser in the database
        List<LikeUser> likeUserList = likeUserRepository.findAll();
        assertThat(likeUserList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllLikeUsers() throws Exception {
        // Initialize the database
        likeUserRepository.saveAndFlush(likeUser);

        // Get all the likeUserList
        restLikeUserMockMvc.perform(get("/api/like-users?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(likeUser.getId().intValue())))
            .andExpect(jsonPath("$.[*].liked").value(hasItem(DEFAULT_LIKED.booleanValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(sameInstant(DEFAULT_DATE))));
    }
    
    @Test
    @Transactional
    public void getLikeUser() throws Exception {
        // Initialize the database
        likeUserRepository.saveAndFlush(likeUser);

        // Get the likeUser
        restLikeUserMockMvc.perform(get("/api/like-users/{id}", likeUser.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(likeUser.getId().intValue()))
            .andExpect(jsonPath("$.liked").value(DEFAULT_LIKED.booleanValue()))
            .andExpect(jsonPath("$.date").value(sameInstant(DEFAULT_DATE)));
    }

    @Test
    @Transactional
    public void getNonExistingLikeUser() throws Exception {
        // Get the likeUser
        restLikeUserMockMvc.perform(get("/api/like-users/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLikeUser() throws Exception {
        // Initialize the database
        likeUserRepository.saveAndFlush(likeUser);

        int databaseSizeBeforeUpdate = likeUserRepository.findAll().size();

        // Update the likeUser
        LikeUser updatedLikeUser = likeUserRepository.findById(likeUser.getId()).get();
        // Disconnect from session so that the updates on updatedLikeUser are not directly saved in db
        em.detach(updatedLikeUser);
        updatedLikeUser
            .liked(UPDATED_LIKED)
            .date(UPDATED_DATE);
        LikeUserDTO likeUserDTO = likeUserMapper.toDto(updatedLikeUser);

        restLikeUserMockMvc.perform(put("/api/like-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(likeUserDTO)))
            .andExpect(status().isOk());

        // Validate the LikeUser in the database
        List<LikeUser> likeUserList = likeUserRepository.findAll();
        assertThat(likeUserList).hasSize(databaseSizeBeforeUpdate);
        LikeUser testLikeUser = likeUserList.get(likeUserList.size() - 1);
        assertThat(testLikeUser.isLiked()).isEqualTo(UPDATED_LIKED);
        assertThat(testLikeUser.getDate()).isEqualTo(UPDATED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingLikeUser() throws Exception {
        int databaseSizeBeforeUpdate = likeUserRepository.findAll().size();

        // Create the LikeUser
        LikeUserDTO likeUserDTO = likeUserMapper.toDto(likeUser);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLikeUserMockMvc.perform(put("/api/like-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(likeUserDTO)))
            .andExpect(status().isBadRequest());

        // Validate the LikeUser in the database
        List<LikeUser> likeUserList = likeUserRepository.findAll();
        assertThat(likeUserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteLikeUser() throws Exception {
        // Initialize the database
        likeUserRepository.saveAndFlush(likeUser);

        int databaseSizeBeforeDelete = likeUserRepository.findAll().size();

        // Delete the likeUser
        restLikeUserMockMvc.perform(delete("/api/like-users/{id}", likeUser.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<LikeUser> likeUserList = likeUserRepository.findAll();
        assertThat(likeUserList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LikeUser.class);
        LikeUser likeUser1 = new LikeUser();
        likeUser1.setId(1L);
        LikeUser likeUser2 = new LikeUser();
        likeUser2.setId(likeUser1.getId());
        assertThat(likeUser1).isEqualTo(likeUser2);
        likeUser2.setId(2L);
        assertThat(likeUser1).isNotEqualTo(likeUser2);
        likeUser1.setId(null);
        assertThat(likeUser1).isNotEqualTo(likeUser2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(LikeUserDTO.class);
        LikeUserDTO likeUserDTO1 = new LikeUserDTO();
        likeUserDTO1.setId(1L);
        LikeUserDTO likeUserDTO2 = new LikeUserDTO();
        assertThat(likeUserDTO1).isNotEqualTo(likeUserDTO2);
        likeUserDTO2.setId(likeUserDTO1.getId());
        assertThat(likeUserDTO1).isEqualTo(likeUserDTO2);
        likeUserDTO2.setId(2L);
        assertThat(likeUserDTO1).isNotEqualTo(likeUserDTO2);
        likeUserDTO1.setId(null);
        assertThat(likeUserDTO1).isNotEqualTo(likeUserDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(likeUserMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(likeUserMapper.fromId(null)).isNull();
    }
}
