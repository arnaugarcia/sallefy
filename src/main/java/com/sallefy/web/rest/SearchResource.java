package com.sallefy.web.rest;

import com.sallefy.security.AuthoritiesConstants;
import com.sallefy.security.SecurityUtils;
import com.sallefy.service.ElasticsearchIndexService;
import com.sallefy.service.SearchService;
import com.sallefy.service.dto.SearchDTO;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.springframework.http.ResponseEntity.ok;

/**
 * REST controller for searching in the whole application
 */
@RestController
@RequestMapping("/api")
@ApiResponses(value = {
    @ApiResponse(code = 401, message = "Credentials needed")
})
public class SearchResource {

    private final Logger log = LoggerFactory.getLogger(SearchResource.class);

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SearchService searchService;

    private final ElasticsearchIndexService elasticsearchIndexService;

    public SearchResource(SearchService searchService, ElasticsearchIndexService elasticsearchIndexService) {
        this.searchService = searchService;
        this.elasticsearchIndexService = elasticsearchIndexService;
    }

    /**
     * {@code GET  /search} : Search in the application.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of the data found.
     */
    @ApiOperation(
        value = "Search globally",
        notes = "Search in the whole application. Users, Albums, Tracks and Playlists. This resource implements elastic search query it means that you can search using elastic search dsl queries. See https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-query-string-query.html for more info."
    )
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "Successful operation")
    })
    @GetMapping("/search")
    public ResponseEntity<SearchDTO> search(@RequestParam String query) {
        log.debug("REST request to search in the whole application");
        SearchDTO search = searchService.search(queryStringQuery(query));
        return ok(search);
    }

    /**
     * {@code POST  /search} : Reindex the entities for elastic search
     */
    @ApiOperation(
        value = "Reindex all Elasticsearch documents",
        notes = "This allows to delete and recreate your entity indexes in Elasticsearch, then reinsert all data into the newly created indexes from your main datastore"
    )
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "Successful operation")
    })
    @Secured(AuthoritiesConstants.ADMIN)
    @PostMapping("/search/index")
    public ResponseEntity<Void> reindexAll() {
        log.info("REST request to reindex Elasticsearch by user : {}", SecurityUtils.getCurrentUserLogin());
        elasticsearchIndexService.reindexAll();
        return ResponseEntity.accepted().build();
    }

}
