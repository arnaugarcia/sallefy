package com.sallefy.service;

import com.sallefy.domain.LikeTrack;
import com.sallefy.repository.LikeTrackRepository;
import com.sallefy.service.dto.LikeTrackDTO;
import com.sallefy.service.mapper.LikeTrackMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link LikeTrack}.
 */
@Service
@Transactional
public class LikeTrackService {

    private final Logger log = LoggerFactory.getLogger(LikeTrackService.class);

    private final LikeTrackRepository likeTrackRepository;

    private final LikeTrackMapper likeTrackMapper;

    public LikeTrackService(LikeTrackRepository likeTrackRepository, LikeTrackMapper likeTrackMapper) {
        this.likeTrackRepository = likeTrackRepository;
        this.likeTrackMapper = likeTrackMapper;
    }

    /**
     * Save a likeTrack.
     *
     * @param likeTrackDTO the entity to save.
     * @return the persisted entity.
     */
    public LikeTrackDTO save(LikeTrackDTO likeTrackDTO) {
        log.debug("Request to save LikeTrack : {}", likeTrackDTO);
        LikeTrack likeTrack = likeTrackMapper.toEntity(likeTrackDTO);
        likeTrack = likeTrackRepository.save(likeTrack);
        return likeTrackMapper.toDto(likeTrack);
    }

    /**
     * Get all the likeTracks.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<LikeTrackDTO> findAll() {
        log.debug("Request to get all LikeTracks");
        return likeTrackRepository.findAll().stream()
            .map(likeTrackMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one likeTrack by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<LikeTrackDTO> findOne(Long id) {
        log.debug("Request to get LikeTrack : {}", id);
        return likeTrackRepository.findById(id)
            .map(likeTrackMapper::toDto);
    }

    /**
     * Delete the likeTrack by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete LikeTrack : {}", id);
        likeTrackRepository.deleteById(id);
    }
}
