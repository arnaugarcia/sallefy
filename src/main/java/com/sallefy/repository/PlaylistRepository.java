package com.sallefy.repository;

import com.sallefy.domain.Playlist;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Playlist entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PlaylistRepository extends JpaRepository<Playlist, Long> {

    @Query("select playlist from Playlist playlist where playlist.owner.login = ?#{principal.username}")
    List<Playlist> findByOwnerIsCurrentUser();

}
