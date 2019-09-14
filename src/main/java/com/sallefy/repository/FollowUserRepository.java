package com.sallefy.repository;
import com.sallefy.domain.FollowUser;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the FollowUser entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FollowUserRepository extends JpaRepository<FollowUser, Long> {

    @Query("select followUser from FollowUser followUser where followUser.followed.login = ?#{principal.username}")
    List<FollowUser> findByFollowedIsCurrentUser();

    @Query("select followUser from FollowUser followUser where followUser.user.login = ?#{principal.username}")
    List<FollowUser> findByUserIsCurrentUser();

}
