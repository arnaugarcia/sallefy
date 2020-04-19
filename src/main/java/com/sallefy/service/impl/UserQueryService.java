package com.sallefy.service.impl;

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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.criteria.Order;
import javax.persistence.criteria.SetJoin;
import java.util.List;
import java.util.function.Predicate;

import static com.sallefy.config.Constants.ANONYMOUS_USER;
import static com.sallefy.config.Constants.SYSTEM_ACCOUNT;
import static java.util.stream.Collectors.toList;
import static javax.persistence.criteria.JoinType.INNER;
import static javax.persistence.criteria.JoinType.LEFT;

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
    public Page<UserDTO> findByCriteria(UserCriteriaDTO criteria, Pageable pageable) {
        log.debug("Find users by criteria : {}", criteria);
        final Specification<User> specification = createSpecification(criteria);

        Page<User> users = userRepository.findAll(specification, pageable);

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
                specification = specification.and(notFollowedBy(user));
            }
        }
        return specification;
    }

    private Specification<User> notFollowedBy(User currentUser) {

        return (root, query, builder) -> {
            SetJoin<User, FollowUser> followers = root.join(User_.followers, LEFT);
            followers.on(followers.get(FollowUser_.user).in(currentUser));

            return query.where(
                followers.get(FollowUser_.user).isNull(),
                root.get(User_.id).in(currentUser.getId()).not()
            ).getRestriction();
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

    private Page<UserDTO> transformAndFilterUsers(Page<User> users) {
        return new PageImpl<>(users
            .filter(notAnonymousUser())
            .filter(notSystem())
            .stream()
            .map(UserDTO::new)
            .collect(toList()));
    }

    private Predicate<User> notSystem() {
        return not(SYSTEM_ACCOUNT);
    }

    private Predicate<User> notAnonymousUser() {
        return not(ANONYMOUS_USER);
    }

    private Predicate<User> not(String login) {
        return user -> !user.getLogin().equalsIgnoreCase(login);
    }

}
