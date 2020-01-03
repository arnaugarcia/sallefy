package com.sallefy.repository.search;

import com.sallefy.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data search repository for the UserSimplifiedDTO entity.
 */
public interface UserSearchRepository extends JpaRepository<User, Long> {

    @Query("select user from User user where user.activated = true and (user.firstName like %:keyword% or user.lastName like %:keyword%)")
    List<User> search(@Param("keyword") String keyword);

}
