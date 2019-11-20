package com.sallefy.service;

import com.sallefy.service.dto.SearchDTO;
import org.elasticsearch.index.query.QueryStringQueryBuilder;

public interface SearchService {

    /**
     * Search in the datastore of Elasticsearch by QueryString
     *
     * @param query the string to find
     * @return a searchDTO object containing all the data
     */
    SearchDTO search(QueryStringQueryBuilder query);

}
