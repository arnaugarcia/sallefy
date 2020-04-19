package com.sallefy.web.rest;

import com.sallefy.service.dto.PlaybackDTO;
import com.sallefy.service.dto.criteria.PlaybackCriteriaDTO;
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
        notes = "Finds playbacks by criteria (song, genre, user, coordinates or dates). If the field 'startDate' isn't defined a default date (last month) is provided instead. The default pattern of start and end date is for example (2020-04-18T14:32:18.23). Check LocalDateTime of Java documentation for more info."
    )
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "Successful operation")
    })
    @GetMapping("/playbacks")
    public ResponseEntity<List<PlaybackDTO>> findMarkers(@Valid PlaybackCriteriaDTO criteria) {
        log.debug("REST request to get playbacks by criteria");
        return ok(markerQueryService.findByCriteria(criteria));
    }

}
