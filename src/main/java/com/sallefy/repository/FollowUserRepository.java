package com.sallefy.repository;

import com.sallefy.domain.FollowUser;
import com.sallefy.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the FollowUser entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FollowUserRepository extends JpaRepository<FollowUser, Long> {

    @Query("select followUser from FollowUser followUser where followUser.followed.login = ?#{principal.username}")
    List<FollowUser> findByFollowedIsCurrentUser();

    @Query("select followUser.user from FollowUser followUser inner join followUser.user where followUser.followed.login = ?#{principal.username}")
    List<User> findFollowersByCurrentUser();

    @Query("select followUser.user from FollowUser followUser inner join followUser.user where followUser.followed.login = :login")
    List<User> findFollowersByLogin(@Param("login") String login);

    @Query("select followUser.followed from FollowUser followUser inner join followUser.user where followUser.user.login = ?#{principal.username}")
    List<User> findFollowingsByCurrentUser();

    @Query("select followUser.followed from FollowUser followUser inner join followUser.user where followUser.user.login = :login")
    List<User> findFollowingsByLogin(@Param("login") String login);

    @Query("select followUser from FollowUser followUser where followUser.user.login = ?#{principal.username}")
    List<FollowUser> findByUserIsCurrentUser();

    @Query("select followUser from FollowUser followUser where followUser.user.login = ?#{principal.username} and followUser.followed.login = :login")
    Optional<FollowUser> findIfFollowedUserIsFollowedByCurrentUser(@Param("login") String login);

}
