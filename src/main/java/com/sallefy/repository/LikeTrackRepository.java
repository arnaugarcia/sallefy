package com.sallefy.repository;

import com.sallefy.domain.LikeTrack;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the LikeTrack entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LikeTrackRepository extends JpaRepository<LikeTrack, Long> {

    @Query("select likeTrack from LikeTrack likeTrack where likeTrack.user.login = ?#{principal.username}")
    List<LikeTrack> findByUserIsCurrentUser();

}
