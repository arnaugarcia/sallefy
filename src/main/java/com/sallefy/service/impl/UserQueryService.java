package com.sallefy.service.impl;

import com.sallefy.domain.*;
import com.sallefy.repository.TrackRepository;
import com.sallefy.repository.UserRepository;
import com.sallefy.service.QueryService;
import com.sallefy.service.dto.TrackDTO;
import com.sallefy.service.dto.UserDTO;
import com.sallefy.service.dto.criteria.TrackCriteriaDTO;
import com.sallefy.service.dto.criteria.UserCriteriaDTO;
import com.sallefy.service.mapper.TrackMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.criteria.Order;
import javax.persistence.criteria.SetJoin;
import java.util.List;
import java.util.stream.Collectors;

import static javax.persistence.criteria.JoinType.INNER;
import static org.springframework.data.domain.PageRequest.of;

/**
 * Service for executing complex queries for {@link User} entities in the database.
 * The main input is a {@link UserCriteriaDTO} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link UserDTO} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class UserQueryService implements QueryService<UserDTO, UserCriteriaDTO> {

    private final Logger log = LoggerFactory.getLogger(UserQueryService.class);

    private final UserRepository userRepository;

    public UserQueryService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Return a {@link List} of {@link TrackDTO} which matches the criteria from the database.
     *
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<UserDTO> findByCriteria(UserCriteriaDTO criteria) {
        log.debug("Find users by criteria : {}", criteria);
        final Specification<User> specification = createSpecification(criteria);

        List<Track> users;

        if (isSizeSelected(criteria)) {
            users = userRepository.findAll(specification, of(0, criteria.getSize())).getContent();
        } else {
            users = trackRepository.findAll(specification);
        }

        return transformUsers(users);
    }

    /**
     * Function to convert {@link UserCriteriaDTO} to a {@link Specification}
     *
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<User> createSpecification(UserCriteriaDTO criteria) {
        Specification<User> specification = Specification.where(null);

        if (criteria != null) {
            if (criteria.getRecent() != null && criteria.getRecent()) {
                specification = specification.and(sortByCreated());
            }
        }
        return specification;
    }

    private Specification<User> sortByCreated() {
        return (root, criteriaQuery, criteriaBuilder) -> {
            final Order order = criteriaBuilder.desc(root.get(User_.createdDate));
            return criteriaQuery.orderBy(order).getRestriction();
        };
    }

    private List<UserDTO> transformUsers(List<User> users) {
        return users.stream()
            .map(UserDTO::new)
            .collect(Collectors.toList());
    }

    private boolean isSizeSelected(UserCriteriaDTO criteria) {
        return criteria.getSize() != null;
    }
}
