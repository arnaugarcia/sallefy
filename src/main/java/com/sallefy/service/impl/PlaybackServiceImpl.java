package com.sallefy.service.impl;

import com.sallefy.service.PlaybackService;
import com.sallefy.domain.Playback;
import com.sallefy.repository.PlaybackRepository;
import com.sallefy.service.dto.PlaybackDTO;
import com.sallefy.service.mapper.PlaybackMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Playback}.
 */
@Service
@Transactional
public class PlaybackServiceImpl implements PlaybackService {

    private final Logger log = LoggerFactory.getLogger(PlaybackServiceImpl.class);

    private final PlaybackRepository playbackRepository;

    private final PlaybackMapper playbackMapper;

    public PlaybackServiceImpl(PlaybackRepository playbackRepository, PlaybackMapper playbackMapper) {
        this.playbackRepository = playbackRepository;
        this.playbackMapper = playbackMapper;
    }

    /**
     * Save a playback.
     *
     * @param playbackDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public PlaybackDTO save(PlaybackDTO playbackDTO) {
        log.debug("Request to save Playback : {}", playbackDTO);
        Playback playback = playbackMapper.toEntity(playbackDTO);
        playback = playbackRepository.save(playback);
        return playbackMapper.toDto(playback);
    }

    /**
     * Get all the playbacks.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<PlaybackDTO> findAll() {
        log.debug("Request to get all Playbacks");
        return playbackRepository.findAll().stream()
            .map(playbackMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one playback by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<PlaybackDTO> findOne(Long id) {
        log.debug("Request to get Playback : {}", id);
        return playbackRepository.findById(id)
            .map(playbackMapper::toDto);
    }

    /**
     * Delete the playback by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Playback : {}", id);
        playbackRepository.deleteById(id);
    }
}
