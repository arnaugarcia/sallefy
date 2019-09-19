package com.sallefy.repository;
import com.sallefy.domain.FollowPlaylist;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the FollowPlaylist entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FollowPlaylistRepository extends JpaRepository<FollowPlaylist, Long> {

    @Query("select followPlaylist from FollowPlaylist followPlaylist where followPlaylist.user.login = ?#{principal.username}")
    List<FollowPlaylist> findByUserIsCurrentUser();

}
