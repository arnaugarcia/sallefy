package com.sallefy.repository;

import com.sallefy.domain.Playback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Playback entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PlaybackRepository extends JpaRepository<Playback, Long>, JpaSpecificationExecutor<Playback> {

    @Query("select playback from Playback playback where playback.user.login = ?#{principal.username}")
    List<Playback> findByUserIsCurrentUser();

    void deleteAllByUserLogin(String login);
}
