package com.sallefy.repository.search;

import com.sallefy.service.dto.PlaylistDTO;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the PlaylistDTO entity.
 */
public interface PlaylistSearchRepository extends ElasticsearchRepository<PlaylistDTO, Long> {
}
