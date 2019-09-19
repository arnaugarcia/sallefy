package com.sallefy.web.rest;

import com.sallefy.SallefyApp;
import com.sallefy.domain.FollowPlaylist;
import com.sallefy.repository.FollowPlaylistRepository;
import com.sallefy.service.FollowPlaylistService;
import com.sallefy.service.dto.FollowPlaylistDTO;
import com.sallefy.service.mapper.FollowPlaylistMapper;
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
 * Integration tests for the {@link FollowPlaylistResource} REST controller.
 */
@SpringBootTest(classes = SallefyApp.class)
public class FollowPlaylistResourceIT {

    private static final ZonedDateTime DEFAULT_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);
    private static final ZonedDateTime SMALLER_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(-1L), ZoneOffset.UTC);

    @Autowired
    private FollowPlaylistRepository followPlaylistRepository;

    @Autowired
    private FollowPlaylistMapper followPlaylistMapper;

    @Autowired
    private FollowPlaylistService followPlaylistService;

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

    private MockMvc restFollowPlaylistMockMvc;

    private FollowPlaylist followPlaylist;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FollowPlaylistResource followPlaylistResource = new FollowPlaylistResource(followPlaylistService);
        this.restFollowPlaylistMockMvc = MockMvcBuilders.standaloneSetup(followPlaylistResource)
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
    public static FollowPlaylist createEntity(EntityManager em) {
        FollowPlaylist followPlaylist = new FollowPlaylist()
            .date(DEFAULT_DATE);
        return followPlaylist;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FollowPlaylist createUpdatedEntity(EntityManager em) {
        FollowPlaylist followPlaylist = new FollowPlaylist()
            .date(UPDATED_DATE);
        return followPlaylist;
    }

    @BeforeEach
    public void initTest() {
        followPlaylist = createEntity(em);
    }

    @Test
    @Transactional
    public void createFollowPlaylist() throws Exception {
        int databaseSizeBeforeCreate = followPlaylistRepository.findAll().size();

        // Create the FollowPlaylist
        FollowPlaylistDTO followPlaylistDTO = followPlaylistMapper.toDto(followPlaylist);
        restFollowPlaylistMockMvc.perform(post("/api/follow-playlists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(followPlaylistDTO)))
            .andExpect(status().isCreated());

        // Validate the FollowPlaylist in the database
        List<FollowPlaylist> followPlaylistList = followPlaylistRepository.findAll();
        assertThat(followPlaylistList).hasSize(databaseSizeBeforeCreate + 1);
        FollowPlaylist testFollowPlaylist = followPlaylistList.get(followPlaylistList.size() - 1);
        assertThat(testFollowPlaylist.getDate()).isEqualTo(DEFAULT_DATE);
    }

    @Test
    @Transactional
    public void createFollowPlaylistWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = followPlaylistRepository.findAll().size();

        // Create the FollowPlaylist with an existing ID
        followPlaylist.setId(1L);
        FollowPlaylistDTO followPlaylistDTO = followPlaylistMapper.toDto(followPlaylist);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFollowPlaylistMockMvc.perform(post("/api/follow-playlists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(followPlaylistDTO)))
            .andExpect(status().isBadRequest());

        // Validate the FollowPlaylist in the database
        List<FollowPlaylist> followPlaylistList = followPlaylistRepository.findAll();
        assertThat(followPlaylistList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllFollowPlaylists() throws Exception {
        // Initialize the database
        followPlaylistRepository.saveAndFlush(followPlaylist);

        // Get all the followPlaylistList
        restFollowPlaylistMockMvc.perform(get("/api/follow-playlists?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(followPlaylist.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(sameInstant(DEFAULT_DATE))));
    }
    
    @Test
    @Transactional
    public void getFollowPlaylist() throws Exception {
        // Initialize the database
        followPlaylistRepository.saveAndFlush(followPlaylist);

        // Get the followPlaylist
        restFollowPlaylistMockMvc.perform(get("/api/follow-playlists/{id}", followPlaylist.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(followPlaylist.getId().intValue()))
            .andExpect(jsonPath("$.date").value(sameInstant(DEFAULT_DATE)));
    }

    @Test
    @Transactional
    public void getNonExistingFollowPlaylist() throws Exception {
        // Get the followPlaylist
        restFollowPlaylistMockMvc.perform(get("/api/follow-playlists/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFollowPlaylist() throws Exception {
        // Initialize the database
        followPlaylistRepository.saveAndFlush(followPlaylist);

        int databaseSizeBeforeUpdate = followPlaylistRepository.findAll().size();

        // Update the followPlaylist
        FollowPlaylist updatedFollowPlaylist = followPlaylistRepository.findById(followPlaylist.getId()).get();
        // Disconnect from session so that the updates on updatedFollowPlaylist are not directly saved in db
        em.detach(updatedFollowPlaylist);
        updatedFollowPlaylist
            .date(UPDATED_DATE);
        FollowPlaylistDTO followPlaylistDTO = followPlaylistMapper.toDto(updatedFollowPlaylist);

        restFollowPlaylistMockMvc.perform(put("/api/follow-playlists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(followPlaylistDTO)))
            .andExpect(status().isOk());

        // Validate the FollowPlaylist in the database
        List<FollowPlaylist> followPlaylistList = followPlaylistRepository.findAll();
        assertThat(followPlaylistList).hasSize(databaseSizeBeforeUpdate);
        FollowPlaylist testFollowPlaylist = followPlaylistList.get(followPlaylistList.size() - 1);
        assertThat(testFollowPlaylist.getDate()).isEqualTo(UPDATED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingFollowPlaylist() throws Exception {
        int databaseSizeBeforeUpdate = followPlaylistRepository.findAll().size();

        // Create the FollowPlaylist
        FollowPlaylistDTO followPlaylistDTO = followPlaylistMapper.toDto(followPlaylist);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFollowPlaylistMockMvc.perform(put("/api/follow-playlists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(followPlaylistDTO)))
            .andExpect(status().isBadRequest());

        // Validate the FollowPlaylist in the database
        List<FollowPlaylist> followPlaylistList = followPlaylistRepository.findAll();
        assertThat(followPlaylistList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFollowPlaylist() throws Exception {
        // Initialize the database
        followPlaylistRepository.saveAndFlush(followPlaylist);

        int databaseSizeBeforeDelete = followPlaylistRepository.findAll().size();

        // Delete the followPlaylist
        restFollowPlaylistMockMvc.perform(delete("/api/follow-playlists/{id}", followPlaylist.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<FollowPlaylist> followPlaylistList = followPlaylistRepository.findAll();
        assertThat(followPlaylistList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FollowPlaylist.class);
        FollowPlaylist followPlaylist1 = new FollowPlaylist();
        followPlaylist1.setId(1L);
        FollowPlaylist followPlaylist2 = new FollowPlaylist();
        followPlaylist2.setId(followPlaylist1.getId());
        assertThat(followPlaylist1).isEqualTo(followPlaylist2);
        followPlaylist2.setId(2L);
        assertThat(followPlaylist1).isNotEqualTo(followPlaylist2);
        followPlaylist1.setId(null);
        assertThat(followPlaylist1).isNotEqualTo(followPlaylist2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(FollowPlaylistDTO.class);
        FollowPlaylistDTO followPlaylistDTO1 = new FollowPlaylistDTO();
        followPlaylistDTO1.setId(1L);
        FollowPlaylistDTO followPlaylistDTO2 = new FollowPlaylistDTO();
        assertThat(followPlaylistDTO1).isNotEqualTo(followPlaylistDTO2);
        followPlaylistDTO2.setId(followPlaylistDTO1.getId());
        assertThat(followPlaylistDTO1).isEqualTo(followPlaylistDTO2);
        followPlaylistDTO2.setId(2L);
        assertThat(followPlaylistDTO1).isNotEqualTo(followPlaylistDTO2);
        followPlaylistDTO1.setId(null);
        assertThat(followPlaylistDTO1).isNotEqualTo(followPlaylistDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(followPlaylistMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(followPlaylistMapper.fromId(null)).isNull();
    }
}
