package com.sallefy.repository;
import com.sallefy.domain.FollowPlaylist;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Spring Data  repository for the FollowPlaylist entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FollowPlaylistRepository extends JpaRepository<FollowPlaylist, Long> {

    @Query("select followPlaylist from FollowPlaylist followPlaylist where followPlaylist.user.login = ?#{principal.username} and followPlaylist.playlist.id = :playlistId")
    Optional<FollowPlaylist> findByPlaylistAndCurrentUser(@Param("playlistId") Long playlistId);

}
