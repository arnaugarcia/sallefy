package com.sallefy.repository;

import com.sallefy.domain.User;
import com.sallefy.service.dto.AccountDTO;
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
public interface AccountRepository extends JpaRepository<User, Long> {

    @Query(nativeQuery = true, name = USER_DATA_QUERY_NAME)
    Optional<AccountDTO> findOneByLogin(String login);

}
