package com.sallefy.repository;

import com.sallefy.domain.Track;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Track entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TrackRepository extends JpaRepository<Track, Long> {

    @Query("select track from Track track where track.user.login = ?#{principal.username}")
    List<Track> findByUserIsCurrentUser();

}
