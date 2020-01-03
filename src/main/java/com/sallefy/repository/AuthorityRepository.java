package com.sallefy.repository;

import com.sallefy.domain.Authority;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Set;

/**
 * Spring Data JPA repository for the {@link Authority} entity.
 */
public interface AuthorityRepository extends JpaRepository<Authority, String> {

    @Query("select user.authorities from User user where user.login = ?#{principal.username}")
    Set<Authority> findByUserIsCurrentUser();

    @Query("select user.authorities from User user where user.login = :login")
    Set<Authority> findByUserLogin(@Param("login") String login);
}
