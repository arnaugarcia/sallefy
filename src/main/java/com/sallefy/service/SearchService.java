package com.sallefy.service;

import com.sallefy.service.dto.SearchDTO;
import org.elasticsearch.index.query.QueryStringQueryBuilder;

public interface SearchService {

    SearchDTO search(QueryStringQueryBuilder query);

}
