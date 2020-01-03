package com.sallefy.web.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sallefy.SallefyApp;
import com.sallefy.domain.Track;
import com.sallefy.domain.User;
import com.sallefy.repository.PlaybackRepository;
import com.sallefy.repository.TrackRepository;
import com.sallefy.repository.UserRepository;
import com.sallefy.service.LikeService;
import com.sallefy.service.PlayService;
import com.sallefy.service.TrackService;
import com.sallefy.service.dto.LatLongDTO;
import com.sallefy.service.impl.TrackQueryService;
import com.sallefy.web.rest.errors.ExceptionTranslator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import static com.sallefy.service.dto.builder.LatLongDTOBuilder.aLatLongDTO;
import static com.sallefy.web.rest.TestUtil.createFormattingConversionService;
import static java.lang.Double.*;
import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Integration tests for the {@link TrackResource} play REST endpoint.
 */
@SpringBootTest(classes = SallefyApp.class)
public class PlayResourceIT {

    private final static Double LATITUDE = 41.357721;
    private final static Double LONGITUDE = 1.980989;

    @Autowired
    private TrackRepository trackRepository;

    @Autowired
    private TrackService trackService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restTrackMockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PlaybackRepository playbackRepository;

    @Autowired
    private LikeService likeService;

    @Autowired
    private PlayService playService;

    @Autowired
    private TrackQueryService trackQueryService;

    private LatLongDTO latLongDTO;

    private ObjectMapper mapper = new ObjectMapper();

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        TrackResource trackResource = new TrackResource(trackService, trackQueryService, likeService, playService);
        this.restTrackMockMvc = MockMvcBuilders.standaloneSetup(trackResource)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator)
            .build();


    }

    @BeforeEach
    public void initTest() {
        latLongDTO = aLatLongDTO()
            .withLatitude(LATITUDE)
            .withLongitude(LONGITUDE)
            .build();
    }

    @Test
    @WithMockUser
    @Transactional
    public void should_create_a_playback() throws Exception {

        final User user = userRepository.save(UserResourceIT.createEntity());

        Track track = TrackResourceIT.createEntity();
        track.setUser(user);
        trackRepository.save(track);

        assertThat(trackRepository.findById(track.getId())).isPresent();

        restTrackMockMvc.perform(
            put("/api/tracks/{trackId}/play", track.getId())
                .content(mapper.writeValueAsBytes(latLongDTO))
                .contentType(APPLICATION_JSON))
            .andExpect(status().isCreated());

        assertThat(playbackRepository.findAll()).hasSize(1);

    }

    @Test
    @WithMockUser
    @Transactional
    public void shouldNotCreateAPlaybackBecauseTrackDontExists() throws Exception {
        restTrackMockMvc.perform(
            put("/api/tracks/{trackId}/play", Long.MAX_VALUE)
                .content(mapper.writeValueAsBytes(latLongDTO))
                .contentType(APPLICATION_JSON))
            .andExpect(status().isNotFound());
    }

    @Test
    @WithMockUser
    @Transactional
    public void shouldNotCreateAPlaybackBecauseLatitudeOrIsWrong() throws Exception {

        LatLongDTO latLongDTO = aLatLongDTO()
            .withLatitude(MAX_VALUE)
            .withLongitude(LONGITUDE)
            .build();

        restTrackMockMvc.perform(
            put("/api/tracks/{trackId}/play", Long.MAX_VALUE)
                .content(mapper.writeValueAsBytes(latLongDTO))
                .contentType(APPLICATION_JSON))
            .andExpect(status().isBadRequest());
    }

    @Test
    @WithMockUser
    @Transactional
    public void shouldNotCreateAPlaybackBecauseLongitudeOrIsWrong() throws Exception {

        LatLongDTO latLongDTO = aLatLongDTO()
            .withLatitude(LATITUDE)
            .withLongitude(MAX_VALUE)
            .build();

        restTrackMockMvc.perform(
            put("/api/tracks/{trackId}/play", Long.MAX_VALUE)
                .content(mapper.writeValueAsBytes(latLongDTO))
                .contentType(APPLICATION_JSON))
            .andExpect(status().isBadRequest());
    }

    @Test
    @WithMockUser
    @Transactional
    public void shouldNotCreateAPlaybackBecauseLongitudeIsNull() throws Exception {

        LatLongDTO latLongDTO = aLatLongDTO()
            .withLatitude(LATITUDE)
            .withLongitude(null)
            .build();

        restTrackMockMvc.perform(
            put("/api/tracks/{trackId}/play", Long.MAX_VALUE)
                .content(mapper.writeValueAsBytes(latLongDTO))
                .contentType(APPLICATION_JSON))
            .andExpect(status().isBadRequest());
    }

    @Test
    @WithMockUser
    @Transactional
    public void shouldNotCreateAPlaybackBecauseLatitudeIsNull() throws Exception {

        LatLongDTO latLongDTO = aLatLongDTO()
            .withLatitude(null)
            .withLongitude(LONGITUDE)
            .build();

        restTrackMockMvc.perform(
            put("/api/tracks/{trackId}/play", Long.MAX_VALUE)
                .content(mapper.writeValueAsBytes(latLongDTO))
                .contentType(APPLICATION_JSON))
            .andExpect(status().isBadRequest());
    }

}
