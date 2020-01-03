package com.sallefy.repository;

import com.sallefy.domain.FollowPlaylist;
import com.sallefy.domain.Playlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the FollowPlaylist entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FollowPlaylistRepository extends JpaRepository<FollowPlaylist, Long> {

    @Query("select followPlaylist from FollowPlaylist followPlaylist where followPlaylist.user.login = ?#{principal.username} and followPlaylist.playlist.id = :playlistId")
    Optional<FollowPlaylist> findByIdAndCurrentUser(@Param("playlistId") Long playlistId);

    @Query("select followPlaylist.playlist from FollowPlaylist followPlaylist inner join followPlaylist.playlist where followPlaylist.user.login = ?#{principal.username}")
    List<Playlist> findPlaylistFollowedByCurrentUser();

    void deleteByPlaylistId(@Param("playlistId") Long playlistId);

}
