package com.sallefy.web.rest;

import com.sallefy.service.SearchService;
import com.sallefy.service.dto.SearchDTO;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
    
    private final SearchService searchService;

    public SearchResource(SearchService searchService) {
        this.searchService = searchService;
    }

    /**
     * {@code GET  /search} : Search in the application.
     * @param keyword the keyword to find
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
    public ResponseEntity<SearchDTO> search(@RequestParam String keyword) {
        log.debug("REST request to search in the whole application");
        SearchDTO search = searchService.search(keyword);
        return ok(search);
    }

}
