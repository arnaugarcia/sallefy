package com.sallefy.web.rest;

import com.sallefy.SallefyApp;
import com.sallefy.domain.LikeAlbum;
import com.sallefy.repository.LikeAlbumRepository;
import com.sallefy.service.LikeAlbumService;
import com.sallefy.service.dto.LikeAlbumDTO;
import com.sallefy.service.mapper.LikeAlbumMapper;
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
 * Integration tests for the {@link LikeAlbumResource} REST controller.
 */
@SpringBootTest(classes = SallefyApp.class)
public class LikeAlbumResourceIT {

    private static final Boolean DEFAULT_LIKED = false;
    private static final Boolean UPDATED_LIKED = true;

    private static final ZonedDateTime DEFAULT_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);
    private static final ZonedDateTime SMALLER_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(-1L), ZoneOffset.UTC);

    @Autowired
    private LikeAlbumRepository likeAlbumRepository;

    @Autowired
    private LikeAlbumMapper likeAlbumMapper;

    @Autowired
    private LikeAlbumService likeAlbumService;

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

    private MockMvc restLikeAlbumMockMvc;

    private LikeAlbum likeAlbum;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final LikeAlbumResource likeAlbumResource = new LikeAlbumResource(likeAlbumService);
        this.restLikeAlbumMockMvc = MockMvcBuilders.standaloneSetup(likeAlbumResource)
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
    public static LikeAlbum createEntity(EntityManager em) {
        LikeAlbum likeAlbum = new LikeAlbum()
            .liked(DEFAULT_LIKED)
            .date(DEFAULT_DATE);
        return likeAlbum;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LikeAlbum createUpdatedEntity(EntityManager em) {
        LikeAlbum likeAlbum = new LikeAlbum()
            .liked(UPDATED_LIKED)
            .date(UPDATED_DATE);
        return likeAlbum;
    }

    @BeforeEach
    public void initTest() {
        likeAlbum = createEntity(em);
    }

    @Test
    @Transactional
    public void createLikeAlbum() throws Exception {
        int databaseSizeBeforeCreate = likeAlbumRepository.findAll().size();

        // Create the LikeAlbum
        LikeAlbumDTO likeAlbumDTO = likeAlbumMapper.toDto(likeAlbum);
        restLikeAlbumMockMvc.perform(post("/api/like-albums")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(likeAlbumDTO)))
            .andExpect(status().isCreated());

        // Validate the LikeAlbum in the database
        List<LikeAlbum> likeAlbumList = likeAlbumRepository.findAll();
        assertThat(likeAlbumList).hasSize(databaseSizeBeforeCreate + 1);
        LikeAlbum testLikeAlbum = likeAlbumList.get(likeAlbumList.size() - 1);
        assertThat(testLikeAlbum.isLiked()).isEqualTo(DEFAULT_LIKED);
        assertThat(testLikeAlbum.getDate()).isEqualTo(DEFAULT_DATE);
    }

    @Test
    @Transactional
    public void createLikeAlbumWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = likeAlbumRepository.findAll().size();

        // Create the LikeAlbum with an existing ID
        likeAlbum.setId(1L);
        LikeAlbumDTO likeAlbumDTO = likeAlbumMapper.toDto(likeAlbum);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLikeAlbumMockMvc.perform(post("/api/like-albums")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(likeAlbumDTO)))
            .andExpect(status().isBadRequest());

        // Validate the LikeAlbum in the database
        List<LikeAlbum> likeAlbumList = likeAlbumRepository.findAll();
        assertThat(likeAlbumList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllLikeAlbums() throws Exception {
        // Initialize the database
        likeAlbumRepository.saveAndFlush(likeAlbum);

        // Get all the likeAlbumList
        restLikeAlbumMockMvc.perform(get("/api/like-albums?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(likeAlbum.getId().intValue())))
            .andExpect(jsonPath("$.[*].liked").value(hasItem(DEFAULT_LIKED.booleanValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(sameInstant(DEFAULT_DATE))));
    }
    
    @Test
    @Transactional
    public void getLikeAlbum() throws Exception {
        // Initialize the database
        likeAlbumRepository.saveAndFlush(likeAlbum);

        // Get the likeAlbum
        restLikeAlbumMockMvc.perform(get("/api/like-albums/{id}", likeAlbum.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(likeAlbum.getId().intValue()))
            .andExpect(jsonPath("$.liked").value(DEFAULT_LIKED.booleanValue()))
            .andExpect(jsonPath("$.date").value(sameInstant(DEFAULT_DATE)));
    }

    @Test
    @Transactional
    public void getNonExistingLikeAlbum() throws Exception {
        // Get the likeAlbum
        restLikeAlbumMockMvc.perform(get("/api/like-albums/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLikeAlbum() throws Exception {
        // Initialize the database
        likeAlbumRepository.saveAndFlush(likeAlbum);

        int databaseSizeBeforeUpdate = likeAlbumRepository.findAll().size();

        // Update the likeAlbum
        LikeAlbum updatedLikeAlbum = likeAlbumRepository.findById(likeAlbum.getId()).get();
        // Disconnect from session so that the updates on updatedLikeAlbum are not directly saved in db
        em.detach(updatedLikeAlbum);
        updatedLikeAlbum
            .liked(UPDATED_LIKED)
            .date(UPDATED_DATE);
        LikeAlbumDTO likeAlbumDTO = likeAlbumMapper.toDto(updatedLikeAlbum);

        restLikeAlbumMockMvc.perform(put("/api/like-albums")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(likeAlbumDTO)))
            .andExpect(status().isOk());

        // Validate the LikeAlbum in the database
        List<LikeAlbum> likeAlbumList = likeAlbumRepository.findAll();
        assertThat(likeAlbumList).hasSize(databaseSizeBeforeUpdate);
        LikeAlbum testLikeAlbum = likeAlbumList.get(likeAlbumList.size() - 1);
        assertThat(testLikeAlbum.isLiked()).isEqualTo(UPDATED_LIKED);
        assertThat(testLikeAlbum.getDate()).isEqualTo(UPDATED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingLikeAlbum() throws Exception {
        int databaseSizeBeforeUpdate = likeAlbumRepository.findAll().size();

        // Create the LikeAlbum
        LikeAlbumDTO likeAlbumDTO = likeAlbumMapper.toDto(likeAlbum);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLikeAlbumMockMvc.perform(put("/api/like-albums")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(likeAlbumDTO)))
            .andExpect(status().isBadRequest());

        // Validate the LikeAlbum in the database
        List<LikeAlbum> likeAlbumList = likeAlbumRepository.findAll();
        assertThat(likeAlbumList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteLikeAlbum() throws Exception {
        // Initialize the database
        likeAlbumRepository.saveAndFlush(likeAlbum);

        int databaseSizeBeforeDelete = likeAlbumRepository.findAll().size();

        // Delete the likeAlbum
        restLikeAlbumMockMvc.perform(delete("/api/like-albums/{id}", likeAlbum.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<LikeAlbum> likeAlbumList = likeAlbumRepository.findAll();
        assertThat(likeAlbumList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LikeAlbum.class);
        LikeAlbum likeAlbum1 = new LikeAlbum();
        likeAlbum1.setId(1L);
        LikeAlbum likeAlbum2 = new LikeAlbum();
        likeAlbum2.setId(likeAlbum1.getId());
        assertThat(likeAlbum1).isEqualTo(likeAlbum2);
        likeAlbum2.setId(2L);
        assertThat(likeAlbum1).isNotEqualTo(likeAlbum2);
        likeAlbum1.setId(null);
        assertThat(likeAlbum1).isNotEqualTo(likeAlbum2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(LikeAlbumDTO.class);
        LikeAlbumDTO likeAlbumDTO1 = new LikeAlbumDTO();
        likeAlbumDTO1.setId(1L);
        LikeAlbumDTO likeAlbumDTO2 = new LikeAlbumDTO();
        assertThat(likeAlbumDTO1).isNotEqualTo(likeAlbumDTO2);
        likeAlbumDTO2.setId(likeAlbumDTO1.getId());
        assertThat(likeAlbumDTO1).isEqualTo(likeAlbumDTO2);
        likeAlbumDTO2.setId(2L);
        assertThat(likeAlbumDTO1).isNotEqualTo(likeAlbumDTO2);
        likeAlbumDTO1.setId(null);
        assertThat(likeAlbumDTO1).isNotEqualTo(likeAlbumDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(likeAlbumMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(likeAlbumMapper.fromId(null)).isNull();
    }
}
