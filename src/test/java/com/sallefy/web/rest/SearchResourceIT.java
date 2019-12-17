package com.sallefy.web.rest;

import com.sallefy.SallefyApp;
import com.sallefy.domain.Playlist;
import com.sallefy.domain.Track;
import com.sallefy.domain.User;
import com.sallefy.repository.PlaylistRepository;
import com.sallefy.repository.TrackRepository;
import com.sallefy.repository.UserRepository;
import com.sallefy.service.SearchService;
import com.sallefy.web.rest.errors.ExceptionTranslator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;

import static com.sallefy.web.rest.TestUtil.createFormattingConversionService;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.http.MediaType.APPLICATION_JSON_UTF8_VALUE;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link TrackResource} REST controller.
 */
@SpringBootTest(classes = SallefyApp.class)
public class SearchResourceIT {

    @Autowired
    private SearchService searchService;

    @Autowired
    private TrackRepository trackRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PlaylistRepository playlistRepository;

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

    private MockMvc restSearchMockMvc;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SearchResource searchResource = new SearchResource(searchService);
        this.restSearchMockMvc = MockMvcBuilders.standaloneSetup(searchResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator)
            .build();
    }

    @Test
    public void shouldReturnAListOfPlaylists() throws Exception {

        User user = userRepository.save(UserResourceIT.createBasicUserWithUsername("user-search-test"));
        Playlist playlist = PlaylistResourceIT.createEntity();
        playlist.setUser(user);

        Track track = TrackResourceIT.createEntity();
        track.setUser(user);
        trackRepository.save(track);

        restSearchMockMvc.perform(get("/api/search?keyword=a"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.playlists", hasSize(1)));
    }

}
