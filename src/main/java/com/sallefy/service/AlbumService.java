package com.sallefy.service;

import com.sallefy.service.dto.AlbumDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.sallefy.domain.Album}.
 */
public interface AlbumService {

    /**
     * Save a album.
     *
     * @param albumDTO the entity to save.
     * @return the persisted entity.
     */
    AlbumDTO save(AlbumDTO albumDTO);

    /**
     * Get all the albums.
     *
     * @return the list of entities.
     */
    List<AlbumDTO> findAll();

    /**
     * Get all the albums with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    Page<AlbumDTO> findAllWithEagerRelationships(Pageable pageable);
    
    /**
     * Get the "id" album.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<AlbumDTO> findOne(Long id);

    /**
     * Delete the "id" album.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
