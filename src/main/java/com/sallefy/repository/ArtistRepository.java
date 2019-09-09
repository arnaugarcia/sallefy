package com.sallefy.repository;

import com.sallefy.domain.Artist;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Artist entity.
 */
@Repository
public interface ArtistRepository extends JpaRepository<Artist, Long> {

    @Query(value = "select distinct artist from Artist artist left join fetch artist.genres",
        countQuery = "select count(distinct artist) from Artist artist")
    Page<Artist> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct artist from Artist artist left join fetch artist.genres")
    List<Artist> findAllWithEagerRelationships();

    @Query("select artist from Artist artist left join fetch artist.genres where artist.id =:id")
    Optional<Artist> findOneWithEagerRelationships(@Param("id") Long id);

}
