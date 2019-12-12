package com.sallefy.repository.search;

import com.sallefy.domain.Playlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Spring Data repository for searching the Playlist entity.
 */
public interface PlaylistSearchRepository extends JpaRepository<Playlist, Long> {

    @Query("select playlist from Playlist playlist where playlist.name like %:keyword% or playlist.description like %:keyword%")
    List<Playlist> search(String keyword);
}
