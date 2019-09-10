package com.sallefy.repository;

import com.sallefy.domain.LikeUser;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the LikeUser entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LikeUserRepository extends JpaRepository<LikeUser, Long> {

    @Query("select likeUser from LikeUser likeUser where likeUser.likedUser.login = ?#{principal.username}")
    List<LikeUser> findByLikedUserIsCurrentUser();

    @Query("select likeUser from LikeUser likeUser where likeUser.user.login = ?#{principal.username}")
    List<LikeUser> findByUserIsCurrentUser();

}
