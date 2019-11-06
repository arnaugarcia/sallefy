package com.sallefy.repository.search;

import com.sallefy.service.dto.UserSimplifiedDTO;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the UserSimplifiedDTO entity.
 */
public interface UserSearchRepository extends ElasticsearchRepository<UserSimplifiedDTO, Long> {
}
