package com.sallefy.web.rest;

import com.sallefy.SallefyApp;
import com.sallefy.domain.FollowUser;
import com.sallefy.domain.Playlist;
import com.sallefy.domain.Track;
import com.sallefy.domain.User;
import com.sallefy.repository.*;
import com.sallefy.service.*;
import com.sallefy.service.dto.PlaylistRequestDTO;
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

import static com.sallefy.web.rest.TestUtil.*;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.http.MediaType.APPLICATION_JSON_UTF8_VALUE;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link TrackResource} REST controller.
 */
@SpringBootTest(classes = SallefyApp.class)
public class PlayResourceIT {

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

    private MockMvc restMeMockMvc;

    private MockMvc restTrackMockMvc;

    private MockMvc restPlaylistMockMvc;

    private MockMvc restUserMockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LikeService likeService;

    @Autowired
    private UserService userService;

    @Autowired
    private FollowService followService;

    @Autowired
    private FollowUserRepository followRepository;

    @Autowired
    private PlaylistService playlistService;

    @Autowired
    private PlaylistRepository playlistRepository;

    @Autowired
    private PlaybackRepository playbackRepository;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MeResource meResource = new MeResource(trackService, followService, playlistService);
        this.restMeMockMvc = MockMvcBuilders.standaloneSetup(meResource)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator)
            .build();

        TrackResource trackResource = new TrackResource(trackService, likeService);
        this.restTrackMockMvc = MockMvcBuilders.standaloneSetup(trackResource)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator)
            .build();

        PlaylistResource playlistResource = new PlaylistResource(playlistService, followService);
        this.restPlaylistMockMvc = MockMvcBuilders.standaloneSetup(playlistResource)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator)
            .build();

        UserResource userResource = new UserResource(userService, userRepository, followService, playlistService, trackService);
        this.restUserMockMvc = MockMvcBuilders.standaloneSetup(userResource)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator)
            .build();


    }

    @BeforeEach
    public void initTest() {

    }

    @Test
    @Transactional
    @WithMockUser("playback-user")
    public void should_create_a_playback() throws Exception {

        // Initialize the database
        User user = userRepository.save(UserResourceIT.createBasicUserWithUsername("playback-user"));

        Track track = trackRepository.save(TrackResourceIT.createEntity());

        assertThat(trackRepository.findById(track.getId())).isPresent();

        restTrackMockMvc.perform(put("/api/tracks/{trackId}/play", track.getId()))
            .andExpect(status().isCreated());

        assertThat(playbackRepository.findAll()).hasSize(1);

    }

}
