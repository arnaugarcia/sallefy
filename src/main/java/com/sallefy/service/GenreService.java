package com.sallefy.service;

import com.sallefy.service.dto.GenreDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.sallefy.domain.Genre}.
 */
public interface GenreService {

    /**
     * Save a genre.
     *
     * @param genreDTO the entity to save.
     * @return the persisted entity.
     */
    GenreDTO save(GenreDTO genreDTO);

    /**
     * Get all the genres.
     *
     * @return the list of entities.
     */
    List<GenreDTO> findAll();


    /**
     * Get the "id" genre.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<GenreDTO> findOne(Long id);

    /**
     * Delete the "id" genre.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
