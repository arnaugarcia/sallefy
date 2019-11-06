package com.sallefy.repository.search;

import com.sallefy.service.dto.TrackDTO;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the TrackDTO entity.
 */
public interface TrackSearchRepository extends ElasticsearchRepository<TrackDTO, Long> {
}
