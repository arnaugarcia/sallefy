package com.sallefy.web.rest;

import com.sallefy.SallefyApp;
import com.sallefy.domain.LikeTrack;
import com.sallefy.repository.LikeTrackRepository;
import com.sallefy.service.LikeTrackService;
import com.sallefy.service.dto.LikeTrackDTO;
import com.sallefy.service.mapper.LikeTrackMapper;
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
 * Integration tests for the {@link LikeTrackResource} REST controller.
 */
@SpringBootTest(classes = SallefyApp.class)
public class LikeTrackResourceIT {

    private static final Boolean DEFAULT_LIKED = false;
    private static final Boolean UPDATED_LIKED = true;

    private static final ZonedDateTime DEFAULT_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);
    private static final ZonedDateTime SMALLER_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(-1L), ZoneOffset.UTC);

    @Autowired
    private LikeTrackRepository likeTrackRepository;

    @Autowired
    private LikeTrackMapper likeTrackMapper;

    @Autowired
    private LikeTrackService likeTrackService;

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

    private MockMvc restLikeTrackMockMvc;

    private LikeTrack likeTrack;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final LikeTrackResource likeTrackResource = new LikeTrackResource(likeTrackService);
        this.restLikeTrackMockMvc = MockMvcBuilders.standaloneSetup(likeTrackResource)
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
    public static LikeTrack createEntity(EntityManager em) {
        LikeTrack likeTrack = new LikeTrack()
            .liked(DEFAULT_LIKED)
            .date(DEFAULT_DATE);
        return likeTrack;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LikeTrack createUpdatedEntity(EntityManager em) {
        LikeTrack likeTrack = new LikeTrack()
            .liked(UPDATED_LIKED)
            .date(UPDATED_DATE);
        return likeTrack;
    }

    @BeforeEach
    public void initTest() {
        likeTrack = createEntity(em);
    }

    @Test
    @Transactional
    public void createLikeTrack() throws Exception {
        int databaseSizeBeforeCreate = likeTrackRepository.findAll().size();

        // Create the LikeTrack
        LikeTrackDTO likeTrackDTO = likeTrackMapper.toDto(likeTrack);
        restLikeTrackMockMvc.perform(post("/api/like-tracks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(likeTrackDTO)))
            .andExpect(status().isCreated());

        // Validate the LikeTrack in the database
        List<LikeTrack> likeTrackList = likeTrackRepository.findAll();
        assertThat(likeTrackList).hasSize(databaseSizeBeforeCreate + 1);
        LikeTrack testLikeTrack = likeTrackList.get(likeTrackList.size() - 1);
        assertThat(testLikeTrack.isLiked()).isEqualTo(DEFAULT_LIKED);
        assertThat(testLikeTrack.getDate()).isEqualTo(DEFAULT_DATE);
    }

    @Test
    @Transactional
    public void createLikeTrackWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = likeTrackRepository.findAll().size();

        // Create the LikeTrack with an existing ID
        likeTrack.setId(1L);
        LikeTrackDTO likeTrackDTO = likeTrackMapper.toDto(likeTrack);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLikeTrackMockMvc.perform(post("/api/like-tracks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(likeTrackDTO)))
            .andExpect(status().isBadRequest());

        // Validate the LikeTrack in the database
        List<LikeTrack> likeTrackList = likeTrackRepository.findAll();
        assertThat(likeTrackList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllLikeTracks() throws Exception {
        // Initialize the database
        likeTrackRepository.saveAndFlush(likeTrack);

        // Get all the likeTrackList
        restLikeTrackMockMvc.perform(get("/api/like-tracks?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(likeTrack.getId().intValue())))
            .andExpect(jsonPath("$.[*].liked").value(hasItem(DEFAULT_LIKED.booleanValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(sameInstant(DEFAULT_DATE))));
    }
    
    @Test
    @Transactional
    public void getLikeTrack() throws Exception {
        // Initialize the database
        likeTrackRepository.saveAndFlush(likeTrack);

        // Get the likeTrack
        restLikeTrackMockMvc.perform(get("/api/like-tracks/{id}", likeTrack.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(likeTrack.getId().intValue()))
            .andExpect(jsonPath("$.liked").value(DEFAULT_LIKED.booleanValue()))
            .andExpect(jsonPath("$.date").value(sameInstant(DEFAULT_DATE)));
    }

    @Test
    @Transactional
    public void getNonExistingLikeTrack() throws Exception {
        // Get the likeTrack
        restLikeTrackMockMvc.perform(get("/api/like-tracks/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLikeTrack() throws Exception {
        // Initialize the database
        likeTrackRepository.saveAndFlush(likeTrack);

        int databaseSizeBeforeUpdate = likeTrackRepository.findAll().size();

        // Update the likeTrack
        LikeTrack updatedLikeTrack = likeTrackRepository.findById(likeTrack.getId()).get();
        // Disconnect from session so that the updates on updatedLikeTrack are not directly saved in db
        em.detach(updatedLikeTrack);
        updatedLikeTrack
            .liked(UPDATED_LIKED)
            .date(UPDATED_DATE);
        LikeTrackDTO likeTrackDTO = likeTrackMapper.toDto(updatedLikeTrack);

        restLikeTrackMockMvc.perform(put("/api/like-tracks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(likeTrackDTO)))
            .andExpect(status().isOk());

        // Validate the LikeTrack in the database
        List<LikeTrack> likeTrackList = likeTrackRepository.findAll();
        assertThat(likeTrackList).hasSize(databaseSizeBeforeUpdate);
        LikeTrack testLikeTrack = likeTrackList.get(likeTrackList.size() - 1);
        assertThat(testLikeTrack.isLiked()).isEqualTo(UPDATED_LIKED);
        assertThat(testLikeTrack.getDate()).isEqualTo(UPDATED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingLikeTrack() throws Exception {
        int databaseSizeBeforeUpdate = likeTrackRepository.findAll().size();

        // Create the LikeTrack
        LikeTrackDTO likeTrackDTO = likeTrackMapper.toDto(likeTrack);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLikeTrackMockMvc.perform(put("/api/like-tracks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(likeTrackDTO)))
            .andExpect(status().isBadRequest());

        // Validate the LikeTrack in the database
        List<LikeTrack> likeTrackList = likeTrackRepository.findAll();
        assertThat(likeTrackList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteLikeTrack() throws Exception {
        // Initialize the database
        likeTrackRepository.saveAndFlush(likeTrack);

        int databaseSizeBeforeDelete = likeTrackRepository.findAll().size();

        // Delete the likeTrack
        restLikeTrackMockMvc.perform(delete("/api/like-tracks/{id}", likeTrack.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<LikeTrack> likeTrackList = likeTrackRepository.findAll();
        assertThat(likeTrackList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LikeTrack.class);
        LikeTrack likeTrack1 = new LikeTrack();
        likeTrack1.setId(1L);
        LikeTrack likeTrack2 = new LikeTrack();
        likeTrack2.setId(likeTrack1.getId());
        assertThat(likeTrack1).isEqualTo(likeTrack2);
        likeTrack2.setId(2L);
        assertThat(likeTrack1).isNotEqualTo(likeTrack2);
        likeTrack1.setId(null);
        assertThat(likeTrack1).isNotEqualTo(likeTrack2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(LikeTrackDTO.class);
        LikeTrackDTO likeTrackDTO1 = new LikeTrackDTO();
        likeTrackDTO1.setId(1L);
        LikeTrackDTO likeTrackDTO2 = new LikeTrackDTO();
        assertThat(likeTrackDTO1).isNotEqualTo(likeTrackDTO2);
        likeTrackDTO2.setId(likeTrackDTO1.getId());
        assertThat(likeTrackDTO1).isEqualTo(likeTrackDTO2);
        likeTrackDTO2.setId(2L);
        assertThat(likeTrackDTO1).isNotEqualTo(likeTrackDTO2);
        likeTrackDTO1.setId(null);
        assertThat(likeTrackDTO1).isNotEqualTo(likeTrackDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(likeTrackMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(likeTrackMapper.fromId(null)).isNull();
    }
}
