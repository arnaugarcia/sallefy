package com.sallefy.service;

import com.sallefy.service.dto.LikeTrackDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.sallefy.domain.LikeTrack}.
 */
public interface LikeTrackService {

    /**
     * Save a likeTrack.
     *
     * @param likeTrackDTO the entity to save.
     * @return the persisted entity.
     */
    LikeTrackDTO save(LikeTrackDTO likeTrackDTO);

    /**
     * Get all the likeTracks.
     *
     * @return the list of entities.
     */
    List<LikeTrackDTO> findAll();


    /**
     * Get the "id" likeTrack.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<LikeTrackDTO> findOne(Long id);

    /**
     * Delete the "id" likeTrack.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
