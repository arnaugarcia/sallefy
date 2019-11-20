package com.sallefy.service.impl;

import com.sallefy.service.ElasticsearchIndexService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class ElasticsearchIndexServiceImpl implements ElasticsearchIndexService {

    private final Logger log = LoggerFactory.getLogger(ElasticsearchIndexServiceImpl.class);

    @Override
    public void reindexAll() {

    }
}
