package com.sallefy.service;

public interface ElasticsearchIndexService {

    /**
     * Reindex all the documents of the datastore of elasticsearch
     */
    void reindexAll();

}
