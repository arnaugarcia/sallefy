package com.sallefy.service.impl;

import com.sallefy.config.Constants;
import com.sallefy.domain.FollowUser;
import com.sallefy.domain.FollowUser_;
import com.sallefy.domain.User;
import com.sallefy.domain.User_;
import com.sallefy.repository.UserRepository;
import com.sallefy.service.QueryService;
import com.sallefy.service.UserService;
import com.sallefy.service.dto.TrackDTO;
import com.sallefy.service.dto.UserDTO;
import com.sallefy.service.dto.criteria.UserCriteriaDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.criteria.Order;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.SetJoin;
import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Collectors;

import static javax.persistence.criteria.JoinType.INNER;
import static javax.persistence.criteria.JoinType.LEFT;
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
    private final UserService userService;

    public UserQueryService(UserRepository userRepository, UserService userService) {
        this.userRepository = userRepository;
        this.userService = userService;
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

        List<User> users;

        if (isSizeSelected(criteria)) {
            users = userRepository.findAll(specification, of(0, criteria.getSize())).getContent();
        } else {
            users = userRepository.findAll(specification);
        }

        return transformAndFilterUsers(users);
    }

    /**
     * Function to convert {@link UserCriteriaDTO} to a {@link Specification}
     *
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<User> createSpecification(UserCriteriaDTO criteria) {
        Specification<User> specification = Specification.where(null);

        final User user = userService.getUserWithAuthorities();

        if (criteria != null) {
            if (isSelectedAndTrue(criteria.getRecent())) {
                specification = specification.and(sortByCreated());
            }
            if (criteria.getPopular() != null) {
                specification = specification.and(sortByMostFollowed());
            }
            if (isSelectedAndTrue(criteria.getNotFollowing())) {
                specification = specification.and(notFollowedBy(user.getId()));
            }
        }
        return specification;
    }

    private Specification<User> notFollowedBy(Long id) {

        /*SELECT u.*
        FROM jhi_user AS u
        LEFT JOIN follow_user AS f ON f.followed_id = u.id
        AND f.user_id = 3
        WHERE f.user_id IS NULL AND u.id  != 3*/

        return (root, query, builder) -> {
            SetJoin<User, FollowUser> followers = root.join(User_.followers, LEFT);
            final Path<User> user = followers.get(FollowUser_.user);

            return query.where(user.get(User_.id).isNotNull()).getRestriction();
        };
    }

    private boolean isSelectedAndTrue(Boolean notFollowing) {
        return notFollowing != null && notFollowing;
    }

    private Specification<User> sortByMostFollowed() {
        return (root, query, builder) -> {
            SetJoin<User, FollowUser> followers = root.join(User_.followers, INNER);
            query.groupBy(followers.get(FollowUser_.id));

            final Order order = builder.desc(builder.count(followers.get(FollowUser_.id)));

            return query.orderBy(order).getRestriction();
        };
    }

    private Specification<User> sortByCreated() {
        return (root, criteriaQuery, criteriaBuilder) -> {
            final Order order = criteriaBuilder.desc(root.get(User_.createdDate));
            return criteriaQuery.orderBy(order).getRestriction();
        };
    }

    private List<UserDTO> transformAndFilterUsers(List<User> users) {
        return users.stream()
            .map(UserDTO::new)
            .filter(notAnonymousUser())
            .collect(Collectors.toList());
    }

    private Predicate<UserDTO> notAnonymousUser() {
        return userDTO -> !userDTO.getLogin().equalsIgnoreCase(Constants.ANONYMOUS_USER);
    }

    private boolean isSizeSelected(UserCriteriaDTO criteria) {
        return criteria.getSize() != null;
    }
}
