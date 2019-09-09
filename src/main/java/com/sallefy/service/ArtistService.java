package com.sallefy.service;

import com.sallefy.service.dto.ArtistDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.sallefy.domain.Artist}.
 */
public interface ArtistService {

    /**
     * Save a artist.
     *
     * @param artistDTO the entity to save.
     * @return the persisted entity.
     */
    ArtistDTO save(ArtistDTO artistDTO);

    /**
     * Get all the artists.
     *
     * @return the list of entities.
     */
    List<ArtistDTO> findAll();


    /**
     * Get the "id" artist.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ArtistDTO> findOne(Long id);

    /**
     * Delete the "id" artist.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
