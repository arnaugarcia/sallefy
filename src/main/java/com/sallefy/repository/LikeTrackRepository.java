package com.sallefy.repository;

import com.sallefy.domain.LikeTrack;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the LikeTrack entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LikeTrackRepository extends JpaRepository<LikeTrack, Long> {

    @Query("select likeTrack from LikeTrack likeTrack where likeTrack.user.login = ?#{principal.username}")
    List<LikeTrack> findByUserIsCurrentUser();

    @Query("select likeTrack from LikeTrack likeTrack where likeTrack.user.login = ?#{principal.username} and likeTrack.track.id = :id")
    Optional<LikeTrack> findTrackByUserIsCurrentUser(@Param("id") Long id);

    void deleteByUserLogin(String login);
}
