package com.sallefy.web.rest;

import com.sallefy.service.dto.PlaybackDTO;
import com.sallefy.service.dto.criteria.PlaybackCriteriaDTO;
import com.sallefy.service.impl.MarkerQueryService;
import io.github.jhipster.web.util.PaginationUtil;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.util.List;

/**
 * REST controller for getting all the playbacks of songs
 */
@RestController
@RequestMapping("/api")
@ApiResponses(value = {
    @ApiResponse(code = 401, message = "Credentials needed")
})
public class PlaybackResource {

    private final Logger log = LoggerFactory.getLogger(PlaybackResource.class);

    private final MarkerQueryService markerQueryService;

    public PlaybackResource(MarkerQueryService markerQueryService) {
        this.markerQueryService = markerQueryService;
    }

    /**
     * {@code GET  /playbacks} : get all the playbacks by criteria
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of playbacks in body.
     */
    @ApiOperation(
        value = "Finds playbacks by criteria",
        notes = "Finds playbacks by criteria (song, genre, user, or coordinate)"
    )
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "Successful operation")
    })
    @GetMapping("/playbacks")
    public ResponseEntity<List<PlaybackDTO>> findMarkers(@Valid PlaybackCriteriaDTO criteria, Pageable pageable) {
        log.debug("REST request to get playbacks by criteria");
        final Page<PlaybackDTO> page = markerQueryService.findByCriteria(criteria, pageable);

        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

}
