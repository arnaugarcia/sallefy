package com.sallefy.service;

import com.sallefy.domain.Genre;
import com.sallefy.service.dto.GenreDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Genre}.
 */

public interface GenreService {

    GenreDTO save(GenreDTO genreDTO);

    /**
     * Get all the genres.
     *
     * @return the list of entities.
     */
    List<GenreDTO> findAll();

    /**
     * Get genres by list of Ids.
     *
     * @return the list of entities.
     */
    List<GenreDTO> findAllById(List<Long> genresIds);

    /**
     * Get one genre by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<GenreDTO> findOne(Long id);

    /**
     * Delete the genre by id.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
