package com.sallefy.service;

import com.sallefy.service.dto.PlaylistDTO;

import com.sallefy.service.dto.PlaylistRequestDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.sallefy.domain.Playlist}.
 */
public interface PlaylistService {

    /**
     * Save a playlist.
     *
     * @param playlistRequestDTO of the entity to save.
     * @return the persisted entity.
     */
    PlaylistDTO save(PlaylistRequestDTO playlistRequestDTO);

    /**
     * Get all the playlists.
     *
     * @return the list of entities.
     */
    List<PlaylistDTO> findAll();

    /**
     * Get all the playlists with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    Page<PlaylistDTO> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" playlist.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    PlaylistDTO findOne(Long id);

    /**
     * Delete the "id" playlist.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Method to find all the playlists of the current user
     *
     * @return the list of playlists
     */
    List<PlaylistDTO> findAllByCurrentUser();

    /**
     * Method to find a playlist by the current user and by id
     * @param id the id of the playlist
     * @return the playlist
     */
    PlaylistDTO findOwnPlaylistById(Long id);
}
