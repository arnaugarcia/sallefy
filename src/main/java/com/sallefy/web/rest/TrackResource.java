package com.sallefy.web.rest;

import com.sallefy.service.LikeService;
import com.sallefy.service.TrackService;
import com.sallefy.service.dto.LikeDTO;
import com.sallefy.service.dto.TrackDTO;
import com.sallefy.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.web.util.HeaderUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
public class TrackResource {

    private final Logger log = LoggerFactory.getLogger(TrackResource.class);

    private static final String ENTITY_NAME = "track";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TrackService trackService;

    private final LikeService likeService;

    public TrackResource(TrackService trackService, LikeService likeService) {
        this.trackService = trackService;
        this.likeService = likeService;
    }

    /**
     * {@code POST  /tracks} : Create a new track.
     *
     * @param trackDTO the trackDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new trackDTO, or with status {@code 400 (Bad Request)} if the track has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
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
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tracks in body.
     */
    @GetMapping("/tracks")
    public List<TrackDTO> getAllTracks(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Tracks");
        return trackService.findAll();
    }

    /**
     * {@code GET  /tracks/:id} : get the "id" track.
     *
     * @param id the id of the trackDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the trackDTO, or with status {@code 404 (Not Found)}.
     */
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
    @PutMapping("/tracks/{id}/like")
    public ResponseEntity<LikeDTO> toggleLikeTrack(@PathVariable Long id) {
        log.debug("REST request to like a Track : {}", id);
        LikeDTO likeDTO = likeService.toggleLikeTrack(id);
        return ok(likeDTO);
    }

    /**
     * {@code DELETE  /tracks/:id} : delete the "id" track.
     *
     * @param id the id of the trackDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tracks/{id}")
    public ResponseEntity<Void> deleteTrack(@PathVariable Long id) {
        log.debug("REST request to delete Track : {}", id);
        trackService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
