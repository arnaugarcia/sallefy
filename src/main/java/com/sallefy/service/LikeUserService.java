package com.sallefy.service;

import com.sallefy.service.dto.LikeUserDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.sallefy.domain.LikeUser}.
 */
public interface LikeUserService {

    /**
     * Save a likeUser.
     *
     * @param likeUserDTO the entity to save.
     * @return the persisted entity.
     */
    LikeUserDTO save(LikeUserDTO likeUserDTO);

    /**
     * Get all the likeUsers.
     *
     * @return the list of entities.
     */
    List<LikeUserDTO> findAll();


    /**
     * Get the "id" likeUser.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<LikeUserDTO> findOne(Long id);

    /**
     * Delete the "id" likeUser.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
