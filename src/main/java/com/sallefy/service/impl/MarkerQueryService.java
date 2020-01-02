package com.sallefy.service.impl;

import com.sallefy.domain.Playback;
import com.sallefy.domain.Playback_;
import com.sallefy.repository.PlaybackRepository;
import com.sallefy.service.QueryService;
import com.sallefy.service.dto.PlaybackDTO;
import com.sallefy.service.dto.criteria.PlaybackCriteriaDTO;
import com.sallefy.service.mapper.PlaybackMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

import static java.lang.Math.cos;
import static org.springframework.data.domain.PageRequest.of;
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

    private PlaybackRepository playbackRepository;
    private PlaybackMapper playbackMapper;

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
    public List<PlaybackDTO> findByCriteria(PlaybackCriteriaDTO criteria) {
        log.debug("find markers by criteria : {}", criteria);

        final Specification<Playback> specification = createSpecification(criteria);

        List<Playback> playbacks;

        if (isSizeSelected(criteria)) {
            playbacks = playbackRepository.findAll(specification, of(0, criteria.getSize())).getContent();
        } else {
            playbacks = playbackRepository.findAll(specification);
        }

        return playbackMapper.toDto(playbacks);
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
        }

        return specification;
    }

    private Specification<Playback> sortByRadius(Double latitude, Double longitude, Integer radius) {

        final Double angleRadius = radius / (111 * cos(latitude));

        final Double minLatitude = latitude - angleRadius;
        final Double maxLatitude = latitude + angleRadius;
        final Double minLongitude = longitude - angleRadius;
        final Double maxLongitude = longitude + angleRadius;

        return (root, query, builder) -> {
            query.where(
                builder.between(root.get(Playback_.latitude), maxLatitude, minLatitude),
                builder.between(root.get(Playback_.longitude), maxLongitude, minLongitude));
            return query.getGroupRestriction();
        };
    }


    private boolean isSizeSelected(PlaybackCriteriaDTO criteria) {
        return criteria.getSize() != null;
    }

}
