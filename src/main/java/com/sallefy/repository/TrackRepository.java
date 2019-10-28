package com.sallefy.repository;
import com.sallefy.domain.Track;
import com.sallefy.service.dto.TrackDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Track entity.
 */
@Repository
public interface TrackRepository extends JpaRepository<Track, Long>, JpaSpecificationExecutor<Track> {

    @Query("select track from Track track where track.user.login = ?#{principal.username}")
    List<Track> findByUserIsCurrentUser();

    @Query("select track from Track track where track.user.login = ?#{principal.username} and track.id = :id")
    Optional<Track> findByUserIsCurrentUserAndId(@Param("id") Long trackId);

    @Query(value = "select distinct track from Track track left join fetch track.genres",
        countQuery = "select count(distinct track) from Track track")
    Page<Track> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct track from Track track left join fetch track.genres")
    List<Track> findAllWithEagerRelationships();

    @Query("select track from Track track left join fetch track.genres where track.id =:id")
    Optional<Track> findOneWithEagerRelationships(@Param("id") Long id);

    @Query("select track from Track track inner join track.likeTracks where track.user.login = ?#{principal.username}")
    List<Track> findAllLikedTracksByCurrentUser();

    @Query("select track from Track track where track.user.login = :login")
    List<Track> findAllByUserLogin(@Param("login") String login);

    @Query("select track from Track track left join fetch track.genres genres left join fetch track.user where genres.id = :genreId")
    List<Track> findAllByGenreId(@Param("genreId") Long genreId);
}
