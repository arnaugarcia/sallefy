package com.sallefy.web.rest;

import com.sallefy.service.dto.MarkerDTO;
import com.sallefy.service.dto.criteria.MarkerCriteriaDTO;
import com.sallefy.service.impl.MarkerQueryService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

import static org.springframework.http.ResponseEntity.ok;

/**
 * REST controller for getting all the markers or playbacks of a song
 */
@RestController
@RequestMapping("/api")
@ApiResponses(value = {
    @ApiResponse(code = 401, message = "Credentials needed")
})
public class MarkersResource {

    private final Logger log = LoggerFactory.getLogger(MarkersResource.class);

    private final MarkerQueryService markerQueryService;

    public MarkersResource(MarkerQueryService markerQueryService) {
        this.markerQueryService = markerQueryService;
    }

    /**
     * {@code GET  /me/markers} : get all the markers
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of markers in body.
     */
    @ApiOperation(
        value = "Finds all markers playbacks",
        notes = "Finds all the markers of a song"
    )
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "Successful operation")
    })
    @GetMapping("/markers")
    public ResponseEntity<List<MarkerDTO>> findMarkers(@Valid MarkerCriteriaDTO criteria) {
        log.debug("REST request to get all Tracks");
        return ok(markerQueryService.findByCriteria(criteria));
    }

}
