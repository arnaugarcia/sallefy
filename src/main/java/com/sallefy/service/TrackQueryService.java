package com.sallefy.service;

import com.sallefy.domain.Track;
import com.sallefy.domain.Track_;
import com.sallefy.repository.TrackRepository;
import com.sallefy.service.dto.TrackDTO;
import com.sallefy.service.dto.criteria.TrackCriteria;
import com.sallefy.service.mapper.TrackMapper;
import io.github.jhipster.service.QueryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.criteria.Order;
import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.data.domain.PageRequest.of;

/**
 * Service for executing complex queries for {@link Track} entities in the database.
 * The main input is a {@link TrackCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link TrackDTO} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class TrackQueryService extends QueryService<Track> {

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
    public List<TrackDTO> findByCriteria(TrackCriteria criteria) {
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
     * Function to convert {@link TrackCriteria} to a {@link Specification}
     *
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<Track> createSpecification(TrackCriteria criteria) {
        Specification<Track> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getRecent() != null) {
                specification = specification.and(sortByCreated());
            }
            if (criteria.getLiked() != null) {
                //specification = specification.and(sortByMostFollowed());
            }
        }
        return specification;
    }

    private Specification<Track> sortByMostFollowed() {

        return (root, query, builder) -> {
            /*SetJoin<Track, LikeTrack> likeTrack = root.join(Playlist_.followers, INNER);
            query.groupBy(followPlaylist.get(FollowPlaylist_.playlist));

            final Order order = builder.desc(builder.count(followPlaylist.get(FollowPlaylist_.id)));*/

            return null;
            // return query.orderBy(order).getRestriction();
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

    private boolean isSizeSelected(TrackCriteria criteria) {
        return criteria.getSize() != null;
    }
}
