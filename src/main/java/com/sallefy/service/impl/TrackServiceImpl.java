package com.sallefy.service.impl;

import com.sallefy.domain.Genre;
import com.sallefy.domain.Track;
import com.sallefy.domain.User;
import com.sallefy.repository.GenreRepository;
import com.sallefy.repository.TrackRepository;
import com.sallefy.service.TrackService;
import com.sallefy.service.UserService;
import com.sallefy.service.dto.GenreDTO;
import com.sallefy.service.dto.TrackDTO;
import com.sallefy.service.exception.BadOwnerException;
import com.sallefy.service.exception.GenreNotFound;
import com.sallefy.service.exception.TrackNotFoundException;
import com.sallefy.service.mapper.TrackMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;

import static java.util.stream.Collectors.toCollection;
import static java.util.stream.Collectors.toList;

/**
 * Service Implementation for managing {@link Track}.
 */
@Service
@Transactional
public class TrackServiceImpl implements TrackService {

    private final Logger log = LoggerFactory.getLogger(TrackServiceImpl.class);

    private final TrackRepository trackRepository;

    private final GenreRepository genreRepository;

    private final TrackMapper trackMapper;

    private final UserService userService;

    public TrackServiceImpl(TrackRepository trackRepository,
                            GenreRepository genreRepository,
                            TrackMapper trackMapper,
                            UserService userService) {
        this.trackRepository = trackRepository;
        this.genreRepository = genreRepository;
        this.trackMapper = trackMapper;
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

        final User currentUser = userService.getUserWithAuthorities();

        Track track = new Track();

        if (isUpdating(trackDTO)) {
            track = findTrack(trackDTO.getId());
            if (!currentUser.isAdmin()) {
                checkUserIsTheOwner(track, currentUser);
            }
        } else {
            track.setUser(currentUser);
        }

        updateTrackFields(trackDTO, track);

        return saveAndTransform(track);
    }

    private void updateTrackFields(TrackDTO trackDTO, Track track) {
        track.setColor(trackDTO.getColor());
        track.setName(trackDTO.getName());
        track.setDuration(trackDTO.getDuration());
        track.setReleased(trackDTO.getReleased());
        track.setThumbnail(trackDTO.getThumbnail());
        track.setUrl(trackDTO.getUrl());
        track.setGenres(filterGenresExist(trackDTO));

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
        final User user = userService.getUserWithAuthorities();

        List<Track> tracks;

        if (user.isAdmin()) {
            tracks = trackRepository.findAllWithEagerRelationships();
        } else {
            tracks = trackRepository.findByUserIsCurrentUser();
        }

        return tracks.stream()
            .map(trackMapper::toDto)
            .collect(toCollection(LinkedList::new));
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
     * @param trackId the id of the entity.
     */
    @Override
    public void delete(Long trackId) {
        log.debug("Request to delete Track : {}", trackId);

        final User currentUser = userService.getUserWithAuthorities();

        Track track = findTrack(trackId);

        if (!currentUser.isAdmin()) {
            checkUserIsTheOwner(track, currentUser);
        }

        trackRepository.deleteById(trackId);
    }

    @Override
    public List<TrackDTO> findByIds(List<Long> tracksIds) {
        return trackRepository.findAllById(tracksIds)
            .stream()
            .map(trackMapper::toDto)
            .collect(toList());
    }

    @Override
    public List<TrackDTO> findAllByCurrentUser() {
        return trackRepository.findByUserIsCurrentUser()
            .stream()
            .map(trackMapper::toDto)
            .collect(toList());
    }

    @Override
    public List<TrackDTO> findAllCurrentUserLiked() {
        return trackRepository.findAllLikedTracksByCurrentUser()
            .stream()
            .map(trackMapper::toDto)
            .collect(toList());
    }

    @Override
    public TrackDTO findOwnTrackById(Long trackId) {
        return trackRepository.findByUserIsCurrentUserAndId(trackId)
            .map(trackMapper::toDto)
            .orElseThrow(TrackNotFoundException::new);

    }

    @Override
    public List<TrackDTO> findAllByUserLogin(String login) {
        return trackRepository.findAllByUserLogin(login)
            .stream()
            .map(trackMapper::toDto)
            .collect(toList());

    }

    @Override
    public List<TrackDTO> findTracksByGenreId(Long genreId) {
        genreRepository.findById(genreId)
            .orElseThrow(GenreNotFound::new);

        return trackRepository.findAllByGenreId(genreId)
            .stream()
            .map(trackMapper::toDto)
            .collect(toList());
    }

    private HashSet<Genre> filterGenresExist(TrackDTO trackDTO) {
        List<Long> genresIds = extractGenresIds(trackDTO);

        List<Genre> genreList = genreRepository.findAllById(genresIds);

        return new HashSet<>(genreList);
    }

    private List<Long> extractGenresIds(TrackDTO trackDTO) {
        return trackDTO.getGenres()
            .stream()
            .map(GenreDTO::getId)
            .collect(toList());
    }


    private Track findTrack(Long trackId) {
        return trackRepository
            .findById(trackId)
            .orElseThrow(TrackNotFoundException::new);
    }

    private boolean isUpdating(TrackDTO trackDTO) {
        return trackDTO.getId() != null;
    }

    private TrackDTO saveAndTransform(Track track) {
        trackRepository.save(track);
        return trackMapper.toDto(track);
    }

    private void checkUserIsTheOwner(Track track, User user) {
        if (!user.getLogin().equals(track.getUser().getLogin())) {
            throw new BadOwnerException();
        }
    }

}
