package com.sallefy.web.rest;

import com.sallefy.service.LikeService;
import com.sallefy.service.PlayService;
import com.sallefy.service.TrackQueryService;
import com.sallefy.service.TrackService;
import com.sallefy.service.dto.LikeDTO;
import com.sallefy.service.dto.TrackDTO;
import com.sallefy.service.dto.criteria.TrackCriteria;
import com.sallefy.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.web.util.HeaderUtil;
import io.swagger.annotations.*;
import org.mapstruct.Context;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

import static org.springframework.http.ResponseEntity.ok;

/**
 * REST controller for managing {@link com.sallefy.domain.Track}.
 */
@RestController
@RequestMapping("/api")
@ApiResponses(value = {
    @ApiResponse(code = 401, message = "Credentials needed")
})
public class TrackResource {

    private final Logger log = LoggerFactory.getLogger(TrackResource.class);

    private static final String ENTITY_NAME = "track";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TrackService trackService;

    private final TrackQueryService trackQueryService;

    private final LikeService likeService;

    private final PlayService playService;

    public TrackResource(TrackService trackService,
                         TrackQueryService trackQueryService,
                         LikeService likeService,
                         PlayService playService) {
        this.trackService = trackService;
        this.trackQueryService = trackQueryService;
        this.likeService = likeService;
        this.playService = playService;
    }

    /**
     * {@code POST  /tracks} : Create a new track.
     *
     * @param trackDTO the trackDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new trackDTO, or with status {@code 400 (Bad Request)} if the track has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @ApiOperation(
        value = "Creates a track",
        notes = "The track cannot have already an id. If the genre id doesn't exists won't be considered."
    )
    @ApiResponses(value = {
        @ApiResponse(code = 201, message = "A track has been created")
    })
    @PostMapping("/tracks")
    public ResponseEntity<TrackDTO> createTrack(@Valid @RequestBody TrackDTO trackDTO) throws URISyntaxException {
        log.debug("REST request to save Track : {}", trackDTO);
        if (trackDTO.getId() != null) {
            throw new BadRequestAlertException("A new track cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TrackDTO result = trackService.save(trackDTO);
        return ResponseEntity.created(new URI("/api/tracks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tracks} : Updates an existing track.
     *
     * @param trackDTO the trackDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated trackDTO,
     * or with status {@code 400 (Bad Request)} if the trackDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the trackDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @ApiOperation(
        value = "Updates a track",
        notes = "The id must be valid and the user must be owner of the entity. If the genre id doesn't exists won't be considered."
    )
    @ApiResponses(value = {
        @ApiResponse(code = 201, message = "The track has been updated successfully"),
        @ApiResponse(code = 404, message = "No track has been found with the required id"),
    })
    @PutMapping("/tracks")
    public ResponseEntity<TrackDTO> updateTrack(@Valid @RequestBody TrackDTO trackDTO) throws URISyntaxException {
        log.debug("REST request to update Track : {}", trackDTO);
        if (trackDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TrackDTO result = trackService.save(trackDTO);
        return ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, trackDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tracks} : get all the tracks.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tracks in body.
     */
    @ApiOperation(
        value = "Shows own tracks",
        notes = "If the current user has ADMIN role, shows all the tracks of all users"
    )
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "Successful operation"),
    })
    @GetMapping("/tracks")
    public ResponseEntity<List<TrackDTO>> getAllTracks(TrackCriteria trackCriteria) {
        log.debug("REST request to get all Tracks");
        return ResponseEntity.ok(trackQueryService.findByCriteria(trackCriteria));
    }

    /**
     * {@code GET  /tracks/:id} : get the "id" track.
     *
     * @param id the id of the trackDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the trackDTO, or with status {@code 404 (Not Found)}.
     */
    @ApiOperation(
        value = "Shows the desired track by id param"
    )
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "Successful operation"),
        @ApiResponse(code = 404, message = "Track not found"),
    })
    @GetMapping("/tracks/{id}")
    public ResponseEntity<TrackDTO> getTrack(@PathVariable Long id) {
        log.debug("REST request to get Track : {}", id);
        TrackDTO trackDTO = trackService.findOne(id);
        return ok(trackDTO);
    }

    /**
     * {@code PUT  /tracks/:id/like} : like a track by "id".
     *
     * @param id the id of the trackDTO to like.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the likeDTO, or with status {@code 404 (Not Found)}.
     */
    @ApiOperation(
        value = "Likes the track by id",
        notes = "This method is a toggle. It means that if you need to 'dislike' make the same request and the result will be false."
    )
    @ApiResponses(value = {
        @ApiResponse(code = 201, message = "Successful operation"),
        @ApiResponse(code = 404, message = "Track not found")
    })
    @PutMapping("/tracks/{id}/like")
    public ResponseEntity<LikeDTO> toggleLikeTrack(@PathVariable Long id) {
        log.debug("REST request to like a Track : {}", id);
        LikeDTO likeDTO = likeService.toggleLikeTrack(id);
        return ok(likeDTO);
    }

    /**
     * {@code PUT  /tracks/:id/play} : play a track.
     *
     * @param id the id of the trackDTO to play.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the likeDTO, or with status {@code 404 (Not Found)}.
     */
    @ApiOperation(
        value = "Plays the track by id",
        notes = "This method stores "
    )
    @ApiResponses(value = {
        @ApiResponse(code = 201, message = "Successful operation"),
        @ApiResponse(code = 404, message = "Track not found")
    })
    @PutMapping("/tracks/{id}/play")
    public ResponseEntity<Void> playTrack(@Context HttpServletRequest requestContext, @PathVariable Long id) throws URISyntaxException {
        log.debug("REST request to like a Track : {}", id);
        playService.playTrack(requestContext, id);
        return ResponseEntity.created(new URI("/api/tracks/" + id + "/play"))
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }

    /**
     * {@code DELETE  /tracks/:id} : delete the "id" track.
     *
     * @param id the id of the trackDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @ApiOperation(
        value = "Deletes a track by id",
        notes = "Only a user with ADMIN role can delete a track that isn't the owner"
    )
    @ApiResponses(value = {
        @ApiResponse(code = 204, message = "Track successfully deleted"),
        @ApiResponse(code = 403, message = "You're not the owner of the track"),
        @ApiResponse(code = 404, message = "Track not found")
    })
    @DeleteMapping("/tracks/{id}")
    public ResponseEntity<Void> deleteTrack(@PathVariable Long id) {
        log.debug("REST request to delete Track : {}", id);
        trackService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }

}
