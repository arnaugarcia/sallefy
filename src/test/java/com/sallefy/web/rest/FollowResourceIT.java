package com.sallefy.web.rest;

import com.sallefy.SallefyApp;
import com.sallefy.domain.User;
import com.sallefy.repository.UserRepository;
import com.sallefy.service.FollowService;
import com.sallefy.service.PlaylistService;
import com.sallefy.service.UserService;
import com.sallefy.service.dto.UserDTO;
import com.sallefy.service.dto.criteria.UserCriteriaDTO;
import com.sallefy.service.impl.TrackQueryService;
import com.sallefy.service.impl.UserQueryService;
import com.sallefy.web.rest.errors.ExceptionTranslator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.sallefy.web.rest.TestUtil.APPLICATION_JSON_UTF8;
import static com.sallefy.web.rest.TestUtil.convertObjectToJsonBytes;
import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(classes = SallefyApp.class)
public class FollowResourceIT {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    private MockMvc restFollowUserMockMvc;

    @Autowired
    private PlaylistService playlistService;

    @Autowired
    private FollowService followService;

    @Autowired
    private UserQueryService userQueryService;

    @Autowired
    private TrackQueryService trackQueryService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @BeforeEach()
    void void setup() {
        UserResource userResource = new UserResource(userService, userRepository, followService, playlistService, trackQueryService, userQueryService);

        this.restFollowUserMockMvc = MockMvcBuilders.standaloneSetup(userResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter)
            .build();
    }


    @Test
    @Transactional
    @WithMockUser("not-following-user")
    public void shouldReturnNotFollowingUsers() throws Exception {

        // Initialize the database
        User user = UserResourceIT.createBasicUserWithUsername("not-following-user");
        userRepository.save(user);

        User follower1 = UserResourceIT.createEntity();
        userRepository.save(follower1);

        final List<UserDTO> nonFollowingUsers = userQueryService.findByCriteria(new UserCriteriaDTO(null, null, true));
        final int sizeBeforeFollowing = nonFollowingUsers.size();

        assertThat(sizeBeforeFollowing).isGreaterThan(0);

        followService.toggleFollowUser(follower1.getLogin());



        restFollowUserMockMvc.perform(get("/api/playlists/")
            .contentType(APPLICATION_JSON_UTF8)
            .content(convertObjectToJsonBytes(new UserCriteriaDTO(null, null, true))))
            .andExpect(status().isCreated());

        assertThat(notFollowingUsersAfterUpdating.size()).isLessThan(sizeBeforeFollowing);

    }

    @Test
    @Transactional
    @WithMockUser("not-following-user-paginated")
    public void shouldReturnNotFollowingUsersWithLimit() {

        // Initialize the database
        User user = UserResourceIT.createBasicUserWithUsername("not-following-user");
        userRepository.save(user);

        User follower1 = UserResourceIT.createEntity();
        userRepository.save(follower1);

        final List<UserDTO> nonFollowingUsers = userQueryService.findByCriteria(new UserCriteriaDTO(null, null, true));
        final int sizeBeforeFollowing = nonFollowingUsers.size();

        assertThat(sizeBeforeFollowing).isGreaterThan(0);

        followService.toggleFollowUser(follower1.getLogin());

        final List<UserDTO> notFollowingUsersAfterUpdating = userQueryService.findByCriteria(new UserCriteriaDTO(null, null, true));

        assertThat(notFollowingUsersAfterUpdating.size()).isLessThan(sizeBeforeFollowing);

    }
}
