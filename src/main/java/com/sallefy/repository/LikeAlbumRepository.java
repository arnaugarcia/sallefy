package com.sallefy.repository;

import com.sallefy.domain.LikeAlbum;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the LikeAlbum entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LikeAlbumRepository extends JpaRepository<LikeAlbum, Long> {

    @Query("select likeAlbum from LikeAlbum likeAlbum where likeAlbum.user.login = ?#{principal.username}")
    List<LikeAlbum> findByUserIsCurrentUser();

}
