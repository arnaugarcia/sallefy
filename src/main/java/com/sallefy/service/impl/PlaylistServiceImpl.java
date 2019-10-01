package com.sallefy.service.impl;

import com.sallefy.domain.Playlist;
import com.sallefy.domain.User;
import com.sallefy.repository.PlaylistRepository;
import com.sallefy.service.PlaylistService;
import com.sallefy.service.UserService;
import com.sallefy.service.dto.PlaylistDTO;
import com.sallefy.service.mapper.PlaylistMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Playlist}.
 */
@Service
@Transactional
public class PlaylistServiceImpl implements PlaylistService {

    private final Logger log = LoggerFactory.getLogger(PlaylistServiceImpl.class);

    private final PlaylistRepository playlistRepository;

    private final PlaylistMapper playlistMapper;

    private final UserService userService;

    public PlaylistServiceImpl(PlaylistRepository playlistRepository, PlaylistMapper playlistMapper, UserService userService) {
        this.playlistRepository = playlistRepository;
        this.playlistMapper = playlistMapper;
        this.userService = userService;
    }

    /**
     * Save a playlist.
     *
     * @param playlistDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public PlaylistDTO save(PlaylistDTO playlistDTO) {
        log.debug("Request to save Playlist : {}", playlistDTO);
        Playlist playlist = playlistMapper.toEntity(playlistDTO);
        playlist = playlistRepository.save(playlist);
        return playlistMapper.toDto(playlist);
    }

    /**
     * Get all the playlists.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<PlaylistDTO> findAll() {
        log.debug("Request to get all Playlists");

        final User user = userService.getUserWithAuthorities();

        List<Playlist> playlists;

        if (user.isAdmin()) {
            playlists = playlistRepository.findAllWithEagerRelationships();
        } else {
            playlists = playlistRepository.findAllWithEagerRelationshipsAndPublicAccessibleTrue();
        }

        return playlists.stream()
            .map(playlistMapper::toDto)
            .collect(Collectors.toList());
    }

    /**
     * Get all the playlists with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<PlaylistDTO> findAllWithEagerRelationships(Pageable pageable) {
        return playlistRepository.findAllWithEagerRelationships(pageable).map(playlistMapper::toDto);
    }


    /**
     * Get one playlist by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<PlaylistDTO> findOne(Long id) {
        log.debug("Request to get Playlist : {}", id);
        return playlistRepository.findOneWithEagerRelationships(id)
            .map(playlistMapper::toDto);
    }

    /**
     * Delete the playlist by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Playlist : {}", id);
        playlistRepository.deleteById(id);
    }
}
