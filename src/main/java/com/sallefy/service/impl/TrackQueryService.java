package com.sallefy.service.impl;

import com.sallefy.domain.*;
import com.sallefy.repository.TrackRepository;
import com.sallefy.service.QueryService;
import com.sallefy.service.dto.TrackDTO;
import com.sallefy.service.dto.criteria.BaseCriteria;
import com.sallefy.service.dto.criteria.TrackCriteriaDTO;
import com.sallefy.service.dto.criteria.UserTrackCriteriaDTO;
import com.sallefy.service.mapper.TrackMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.criteria.Join;
import javax.persistence.criteria.Order;
import javax.persistence.criteria.SetJoin;
import java.util.List;
import java.util.stream.Collectors;

import static javax.persistence.criteria.JoinType.INNER;
import static org.springframework.data.domain.PageRequest.of;

/**
 * Service for executing complex queries for {@link Track} entities in the database.
 * The main input is a {@link TrackCriteriaDTO} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link TrackDTO} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class TrackQueryService implements QueryService<TrackDTO, TrackCriteriaDTO> {

    private final Logger log = LoggerFactory.getLogger(TrackQueryService.class);

    private final TrackRepository trackRepository;

    private final TrackMapper trackMapper;

    public TrackQueryService(TrackRepository trackRepository, TrackMapper trackMapper) {
        this.trackRepository = trackRepository;
        this.trackMapper = trackMapper;
    }


    /**
     * Return a {@link List} of {@link com.sallefy.service.dto.TrackDTO} which matches the criteria from the database.
     *
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<TrackDTO> findByCriteria(TrackCriteriaDTO criteria) {
        log.debug("Find tracks by criteria : {}", criteria);
        final Specification<Track> specification = createSpecification(criteria);

        List<Track> tracks;

        if (isSizeSelected(criteria)) {
            tracks = trackRepository.findAll(specification, of(0, criteria.getSize())).getContent();
        } else {
            tracks = trackRepository.findAll(specification);
        }

        return transformTracks(tracks);
    }

    /**
     * Return a {@link List} of {@link com.sallefy.service.dto.TrackDTO} which matches the criteria from the database.
     *
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<TrackDTO> findByCriteria(UserTrackCriteriaDTO criteria, String login) {
        log.debug("Find tracks of {} criteria : {}", login, criteria);
        final Specification<Track> specification = createSpecification(criteria, login);

        List<Track> tracks;

        if (isSizeSelected(criteria)) {
            tracks = trackRepository.findAll(specification, of(0, criteria.getSize())).getContent();
        } else {
            tracks = trackRepository.findAll(specification);
        }

        return transformTracks(tracks);
    }

    /**
     * Function to convert {@link TrackCriteriaDTO} to a {@link Specification}
     *
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<Track> createSpecification(TrackCriteriaDTO criteria) {
        Specification<Track> specification = Specification.where(null);

        if (criteria != null) {
            if (criteria.getRecent() != null && criteria.getRecent()) {
                specification = specification.and(sortByCreated());
            }
            if (criteria.getLiked() != null && criteria.getLiked()) {
                specification = specification.and(sortByMostLiked());
            }
            if (criteria.getPlayed() != null) {
                specification = specification.and(sortByMostPlayed());
            }
            if (criteria.getGenre() != null) {

            }
        }
        return specification;
    }

    protected Specification<Track> createSpecification(UserTrackCriteriaDTO criteria, String login) {
        Specification<Track> specification = Specification.where(null);

        if (criteria != null) {
            specification = specification.and(findByUserLogin(login));
            if (criteria.getPopular() != null && criteria.getPopular()) {
                specification = specification.and(sortByMostPlayed());
            }
        }
        return specification;
    }

    private Specification<Track> findByUserLogin(String login) {
        return (root, query, builder) -> {
            final Join<Track, User> userJoin = root.join(Track_.user, INNER);
            return builder.equal(userJoin.get(User_.login), login);
        };
    }

    private Specification<Track> sortByMostPlayed() {

        return (root, query, builder) -> {
            SetJoin<Track, Playback> playbacks = root.join(Track_.playbacks, INNER);
            query.groupBy(playbacks.get(Playback_.track));

            final Order order = builder.desc(builder.count(playbacks.get(Playback_.id)));

            return query.orderBy(order).getRestriction();
        };
    }

    private Specification<Track> sortByMostLiked() {

        return (root, query, builder) -> {
            SetJoin<Track, LikeTrack> likeTrack = root.join(Track_.likeTracks, INNER);
            query.groupBy(likeTrack.get(LikeTrack_.track));

            final Order order = builder.desc(builder.count(likeTrack.get(LikeTrack_.id)));

            return query.orderBy(order).getRestriction();
        };
    }

    private Specification<Track> sortByCreated() {
        return (root, criteriaQuery, criteriaBuilder) -> {
            final Order order = criteriaBuilder.desc(root.get(Track_.createdAt));
            return criteriaQuery.orderBy(order).getRestriction();
        };
    }

    private List<TrackDTO> transformTracks(List<Track> tracks) {
        return tracks.stream()
            .map(trackMapper::toDto)
            .collect(Collectors.toList());
    }

    private boolean isSizeSelected(BaseCriteria criteria) {
        return criteria.getSize() != null;
    }
}
