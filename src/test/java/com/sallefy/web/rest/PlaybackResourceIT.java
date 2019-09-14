package com.sallefy.web.rest;

import com.sallefy.SallefyApp;
import com.sallefy.domain.Playback;
import com.sallefy.repository.PlaybackRepository;
import com.sallefy.service.PlaybackService;
import com.sallefy.service.dto.PlaybackDTO;
import com.sallefy.service.mapper.PlaybackMapper;
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
 * Integration tests for the {@link PlaybackResource} REST controller.
 */
@SpringBootTest(classes = SallefyApp.class)
public class PlaybackResourceIT {

    private static final String DEFAULT_IP = "AAAAAAAAAA";
    private static final String UPDATED_IP = "BBBBBBBBBB";

    private static final Double DEFAULT_LATITUDE = 1D;
    private static final Double UPDATED_LATITUDE = 2D;
    private static final Double SMALLER_LATITUDE = 1D - 1D;

    private static final Double DEFAULT_LONGITUDE = 1D;
    private static final Double UPDATED_LONGITUDE = 2D;
    private static final Double SMALLER_LONGITUDE = 1D - 1D;

    private static final ZonedDateTime DEFAULT_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);
    private static final ZonedDateTime SMALLER_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(-1L), ZoneOffset.UTC);

    @Autowired
    private PlaybackRepository playbackRepository;

    @Autowired
    private PlaybackMapper playbackMapper;

    @Autowired
    private PlaybackService playbackService;

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

    private MockMvc restPlaybackMockMvc;

    private Playback playback;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PlaybackResource playbackResource = new PlaybackResource(playbackService);
        this.restPlaybackMockMvc = MockMvcBuilders.standaloneSetup(playbackResource)
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
    public static Playback createEntity(EntityManager em) {
        Playback playback = new Playback()
            .ip(DEFAULT_IP)
            .latitude(DEFAULT_LATITUDE)
            .longitude(DEFAULT_LONGITUDE)
            .date(DEFAULT_DATE);
        return playback;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Playback createUpdatedEntity(EntityManager em) {
        Playback playback = new Playback()
            .ip(UPDATED_IP)
            .latitude(UPDATED_LATITUDE)
            .longitude(UPDATED_LONGITUDE)
            .date(UPDATED_DATE);
        return playback;
    }

    @BeforeEach
    public void initTest() {
        playback = createEntity(em);
    }

    @Test
    @Transactional
    public void createPlayback() throws Exception {
        int databaseSizeBeforeCreate = playbackRepository.findAll().size();

        // Create the Playback
        PlaybackDTO playbackDTO = playbackMapper.toDto(playback);
        restPlaybackMockMvc.perform(post("/api/playbacks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(playbackDTO)))
            .andExpect(status().isCreated());

        // Validate the Playback in the database
        List<Playback> playbackList = playbackRepository.findAll();
        assertThat(playbackList).hasSize(databaseSizeBeforeCreate + 1);
        Playback testPlayback = playbackList.get(playbackList.size() - 1);
        assertThat(testPlayback.getIp()).isEqualTo(DEFAULT_IP);
        assertThat(testPlayback.getLatitude()).isEqualTo(DEFAULT_LATITUDE);
        assertThat(testPlayback.getLongitude()).isEqualTo(DEFAULT_LONGITUDE);
        assertThat(testPlayback.getDate()).isEqualTo(DEFAULT_DATE);
    }

    @Test
    @Transactional
    public void createPlaybackWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = playbackRepository.findAll().size();

        // Create the Playback with an existing ID
        playback.setId(1L);
        PlaybackDTO playbackDTO = playbackMapper.toDto(playback);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPlaybackMockMvc.perform(post("/api/playbacks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(playbackDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Playback in the database
        List<Playback> playbackList = playbackRepository.findAll();
        assertThat(playbackList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPlaybacks() throws Exception {
        // Initialize the database
        playbackRepository.saveAndFlush(playback);

        // Get all the playbackList
        restPlaybackMockMvc.perform(get("/api/playbacks?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(playback.getId().intValue())))
            .andExpect(jsonPath("$.[*].ip").value(hasItem(DEFAULT_IP.toString())))
            .andExpect(jsonPath("$.[*].latitude").value(hasItem(DEFAULT_LATITUDE.doubleValue())))
            .andExpect(jsonPath("$.[*].longitude").value(hasItem(DEFAULT_LONGITUDE.doubleValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(sameInstant(DEFAULT_DATE))));
    }
    
    @Test
    @Transactional
    public void getPlayback() throws Exception {
        // Initialize the database
        playbackRepository.saveAndFlush(playback);

        // Get the playback
        restPlaybackMockMvc.perform(get("/api/playbacks/{id}", playback.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(playback.getId().intValue()))
            .andExpect(jsonPath("$.ip").value(DEFAULT_IP.toString()))
            .andExpect(jsonPath("$.latitude").value(DEFAULT_LATITUDE.doubleValue()))
            .andExpect(jsonPath("$.longitude").value(DEFAULT_LONGITUDE.doubleValue()))
            .andExpect(jsonPath("$.date").value(sameInstant(DEFAULT_DATE)));
    }

    @Test
    @Transactional
    public void getNonExistingPlayback() throws Exception {
        // Get the playback
        restPlaybackMockMvc.perform(get("/api/playbacks/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePlayback() throws Exception {
        // Initialize the database
        playbackRepository.saveAndFlush(playback);

        int databaseSizeBeforeUpdate = playbackRepository.findAll().size();

        // Update the playback
        Playback updatedPlayback = playbackRepository.findById(playback.getId()).get();
        // Disconnect from session so that the updates on updatedPlayback are not directly saved in db
        em.detach(updatedPlayback);
        updatedPlayback
            .ip(UPDATED_IP)
            .latitude(UPDATED_LATITUDE)
            .longitude(UPDATED_LONGITUDE)
            .date(UPDATED_DATE);
        PlaybackDTO playbackDTO = playbackMapper.toDto(updatedPlayback);

        restPlaybackMockMvc.perform(put("/api/playbacks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(playbackDTO)))
            .andExpect(status().isOk());

        // Validate the Playback in the database
        List<Playback> playbackList = playbackRepository.findAll();
        assertThat(playbackList).hasSize(databaseSizeBeforeUpdate);
        Playback testPlayback = playbackList.get(playbackList.size() - 1);
        assertThat(testPlayback.getIp()).isEqualTo(UPDATED_IP);
        assertThat(testPlayback.getLatitude()).isEqualTo(UPDATED_LATITUDE);
        assertThat(testPlayback.getLongitude()).isEqualTo(UPDATED_LONGITUDE);
        assertThat(testPlayback.getDate()).isEqualTo(UPDATED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingPlayback() throws Exception {
        int databaseSizeBeforeUpdate = playbackRepository.findAll().size();

        // Create the Playback
        PlaybackDTO playbackDTO = playbackMapper.toDto(playback);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPlaybackMockMvc.perform(put("/api/playbacks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(playbackDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Playback in the database
        List<Playback> playbackList = playbackRepository.findAll();
        assertThat(playbackList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePlayback() throws Exception {
        // Initialize the database
        playbackRepository.saveAndFlush(playback);

        int databaseSizeBeforeDelete = playbackRepository.findAll().size();

        // Delete the playback
        restPlaybackMockMvc.perform(delete("/api/playbacks/{id}", playback.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Playback> playbackList = playbackRepository.findAll();
        assertThat(playbackList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Playback.class);
        Playback playback1 = new Playback();
        playback1.setId(1L);
        Playback playback2 = new Playback();
        playback2.setId(playback1.getId());
        assertThat(playback1).isEqualTo(playback2);
        playback2.setId(2L);
        assertThat(playback1).isNotEqualTo(playback2);
        playback1.setId(null);
        assertThat(playback1).isNotEqualTo(playback2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PlaybackDTO.class);
        PlaybackDTO playbackDTO1 = new PlaybackDTO();
        playbackDTO1.setId(1L);
        PlaybackDTO playbackDTO2 = new PlaybackDTO();
        assertThat(playbackDTO1).isNotEqualTo(playbackDTO2);
        playbackDTO2.setId(playbackDTO1.getId());
        assertThat(playbackDTO1).isEqualTo(playbackDTO2);
        playbackDTO2.setId(2L);
        assertThat(playbackDTO1).isNotEqualTo(playbackDTO2);
        playbackDTO1.setId(null);
        assertThat(playbackDTO1).isNotEqualTo(playbackDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(playbackMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(playbackMapper.fromId(null)).isNull();
    }
}
