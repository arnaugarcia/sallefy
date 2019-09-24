package com.sallefy.service.impl;

import com.sallefy.domain.Track;
import com.sallefy.domain.User;
import com.sallefy.repository.TrackRepository;
import com.sallefy.service.GenreService;
import com.sallefy.service.TrackService;
import com.sallefy.service.UserService;
import com.sallefy.service.dto.GenreDTO;
import com.sallefy.service.dto.TrackDTO;
import com.sallefy.service.mapper.TrackMapper;
import com.sallefy.web.rest.errors.BadRequestAlertException;
import com.sallefy.web.rest.errors.ErrorConstants;
import com.sallefy.web.rest.errors.TrackNotFoundException;
import com.sallefy.web.rest.errors.UserNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Track}.
 */
@Service
@Transactional
public class TrackServiceImpl implements TrackService {

    private final Logger log = LoggerFactory.getLogger(TrackServiceImpl.class);

    private final TrackRepository trackRepository;

    private final TrackMapper trackMapper;

    private final GenreService genreService;

    private final UserService userService;

    public TrackServiceImpl(TrackRepository trackRepository,
                            TrackMapper trackMapper,
                            GenreService genreService,
                            UserService userService) {
        this.trackRepository = trackRepository;
        this.trackMapper = trackMapper;
        this.genreService = genreService;
        this.userService = userService;
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
        if (isUpdating(trackDTO)) {
            findOne(trackDTO.getId());
            checkUserIsTheOwner(trackDTO);
        }
        filterGenresExist(trackDTO);
        Track track = trackMapper.toEntity(trackDTO);
        return saveAndTransform(track);
    }

    private boolean isUpdating(TrackDTO trackDTO) {
        return trackDTO.getId() != null;
    }

    /**
     * Get all the tracks.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<TrackDTO> findAll() {
        log.debug("Request to get all Tracks");
        return trackRepository.findAllWithEagerRelationships().stream()
            .map(trackMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get all the tracks with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<TrackDTO> findAllWithEagerRelationships(Pageable pageable) {
        return trackRepository.findAllWithEagerRelationships(pageable).map(trackMapper::toDto);
    }


    /**
     * Get one track by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public TrackDTO findOne(Long id) {
        log.debug("Request to get Track : {}", id);
        return trackRepository.findById(id)
            .map(trackMapper::toDto)
            .orElseThrow(TrackNotFoundException::new);
    }

    /**
     * Delete the track by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Track : {}", id);
        findOne(id);
        trackRepository.deleteById(id);
    }

    private void filterGenresExist(TrackDTO trackDTO) {
        List<Long> genresIds = trackDTO.getGenres()
            .stream()
            .map(GenreDTO::getId)
            .collect(Collectors.toList());

        List<GenreDTO> genreDTOList = genreService.findAllById(genresIds);

        trackDTO.setGenres(new HashSet<>(genreDTOList));
    }

    private TrackDTO saveAndTransform(Track track) {
        trackRepository.save(track);
        return trackMapper.toDto(track);
    }

    private void checkUserIsTheOwner(TrackDTO trackDTO) {
        final User user = userService.getUserWithAuthorities()
            .orElseThrow(UserNotFoundException::new);
        if (!user.getLogin().equals(trackDTO.getUserLogin())) {
            throw new BadRequestAlertException("Don't touch this, this Track isn't yours..." , "Track", ErrorConstants.ERR_TRACK_NOT_FOUND);
        }
    }

}
