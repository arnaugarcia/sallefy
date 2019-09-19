package com.sallefy.service;

import com.sallefy.domain.FollowPlaylist;
import com.sallefy.repository.FollowPlaylistRepository;
import com.sallefy.service.dto.FollowPlaylistDTO;
import com.sallefy.service.mapper.FollowPlaylistMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link FollowPlaylist}.
 */
@Service
@Transactional
public class FollowPlaylistService {

    private final Logger log = LoggerFactory.getLogger(FollowPlaylistService.class);

    private final FollowPlaylistRepository followPlaylistRepository;

    private final FollowPlaylistMapper followPlaylistMapper;

    public FollowPlaylistService(FollowPlaylistRepository followPlaylistRepository, FollowPlaylistMapper followPlaylistMapper) {
        this.followPlaylistRepository = followPlaylistRepository;
        this.followPlaylistMapper = followPlaylistMapper;
    }

    /**
     * Save a followPlaylist.
     *
     * @param followPlaylistDTO the entity to save.
     * @return the persisted entity.
     */
    public FollowPlaylistDTO save(FollowPlaylistDTO followPlaylistDTO) {
        log.debug("Request to save FollowPlaylist : {}", followPlaylistDTO);
        FollowPlaylist followPlaylist = followPlaylistMapper.toEntity(followPlaylistDTO);
        followPlaylist = followPlaylistRepository.save(followPlaylist);
        return followPlaylistMapper.toDto(followPlaylist);
    }

    /**
     * Get all the followPlaylists.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<FollowPlaylistDTO> findAll() {
        log.debug("Request to get all FollowPlaylists");
        return followPlaylistRepository.findAll().stream()
            .map(followPlaylistMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one followPlaylist by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<FollowPlaylistDTO> findOne(Long id) {
        log.debug("Request to get FollowPlaylist : {}", id);
        return followPlaylistRepository.findById(id)
            .map(followPlaylistMapper::toDto);
    }

    /**
     * Delete the followPlaylist by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete FollowPlaylist : {}", id);
        followPlaylistRepository.deleteById(id);
    }
}
