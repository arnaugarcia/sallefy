package com.sallefy.service;

import com.sallefy.service.dto.LikeAlbumDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.sallefy.domain.LikeAlbum}.
 */
public interface LikeAlbumService {

    /**
     * Save a likeAlbum.
     *
     * @param likeAlbumDTO the entity to save.
     * @return the persisted entity.
     */
    LikeAlbumDTO save(LikeAlbumDTO likeAlbumDTO);

    /**
     * Get all the likeAlbums.
     *
     * @return the list of entities.
     */
    List<LikeAlbumDTO> findAll();


    /**
     * Get the "id" likeAlbum.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<LikeAlbumDTO> findOne(Long id);

    /**
     * Delete the "id" likeAlbum.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
