package com.sallefy.repository.search;

import com.sallefy.domain.Playlist;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Playlist entity.
 */
public interface PlaylistSearchRepository extends ElasticsearchRepository<Playlist, Long> {
}
