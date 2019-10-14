package com.sallefy.service;

import com.sallefy.domain.Playlist;
import com.sallefy.domain.Playlist_;
import com.sallefy.repository.PlaylistRepository;
import com.sallefy.service.dto.PlaylistDTO;
import com.sallefy.service.dto.criteria.PlaylistCriteria;
import com.sallefy.service.mapper.PlaylistMapper;
import io.github.jhipster.service.QueryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.criteria.Order;
import java.util.List;

/**
 * Service for executing complex queries for {@link Playlist} entities in the database.
 * The main input is a {@link PlaylistCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link PlaylistDTO} or a {@link Page} of {@link PlaylistDTO} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class PlaylistQueryService extends QueryService<Playlist> {

    private final Logger log = LoggerFactory.getLogger(PlaylistQueryService.class);

    private final PlaylistRepository playlistRepository;

    private final PlaylistMapper playlistMapper;

    public PlaylistQueryService(PlaylistRepository playlistRepository, PlaylistMapper playlistMapper) {
        this.playlistRepository = playlistRepository;
        this.playlistMapper = playlistMapper;
    }

    /**
     * Return a {@link List} of {@link PlaylistDTO} which matches the criteria from the database.
     *
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<PlaylistDTO> findByCriteria(PlaylistCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<Playlist> specification = createSpecification(criteria);
        return playlistMapper.toDto(playlistRepository.findAll(specification));
    }

    /**
     * Function to convert {@link PlaylistCriteria} to a {@link Specification}
     *
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<Playlist> createSpecification(PlaylistCriteria criteria) {
        Specification<Playlist> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.isRecent() != null) {
                specification = specification.and(sortByCreated());
            }
        }
        return specification;
    }

    private Specification<Playlist> sortByCreated() {
        return (root, criteriaQuery, criteriaBuilder) -> {
            final Order order = criteriaBuilder.desc(root.get(Playlist_.created));
            return criteriaQuery.orderBy(order).getRestriction();
        };
    }
}
