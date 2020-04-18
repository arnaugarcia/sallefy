package com.sallefy.service.impl;

import com.sallefy.domain.*;
import com.sallefy.repository.PlaybackRepository;
import com.sallefy.service.QueryService;
import com.sallefy.service.dto.PlaybackDTO;
import com.sallefy.service.dto.criteria.PlaybackCriteriaDTO;
import com.sallefy.service.mapper.PlaybackMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.SetJoin;
import java.util.List;

import static java.lang.Math.cos;
import static org.springframework.util.ObjectUtils.isEmpty;

/**
 * Service for executing complex queries for {@link Playback} entities in the database.
 * The main input is a {@link PlaybackCriteriaDTO} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link PlaybackDTO} which fulfills the criteria.
 */
@Service
public class MarkerQueryService implements QueryService<PlaybackDTO, PlaybackCriteriaDTO> {

    private final Logger log = LoggerFactory.getLogger(MarkerQueryService.class);

    private final PlaybackRepository playbackRepository;
    private final PlaybackMapper playbackMapper;

    public MarkerQueryService(PlaybackRepository playbackRepository, PlaybackMapper playbackMapper) {
        this.playbackRepository = playbackRepository;
        this.playbackMapper = playbackMapper;
    }

    /**
     * Return a {@link List} of {@link PlaybackDTO} which matches the criteria from the database.
     *
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Override
    public Page<PlaybackDTO> findByCriteria(PlaybackCriteriaDTO criteria, Pageable pageable) {
        log.debug("find playbacks by criteria : {}", criteria);

        final Specification<Playback> specification = createSpecification(criteria);

        Page<Playback> playbacks = playbackRepository.findAll(specification, pageable);

        return toDTO(playbacks);
    }

    /**
     * Function to convert {@link PlaybackCriteriaDTO} to a {@link Specification}
     *
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<Playback> createSpecification(PlaybackCriteriaDTO criteria) {
        Specification<Playback> specification = Specification.where(null);

        if (criteria != null) {
            if (!isEmpty(criteria.getLatitude()) && !isEmpty(criteria.getLongitude()) && !isEmpty(criteria.getRadius())) {
                specification = specification.and(sortByRadius(criteria.getLatitude(), criteria.getLongitude(), criteria.getRadius()));
            }
            if (!isEmpty(criteria.getGenre())) {
                specification = specification.and(byGenre(criteria.getGenre()));
            }
            if (!isEmpty(criteria.getTrackId())) {
                specification = specification.and(byTrackId(criteria.getTrackId()));
            }
            if (!isEmpty(criteria.getUsername())) {
                specification = specification.and(byUsername(criteria.getUsername()));
            }
        }

        return specification;
    }

    private Specification<Playback> byUsername(String username) {
        return (root, query, builder) -> {
            final Join<Playback, User> userJoin = root.join(Playback_.user);
            final Path<String> userLoginAttribute = userJoin.get(User_.login);
            return builder.equal(userLoginAttribute, username);
        };
    }

    private Specification<Playback> byTrackId(Long trackId) {
        return (root, query, builder) -> {
            final Join<Playback, Track> trackJoin = root.join(Playback_.track, JoinType.LEFT);
            return builder.equal(trackJoin.get(Track_.id), trackId);
        };
    }

    private Specification<Playback> byGenre(String genre) {
        return (root, query, builder) -> {
            final Join<Playback, Track> trackJoin = root.join(Playback_.track, JoinType.LEFT);
            final SetJoin<Track, Genre> trackGenreJoin = trackJoin.join(Track_.genres, JoinType.LEFT);
            final Path<String> genreNameAttribute = trackGenreJoin.get(Genre_.name);

            return builder.equal(genreNameAttribute, genre);
        };
    }

    private Specification<Playback> sortByRadius(Double latitude, Double longitude, Integer radius) {

        final Double angleRadius = radius / (111 * cos(latitude));

        final Double minLatitude = latitude - angleRadius;
        final Double maxLatitude = latitude + angleRadius;
        final Double minLongitude = longitude - angleRadius;
        final Double maxLongitude = longitude + angleRadius;

        return (root, query, builder) -> builder.and(
            builder.between(root.get(Playback_.latitude), maxLatitude, minLatitude),
            builder.between(root.get(Playback_.longitude), maxLongitude, minLongitude));
    }

    private Page<PlaybackDTO> toDTO(Page<Playback> playbacks) {
        return playbacks.map(playbackMapper::toDto);
    }

}
