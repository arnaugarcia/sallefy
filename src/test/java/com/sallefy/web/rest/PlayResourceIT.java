package com.sallefy.web.rest;

import com.sallefy.SallefyApp;
import com.sallefy.domain.Track;
import com.sallefy.domain.User;
import com.sallefy.repository.PlaybackRepository;
import com.sallefy.repository.TrackRepository;
import com.sallefy.repository.UserRepository;
import com.sallefy.service.*;
import com.sallefy.web.rest.errors.ExceptionTranslator;
import org.junit.Ignore;
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

import static com.sallefy.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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

    private MockMvc restTrackMockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LikeService likeService;

    @Autowired
    private UserService userService;

    @Autowired
    private FollowService followService;

    @Autowired
    private PlaylistService playlistService;

    @Autowired
    private PlaybackRepository playbackRepository;

    @Autowired
    private PlayService playService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        TrackResource trackResource = new TrackResource(trackService, likeService, playService);
        this.restTrackMockMvc = MockMvcBuilders.standaloneSetup(trackResource)
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
    @Ignore("Uses a external service")
    public void should_create_a_playback() throws Exception {

        // Initialize the database
        final User user = userRepository.save(UserResourceIT.createBasicUserWithUsername("playback-user"));

        Track track = TrackResourceIT.createEntity();
        track.setUser(user);
        trackRepository.save(track);

        assertThat(trackRepository.findById(track.getId())).isPresent();

        restTrackMockMvc.perform(
            put("/api/tracks/{trackId}/play", track.getId())
                .with(request -> {
                    request.setRemoteAddr("8.8.8.8");
                    return request;
                }))
            .andExpect(status().isCreated());

        assertThat(playbackRepository.findAll()).hasSize(1);

    }

}
