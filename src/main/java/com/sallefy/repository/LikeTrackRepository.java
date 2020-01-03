package com.sallefy.repository;
import com.sallefy.domain.LikeTrack;
import com.sallefy.domain.Track;
import org.springframework.data.jpa.repository.*;
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

}
