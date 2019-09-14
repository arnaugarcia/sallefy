package com.sallefy.service;

import com.sallefy.service.dto.PlaybackDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.sallefy.domain.Playback}.
 */
public interface PlaybackService {

    /**
     * Save a playback.
     *
     * @param playbackDTO the entity to save.
     * @return the persisted entity.
     */
    PlaybackDTO save(PlaybackDTO playbackDTO);

    /**
     * Get all the playbacks.
     *
     * @return the list of entities.
     */
    List<PlaybackDTO> findAll();


    /**
     * Get the "id" playback.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<PlaybackDTO> findOne(Long id);

    /**
     * Delete the "id" playback.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
