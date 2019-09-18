package com.sallefy.service;

import com.sallefy.service.dto.TrackDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.sallefy.domain.Track}.
 */
public interface TrackService {

    /**
     * Save a track.
     *
     * @param trackDTO the entity to save.
     * @return the persisted entity.
     */
    TrackDTO save(TrackDTO trackDTO);

    /**
     * Get all the tracks.
     *
     * @return the list of entities.
     */
    List<TrackDTO> findAll();

    /**
     * Get all the tracks with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    Page<TrackDTO> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" track.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<TrackDTO> findOne(Long id);

    /**
     * Delete the "id" track.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
