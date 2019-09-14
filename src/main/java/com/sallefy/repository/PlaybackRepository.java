package com.sallefy.repository;
import com.sallefy.domain.Playback;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Playback entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PlaybackRepository extends JpaRepository<Playback, Long> {

    @Query("select playback from Playback playback where playback.user.login = ?#{principal.username}")
    List<Playback> findByUserIsCurrentUser();

}
