package com.sallefy.web.rest;

import com.sallefy.SallefyApp;
import com.sallefy.domain.Track;
import com.sallefy.domain.User;
import com.sallefy.repository.TrackRepository;
import com.sallefy.repository.UserRepository;
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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
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

    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MeResource meResource = new MeResource(trackService);
        this.restMeMockMvc = MockMvcBuilders.standaloneSetup(meResource)
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
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$", hasSize(2)));
    }

}
