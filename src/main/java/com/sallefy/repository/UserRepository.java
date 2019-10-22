package com.sallefy.repository;

import com.sallefy.domain.User;
import com.sallefy.service.dto.UserDTO;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import static com.sallefy.domain.queries.UserQuery.USER_DATA_QUERY_NAME;

/**
 * Spring Data JPA repository for the {@link User} entity.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    String USERS_BY_LOGIN_CACHE = "usersByLogin";

    String USERS_BY_EMAIL_CACHE = "usersByEmail";

    Optional<User> findOneByActivationKey(String activationKey);

    List<User> findAllByActivatedIsFalseAndActivationKeyIsNotNullAndCreatedDateBefore(Instant dateTime);

    Optional<User> findOneByResetKey(String resetKey);

    Optional<User> findOneByEmailIgnoreCase(String email);

    Optional<User> findOneByLogin(String login);

    @Query(nativeQuery = true, name = USER_DATA_QUERY_NAME)
    Optional<UserDTO> findOneByLogin2(String login);

    @EntityGraph(attributePaths = "authorities")
    Optional<User> findOneWithAuthoritiesById(Long id);

    @Cacheable(cacheNames = USERS_BY_LOGIN_CACHE)
    Optional<User> findOneWithAuthoritiesByLogin(String login);

    @EntityGraph(attributePaths = "authorities")
    @Cacheable(cacheNames = USERS_BY_EMAIL_CACHE)
    Optional<User> findOneWithAuthoritiesByEmailIgnoreCase(String email);

    /*select u.*,
        (select count(id) from follow_user where follow_user.user_id = u.id) as followers,
    (select count(id) from follow_user where follow_user.followed_id = u.id) as following,
    (select count(id) from playlist where playlist.user_id = u.id) as playlists,
    (select count(id) from track where track.user_id = u.id) as tracks
    from jhi_user u*/
    /*@Query("select new com.sallefy.service.dto.UserDTO(u, " +
        "(select count(fu) from FollowUser fu where fu.user.id = u.id), " +
        "(select count(fu) from FollowUser fu where fu.followed.id = u.id), " +
        "(select count(p) from Playlist p where p.user.id = u.id), " +
        "(select count(t) from Track t where t.user.id = u.id)) from User u")*/
    /*@Query(value = "select u.*, " +
        "(select count(id) from follow_user where follow_user.user_id = u.id) as followers, " +
        "(select count(id) from follow_user where follow_user.followed_id = u.id) as following, " +
        "(select count(id) from playlist where playlist.user_id = u.id) as playlists, " +
        "(select count(id) from track where track.user_id = u.id) as tracks " +
        "from jhi_user u where u.login != ?1", nativeQuery = true)*/
    Page<User> findAllByLoginNot(Pageable pageable, String login);
}
