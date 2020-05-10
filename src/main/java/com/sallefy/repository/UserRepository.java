package com.sallefy.repository;

import com.sallefy.domain.User;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import static com.sallefy.domain.User_.AUTHORITIES;
import static com.sallefy.domain.graphs.UserGraph.GRAPH_USER_ENTITY_ALL;

/**
 * Spring Data JPA repository for the {@link User} entity.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {

    String USERS_BY_LOGIN_CACHE = "usersByLogin";

    String USERS_BY_EMAIL_CACHE = "usersByEmail";

    Optional<User> findOneByActivationKey(String activationKey);

    List<User> findAllByActivatedIsFalseAndActivationKeyIsNotNullAndCreatedDateBefore(Instant dateTime);

    Optional<User> findOneByResetKey(String resetKey);

    Optional<User> findOneByEmailIgnoreCase(String email);

    Optional<User> findOneByLogin(String login);

    @EntityGraph(attributePaths = AUTHORITIES)
    Optional<User> findOneWithAuthoritiesById(Long id);

    @Cacheable(cacheNames = USERS_BY_LOGIN_CACHE)
    @EntityGraph(GRAPH_USER_ENTITY_ALL)
    Optional<User> findOneWithAuthoritiesByLogin(String login);

    @EntityGraph(attributePaths = AUTHORITIES)
    @Cacheable(cacheNames = USERS_BY_EMAIL_CACHE)
    Optional<User> findOneWithAuthoritiesByEmailIgnoreCase(String email);

    @Override
    @Cacheable(cacheNames = USERS_BY_EMAIL_CACHE)
    List<User> findAll(Specification<User> specification);

    @Override
    @Cacheable(cacheNames = USERS_BY_EMAIL_CACHE)
    Page<User> findAll(Specification<User> specification, Pageable pageable);

    List<User> findAllByLoginNot(String login);
}
