package com.sallefy.repository;

import com.sallefy.domain.Playback;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
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

    @EntityGraph(attributePaths = "track.genres")
    @Override
    List<Playback> findAll(Specification<Playback> specification);

    @EntityGraph(attributePaths = "track.genres")
    @Override
    Page<Playback> findAll(Specification<Playback> specification, Pageable pageable);
}
