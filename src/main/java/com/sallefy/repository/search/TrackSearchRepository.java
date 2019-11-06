package com.sallefy.repository.search;

import com.sallefy.domain.Track;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Track entity.
 */
public interface TrackSearchRepository extends ElasticsearchRepository<Track, Long> {
}
