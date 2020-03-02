package com.sallefy.web.rest;

import com.sallefy.SallefyApp;
import com.sallefy.domain.User;
import com.sallefy.repository.UserRepository;
import com.sallefy.service.FollowService;
import com.sallefy.service.UserService;
import com.sallefy.service.dto.UserDTO;
import com.sallefy.service.dto.criteria.UserCriteriaDTO;
import com.sallefy.service.impl.UserQueryService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(classes = SallefyApp.class)
public class FollowResourceIT {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private FollowService followService;

    @Autowired
    private UserQueryService userQueryService;

    @Test
    @Transactional
    @WithMockUser("not-following-user")
    public void shouldReturnNotFollowingUsers() {

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
