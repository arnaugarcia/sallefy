package com.sallefy.service.impl;

import com.sallefy.domain.Playlist;
import com.sallefy.domain.Track;
import com.sallefy.domain.User;
import com.sallefy.repository.PlaylistRepository;
import com.sallefy.service.PlaylistService;
import com.sallefy.service.TrackService;
import com.sallefy.service.UserService;
import com.sallefy.service.dto.PlaylistDTO;
import com.sallefy.service.dto.PlaylistRequestDTO;
import com.sallefy.service.dto.TrackDTO;
import com.sallefy.service.exception.PlaylistNotFound;
import com.sallefy.service.mapper.PlaylistMapper;
import com.sallefy.service.mapper.TrackMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;

import static java.util.stream.Collectors.toList;

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

    private final TrackService trackService;

    private final TrackMapper trackMapper;

    public PlaylistServiceImpl(PlaylistRepository playlistRepository,
                               PlaylistMapper playlistMapper,
                               UserService userService,
                               TrackService trackService,
                               TrackMapper trackMapper) {
        this.playlistRepository = playlistRepository;
        this.playlistMapper = playlistMapper;
        this.userService = userService;
        this.trackService = trackService;
        this.trackMapper = trackMapper;
    }

    /**
     * Save a playlist.
     *
     * @param playlistRequest of the entity to save.
     * @return the persisted entity.
     */
    @Override
    public PlaylistDTO save(PlaylistRequestDTO playlistRequest) {
        log.debug("Request to save Playlist : {}", playlistRequest);

        final User currentUser = userService.getUserWithAuthorities();

        Playlist playlist = new Playlist();

        if (isUpdating(playlistRequest)) {
            playlist = findById(playlistRequest.getId());
        }

        if (!currentUser.isAdmin()) {
            playlist.setUser(currentUser);
            // Check the owner
        }

        updatePlaylistFields(playlistRequest, playlist);

        return saveAndTransform(playlist);

    }

    private void updatePlaylistFields(PlaylistRequestDTO playlistRequest, Playlist playlist) {
        List<Long> tracksIds = playlistRequest.getTracks()
            .stream()
            .map(TrackDTO::getId)
            .collect(toList());

        List<Track> tracks = trackService.findByIds(tracksIds)
            .stream()
            .map(trackMapper::toEntity)
            .collect(toList());

        playlist.setTracks(new HashSet<>(tracks));
        playlist.setCover(playlistRequest.getCover());
        playlist.setName(playlistRequest.getName());
        playlist.setDescription(playlistRequest.getDescription());
        playlist.setThumbnail(playlistRequest.getThumbnail());
        playlist.setPublicAccessible(playlistRequest.isPublicAccessible());
    }

    private PlaylistDTO saveAndTransform(Playlist playlist) {
        Playlist result = playlistRepository.save(playlist);
        return playlistMapper.toDto(result);
    }

    private Playlist findById(Long playlistId) {
        return playlistRepository.findById(playlistId)
            .orElseThrow(PlaylistNotFound::new);
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
            .collect(toList());
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
    public PlaylistDTO findOne(Long id) {
        log.debug("Request to get Playlist : {}", id);
        return playlistRepository.findOneWithEagerRelationships(id)
            .map(playlistMapper::toDto)
            .orElseThrow(PlaylistNotFound::new);
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

    private boolean isUpdating(PlaylistRequestDTO playlistRequest) {
        return playlistRequest.getId() != null;
    }
}
