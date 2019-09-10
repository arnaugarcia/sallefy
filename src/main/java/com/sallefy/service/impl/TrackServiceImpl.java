package com.sallefy.service.impl;

import com.sallefy.service.TrackService;
import com.sallefy.domain.Track;
import com.sallefy.repository.TrackRepository;
import com.sallefy.service.dto.TrackDTO;
import com.sallefy.service.mapper.TrackMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Track}.
 */
@Service
@Transactional
public class TrackServiceImpl implements TrackService {

    private final Logger log = LoggerFactory.getLogger(TrackServiceImpl.class);

    private final TrackRepository trackRepository;

    private final TrackMapper trackMapper;

    public TrackServiceImpl(TrackRepository trackRepository, TrackMapper trackMapper) {
        this.trackRepository = trackRepository;
        this.trackMapper = trackMapper;
    }

    /**
     * Save a track.
     *
     * @param trackDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public TrackDTO save(TrackDTO trackDTO) {
        log.debug("Request to save Track : {}", trackDTO);
        Track track = trackMapper.toEntity(trackDTO);
        track = trackRepository.save(track);
        return trackMapper.toDto(track);
    }

    /**
     * Get all the tracks.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<TrackDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Tracks");
        return trackRepository.findAll(pageable)
            .map(trackMapper::toDto);
    }


    /**
     * Get one track by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<TrackDTO> findOne(Long id) {
        log.debug("Request to get Track : {}", id);
        return trackRepository.findById(id)
            .map(trackMapper::toDto);
    }

    /**
     * Delete the track by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Track : {}", id);
        trackRepository.deleteById(id);
    }
}
