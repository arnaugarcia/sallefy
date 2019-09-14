package com.sallefy.service;

import com.sallefy.service.dto.FollowUserDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.sallefy.domain.FollowUser}.
 */
public interface FollowUserService {

    /**
     * Save a followUser.
     *
     * @param followUserDTO the entity to save.
     * @return the persisted entity.
     */
    FollowUserDTO save(FollowUserDTO followUserDTO);

    /**
     * Get all the followUsers.
     *
     * @return the list of entities.
     */
    List<FollowUserDTO> findAll();


    /**
     * Get the "id" followUser.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<FollowUserDTO> findOne(Long id);

    /**
     * Delete the "id" followUser.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
