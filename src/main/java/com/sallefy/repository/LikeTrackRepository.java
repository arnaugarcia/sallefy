package com.sallefy.repository;

import com.sallefy.domain.LikeTrack;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the LikeTrack entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LikeTrackRepository extends JpaRepository<LikeTrack, Long> {

}
