package com.sallefy.web.rest;

import com.sallefy.SallefyApp;
import com.sallefy.domain.Genre;
import com.sallefy.domain.Playlist;
import com.sallefy.domain.Track;
import com.sallefy.domain.User;
import com.sallefy.repository.GenreRepository;
import com.sallefy.repository.PlaylistRepository;
import com.sallefy.repository.TrackRepository;
import com.sallefy.repository.UserRepository;
import com.sallefy.service.*;
import com.sallefy.service.dto.LikeDTO;
import com.sallefy.service.dto.TrackDTO;
import com.sallefy.service.impl.TrackQueryService;
import com.sallefy.service.mapper.TrackMapper;
import com.sallefy.web.rest.errors.ExceptionTranslator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static com.sallefy.web.rest.TestUtil.createFormattingConversionService;
import static com.sallefy.web.rest.TestUtil.sameInstant;
import static com.sallefy.web.rest.UserResourceIT.createBasicUserWithUsername;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.hasSize;
import static org.mockito.Mockito.*;
import static org.springframework.http.MediaType.APPLICATION_JSON_UTF8_VALUE;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link TrackResource} REST controller.
 */
@SpringBootTest(classes = SallefyApp.class)
public class TrackResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_RATING = "AAAAAAAAAA";
    private static final String UPDATED_RATING = "BBBBBBBBBB";

    private static final String DEFAULT_URL = "http://res.cloudinary.com";
    private static final String UPDATED_URL = "http://res.cloudinary.com/updated";

    private static final String DEFAULT_POPULARITY = "AAAAAAAAAA";
    private static final String UPDATED_POPULARITY = "BBBBBBBBBB";

    private static final String DEFAULT_THUMBNAIL = "AAAAAAAAAA";
    private static final String UPDATED_THUMBNAIL = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_CREATED_AT = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_CREATED_AT = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);
    private static final ZonedDateTime SMALLER_CREATED_AT = ZonedDateTime.ofInstant(Instant.ofEpochMilli(-1L), ZoneOffset.UTC);

    private static final ZonedDateTime DEFAULT_RELEASED = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_RELEASED = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);
    private static final ZonedDateTime SMALLER_RELEASED = ZonedDateTime.ofInstant(Instant.ofEpochMilli(-1L), ZoneOffset.UTC);

    private static final Integer DEFAULT_DURATION = 1;
    private static final Integer UPDATED_DURATION = 2;
    private static final Integer SMALLER_DURATION = 0;

    private static final String DEFAULT_COLOR = "AAAAAAAAAA";
    private static final String UPDATED_COLOR = "BBBBBBBBBB";

    @Autowired
    private TrackRepository trackRepository;

    @Mock
    private TrackRepository trackRepositoryMock;

    @Autowired
    private GenreRepository genreRepository;

    @Autowired
    private TrackMapper trackMapper;

    @Mock
    private TrackService trackServiceMock;

    @Autowired
    private LikeService likeService;

    @Mock
    private UserService userService;

    @Mock
    private LikeService likeServiceMock;

    @Autowired
    private TrackService trackService;

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

    private MockMvc restTrackMockMvc;

    private MockMvc restGenreMockMvc;

    private Track track;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PlaylistRepository playlistRepository;

    @Autowired
    private PlayService playService;

    @Autowired
    private GenreService genreService;

    @Autowired
    private TrackQueryService trackQueryService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TrackResource trackResource = new TrackResource(trackService, trackQueryService, likeService, playService);
        this.restTrackMockMvc = MockMvcBuilders.standaloneSetup(trackResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator)
            .build();

        final GenreResource genreResource = new GenreResource(genreService, trackService);
        this.restGenreMockMvc = MockMvcBuilders.standaloneSetup(genreResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator)
            .build();
    }

    /**
     * Create an entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Track createEntity() {
        return new Track()
            .name(DEFAULT_NAME)
            .rating(DEFAULT_RATING)
            .url(DEFAULT_URL)
            .popularity(DEFAULT_POPULARITY)
            .thumbnail(DEFAULT_THUMBNAIL)
            .createdAt(DEFAULT_CREATED_AT)
            .released(DEFAULT_RELEASED)
            .duration(DEFAULT_DURATION)
            .color(DEFAULT_COLOR);
    }

    /**
     * Create an updated entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Track createUpdatedEntity(EntityManager em) {
        Track track = new Track()
            .name(UPDATED_NAME)
            .rating(UPDATED_RATING)
            .url(UPDATED_URL)
            .popularity(UPDATED_POPULARITY)
            .thumbnail(UPDATED_THUMBNAIL)
            .createdAt(UPDATED_CREATED_AT)
            .released(UPDATED_RELEASED)
            .duration(UPDATED_DURATION)
            .color(UPDATED_COLOR);
        return track;
    }

    @BeforeEach
    public void initTest() {
        track = createEntity();
    }

    @Test
    @Transactional
    @WithMockUser("track-owner")
    public void createTrack() throws Exception {

        User owner = createBasicUserWithUsername("track-owner");

        track.setUser(userRepository.save(owner));

        int databaseSizeBeforeCreate = trackRepository.findAll().size();

        // Create the Track
        TrackDTO trackDTO = trackMapper.toDto(track);
        restTrackMockMvc.perform(post("/api/tracks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trackDTO)))
            .andExpect(status().isCreated());

        // Validate the Track in the database
        List<Track> trackList = trackRepository.findAll();
        assertThat(trackList).hasSize(databaseSizeBeforeCreate + 1);
        Track testTrack = trackList.get(trackList.size() - 1);
        assertThat(testTrack.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testTrack.getUrl()).isEqualTo(DEFAULT_URL);
        assertThat(testTrack.getThumbnail()).isEqualTo(DEFAULT_THUMBNAIL);
        assertThat(testTrack.getReleased()).isEqualTo(DEFAULT_RELEASED);
        assertThat(testTrack.getDuration()).isEqualTo(DEFAULT_DURATION);
        assertThat(testTrack.getColor()).isEqualTo(DEFAULT_COLOR);
    }

    @Test
    @Transactional
    public void createTrackWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = trackRepository.findAll().size();

        User owner = createBasicUserWithUsername("track-owner");

        track.setUser(userRepository.save(owner));

        // Create the Track with an existing ID
        track.setId(1L);
        TrackDTO trackDTO = trackMapper.toDto(track);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTrackMockMvc.perform(post("/api/tracks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trackDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Track in the database
        List<Track> trackList = trackRepository.findAll();
        assertThat(trackList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    @WithMockUser("admin")
    public void getAllTracksAsAdmin() throws Exception {

        // Initialize the database
        User basicUser1 = UserResourceIT.createEntity();
        userRepository.save(basicUser1);

        User basicUser2 = UserResourceIT.createEntity();
        userRepository.save(basicUser2);

        Track track1 = createEntity();
        track1.setUser(basicUser1);
        trackRepository.save(track1);

        Track track2 = createEntity();
        track2.setUser(basicUser2);
        trackRepository.save(track2);

        // Get all the trackList
        restTrackMockMvc.perform(get("/api/tracks?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$", hasSize(2)))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].url").value(hasItem(DEFAULT_URL)))
            .andExpect(jsonPath("$.[*].thumbnail").value(hasItem(DEFAULT_THUMBNAIL)))
            .andExpect(jsonPath("$.[*].released").value(hasItem(sameInstant(DEFAULT_RELEASED))))
            .andExpect(jsonPath("$.[*].duration").value(hasItem(DEFAULT_DURATION)))
            .andExpect(jsonPath("$.[*].color").value(hasItem(DEFAULT_COLOR)));
    }

    @Test
    @Transactional
    @WithMockUser("track-owner")
    public void getTracks() throws Exception {

        // Initialize the database
        User owner = UserResourceIT.createBasicUserWithUsername("track-owner");
        userRepository.save(owner);

        User basicUser2 = UserResourceIT.createEntity();
        userRepository.save(basicUser2);

        Track track1 = createEntity();
        track1.setUser(owner);
        trackRepository.save(track1);

        Track track2 = createEntity();
        track2.setUser(basicUser2);
        trackRepository.save(track2);

        // Get all the trackList
        restTrackMockMvc.perform(get("/api/tracks"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$", hasSize(2)))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].url").value(hasItem(DEFAULT_URL)));
    }

    @SuppressWarnings({"unchecked"})
    public void getAllTracksWithEagerRelationshipsIsEnabled() throws Exception {
        TrackResource trackResource = new TrackResource(trackServiceMock, trackQueryService, likeServiceMock, playService);
        when(trackServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restTrackMockMvc = MockMvcBuilders.standaloneSetup(trackResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restTrackMockMvc.perform(get("/api/tracks?eagerload=true"))
            .andExpect(status().isOk());

        verify(trackServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllTracksWithEagerRelationshipsIsNotEnabled() throws Exception {
        TrackResource trackResource = new TrackResource(trackServiceMock, trackQueryService, likeServiceMock, playService);
        when(trackServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
        MockMvc restTrackMockMvc = MockMvcBuilders.standaloneSetup(trackResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restTrackMockMvc.perform(get("/api/tracks?eagerload=true"))
            .andExpect(status().isOk());

        verify(trackServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    @WithMockUser("track-owner")
    public void getTrack() throws Exception {

        // Initialize the database
        User owner = UserResourceIT.createBasicUserWithUsername("track-owner");
        userRepository.save(owner);

        track.setUser(owner);

        // Initialize the database
        trackRepository.saveAndFlush(track);

        // Get the track
        restTrackMockMvc.perform(get("/api/tracks/{id}", track.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(track.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.url").value(DEFAULT_URL))
            .andExpect(jsonPath("$.thumbnail").value(DEFAULT_THUMBNAIL))
            .andExpect(jsonPath("$.released").value(sameInstant(DEFAULT_RELEASED)))
            .andExpect(jsonPath("$.duration").value(DEFAULT_DURATION))
            .andExpect(jsonPath("$.color").value(DEFAULT_COLOR));
    }

    @Test
    @Transactional
    public void getNonExistingTrack() throws Exception {
        // Get the track
        restTrackMockMvc.perform(get("/api/tracks/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    @WithMockUser("update-track-user")
    public void updateTrack() throws Exception {
        User owner = createBasicUserWithUsername("update-track-user");

        track.setUser(userRepository.save(owner));

        // Initialize the database
        trackRepository.saveAndFlush(track);

        int databaseSizeBeforeUpdate = trackRepository.findAll().size();

        // Update the track
        Track updatedTrack = trackRepository.findById(track.getId()).get();
        // Disconnect from session so that the updates on updatedTrack are not directly saved in db
        em.detach(updatedTrack);
        updatedTrack
            .name(UPDATED_NAME)
            .rating(UPDATED_RATING)
            .url(UPDATED_URL)
            .popularity(UPDATED_POPULARITY)
            .thumbnail(UPDATED_THUMBNAIL)
            .createdAt(UPDATED_CREATED_AT)
            .released(UPDATED_RELEASED)
            .duration(UPDATED_DURATION)
            .color(UPDATED_COLOR);
        TrackDTO trackDTO = trackMapper.toDto(updatedTrack);

        restTrackMockMvc.perform(put("/api/tracks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trackDTO)))
            .andExpect(status().isOk());

        // Validate the Track in the database
        List<Track> trackList = trackRepository.findAll();
        assertThat(trackList).hasSize(databaseSizeBeforeUpdate);
        Track testTrack = trackList.get(trackList.size() - 1);
        assertThat(testTrack.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testTrack.getUrl()).isEqualTo(UPDATED_URL);
        assertThat(testTrack.getThumbnail()).isEqualTo(UPDATED_THUMBNAIL);
        assertThat(testTrack.getReleased()).isEqualTo(UPDATED_RELEASED);
        assertThat(testTrack.getDuration()).isEqualTo(UPDATED_DURATION);
        assertThat(testTrack.getColor()).isEqualTo(UPDATED_COLOR);
    }

    @Test
    @Transactional
    public void updateNonExistingTrack() throws Exception {
        int databaseSizeBeforeUpdate = trackRepository.findAll().size();

        User owner = createBasicUserWithUsername("track-owner");

        track.setUser(userRepository.save(owner));

        when(userService.getUserWithAuthorities()).thenReturn(track.getUser());

        // Create the Track
        TrackDTO trackDTO = trackMapper.toDto(track);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTrackMockMvc.perform(put("/api/tracks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trackDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Track in the database
        List<Track> trackList = trackRepository.findAll();
        assertThat(trackList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    @WithMockUser("delete-track-user")
    public void deleteTrack() throws Exception {

        User user = createBasicUserWithUsername("delete-track-user");

        track.setUser(userRepository.save(user));

        // Initialize the database
        trackRepository.saveAndFlush(track);

        when(userService.getUserWithAuthorities()).thenReturn(track.getUser());

        int databaseSizeBeforeDelete = trackRepository.findAll().size();

        // Delete the track
        restTrackMockMvc.perform(delete("/api/tracks/{id}", track.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Track> trackList = trackRepository.findAll();
        assertThat(trackList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    @WithMockUser("admin")
    public void should_delete_track_in_multiple_playlists_as_admin() throws Exception {
        User owner = userRepository.save(UserResourceIT.createEntity());
        User user1 = userRepository.save(UserResourceIT.createEntity());

        Track track = TrackResourceIT.createEntity();
        track.setUser(owner);
        track = trackRepository.save(track);

        Playlist playlist = PlaylistResourceIT.createEntity(em);
        playlist.setUser(owner);
        playlist.addTrack(track);
        playlistRepository.save(playlist);

        Playlist playlist2 = PlaylistResourceIT.createEntity(em);
        playlist.setUser(user1);
        playlist.addTrack(track);
        playlistRepository.save(playlist);

        restTrackMockMvc.perform(delete("/api/tracks/{id}", track.getId()))
            .andExpect(status().isNoContent());
    }

    @Test
    @Transactional
    @WithMockUser
    public void should_return_tracks_by_genre_id() throws Exception {

        User owner = createBasicUserWithUsername("track-owner");
        userRepository.save(owner);

        Genre genre = new Genre();
        genre.setName("Test");
        Genre result = genreRepository.save(genre);

        restGenreMockMvc.perform(get("/api/genres"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$", hasSize(1)))
            .andExpect(jsonPath("$.[*].name").value(hasItem("Test")));

        Set<Genre> genres = new HashSet<>();
        genres.add(genre);

        Track track1 = createEntity();
        track1.setGenres(genres);
        track1.setUser(owner);
        trackRepository.save(track1);

        Track track2 = createEntity();
        track2.setGenres(genres);
        track2.setUser(owner);
        trackRepository.save(track2);

        restGenreMockMvc.perform(get("/api/genres/{id}/tracks", result.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$", hasSize(2)));
    }

    @Test
    @Transactional
    @WithMockUser
    public void should_like_a_track() {

        User owner = createBasicUserWithUsername("track-owner");
        userRepository.save(owner);

        Track track = createEntity();
        track.setUser(owner);
        track = trackRepository.save(track);
        track = trackRepository.save(track);

        assertThat(likeService.checkLikeTrack(track.getId())).isEqualTo(new LikeDTO(false));

        likeService.toggleLikeTrack(track.getId());

        assertThat(likeService.checkLikeTrack(track.getId())).isEqualTo(new LikeDTO(true));
    }

    @Test
    @Transactional
    @WithMockUser
    public void should_return_liked_tracks() throws Exception {

        User owner = createBasicUserWithUsername("track-owner");
        userRepository.save(owner);

        Track track = createEntity();
        track.setUser(owner);
        track = trackRepository.save(track);

        likeService.toggleLikeTrack(track.getId());

        restTrackMockMvc.perform(get("/api/tracks?liked=true"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(APPLICATION_JSON_UTF8_VALUE));
    }

    @Test
    @Transactional
    @WithMockUser
    public void should_fail_because_genre_id_not_exists() throws Exception {

        restGenreMockMvc.perform(get("/api/genres/{id}/tracks", Long.MAX_VALUE))
            .andExpect(status().isNotFound());

    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Track.class);
        Track track1 = new Track();
        track1.setId(1L);
        Track track2 = new Track();
        track2.setId(track1.getId());
        assertThat(track1).isEqualTo(track2);
        track2.setId(2L);
        assertThat(track1).isNotEqualTo(track2);
        track1.setId(null);
        assertThat(track1).isNotEqualTo(track2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TrackDTO.class);
        TrackDTO trackDTO1 = new TrackDTO();
        trackDTO1.setId(1L);
        TrackDTO trackDTO2 = new TrackDTO();
        assertThat(trackDTO1).isNotEqualTo(trackDTO2);
        trackDTO2.setId(trackDTO1.getId());
        assertThat(trackDTO1).isEqualTo(trackDTO2);
        trackDTO2.setId(2L);
        assertThat(trackDTO1).isNotEqualTo(trackDTO2);
        trackDTO1.setId(null);
        assertThat(trackDTO1).isNotEqualTo(trackDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(trackMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(trackMapper.fromId(null)).isNull();
    }
}
