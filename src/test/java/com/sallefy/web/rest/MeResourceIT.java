package com.sallefy.web.rest;

import com.sallefy.SallefyApp;
import com.sallefy.domain.FollowUser;
import com.sallefy.domain.Track;
import com.sallefy.domain.User;
import com.sallefy.repository.FollowUserRepository;
import com.sallefy.repository.TrackRepository;
import com.sallefy.repository.UserRepository;
import com.sallefy.service.FollowService;
import com.sallefy.service.LikeService;
import com.sallefy.service.TrackService;
import com.sallefy.service.UserService;
import com.sallefy.service.mapper.TrackMapper;
import com.sallefy.web.rest.errors.ExceptionTranslator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;

import static com.sallefy.web.rest.TestUtil.createFormattingConversionService;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.http.MediaType.APPLICATION_JSON_UTF8_VALUE;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link TrackResource} REST controller.
 */
@SpringBootTest(classes = SallefyApp.class)
public class MeResourceIT {

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

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MeResource meResource = new MeResource(trackService, followService);
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

        UserResource userResource = new UserResource(userService, userRepository, followService);
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
    @WithMockUser("basic-user1")
    public void get_all_tracks_of_current_user() throws Exception {

        // Initialize the database
        User basicUser1 = UserResourceIT.createBasicUserWithUsername("basic-user1");
        userRepository.save(basicUser1);

        User basicUser2 = UserResourceIT.createBasicUserWithUsername("basic-user2");
        userRepository.save(basicUser2);

        // Tracks for user 1
        Track track1 = TrackResourceIT.createEntity();
        track1.setUser(basicUser1);
        trackRepository.save(track1);

        Track track2 = TrackResourceIT.createEntity();
        track2.setUser(basicUser1);
        trackRepository.save(track2);

        // Tracks for user 2
        Track track3 = TrackResourceIT.createEntity();
        track3.setUser(basicUser2);
        trackRepository.save(track3);

        // Get all the trackList
        restMeMockMvc.perform(get("/api/me/tracks"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$", hasSize(2)));
    }

    @Test
    @Transactional
    @WithMockUser("basic-liked-track-user")
    public void get_all_liked_tracks() throws Exception {

        // Initialize the database
        User user = UserResourceIT.createBasicUserWithUsername("basic-liked-track-user");
        userRepository.save(user);

        // Tracks for user 1
        Track track1 = TrackResourceIT.createEntity();
        track1.setUser(user);
        Track track = trackRepository.save(track1);

        Track track2 = TrackResourceIT.createEntity();
        track2.setUser(user);
        trackRepository.save(track2);


        Track track3 = TrackResourceIT.createEntity();
        track3.setUser(user);
        trackRepository.save(track3);

        // Get all the trackList
        restMeMockMvc.perform(get("/api/me/tracks/liked"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$", hasSize(0)));

        restTrackMockMvc.perform(put("/api/tracks/{id}/like", track.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.liked").value(true));

        restMeMockMvc.perform(get("/api/me/tracks/liked"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$", hasSize(1)));
    }

    @Test
    @Transactional
    @WithMockUser("basic-user")
    public void get_own_track_by_id() throws Exception {

        // Initialize the database
        User user = UserResourceIT.createBasicUserWithUsername("basic-user");
        userRepository.save(user);

        // Tracks for user 1
        Track track = TrackResourceIT.createEntity();
        track.setUser(user);
        Track savedTrack = trackRepository.save(track);

        restTrackMockMvc.perform(get("/api/tracks/{id}", savedTrack.getId()))
            .andExpect(status().isOk());

    }

    @Test
    @Transactional
    @WithMockUser("basic-user")
    public void get_followers_of_current_user() throws Exception {

        // Initialize the database
        User user = userRepository.save(UserResourceIT.createBasicUserWithUsername("basic-user"));
        User follower = userRepository.save(UserResourceIT.createBasicUserWithUsername("follower"));

        FollowUser followUser = new FollowUser();
        followUser.setFollowed(user);
        followUser.setUser(follower);
        followRepository.save(followUser);
        followRepository.findAll();

        restMeMockMvc.perform(get("/api/me/followers"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$", hasSize(1)));

    }

}
