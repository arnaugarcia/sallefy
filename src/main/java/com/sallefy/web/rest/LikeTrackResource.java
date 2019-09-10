package com.sallefy.web.rest;

import com.sallefy.service.LikeTrackService;
import com.sallefy.web.rest.errors.BadRequestAlertException;
import com.sallefy.service.dto.LikeTrackDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.sallefy.domain.LikeTrack}.
 */
@RestController
@RequestMapping("/api")
public class LikeTrackResource {

    private final Logger log = LoggerFactory.getLogger(LikeTrackResource.class);

    private static final String ENTITY_NAME = "likeTrack";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LikeTrackService likeTrackService;

    public LikeTrackResource(LikeTrackService likeTrackService) {
        this.likeTrackService = likeTrackService;
    }

    /**
     * {@code POST  /like-tracks} : Create a new likeTrack.
     *
     * @param likeTrackDTO the likeTrackDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new likeTrackDTO, or with status {@code 400 (Bad Request)} if the likeTrack has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/like-tracks")
    public ResponseEntity<LikeTrackDTO> createLikeTrack(@RequestBody LikeTrackDTO likeTrackDTO) throws URISyntaxException {
        log.debug("REST request to save LikeTrack : {}", likeTrackDTO);
        if (likeTrackDTO.getId() != null) {
            throw new BadRequestAlertException("A new likeTrack cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LikeTrackDTO result = likeTrackService.save(likeTrackDTO);
        return ResponseEntity.created(new URI("/api/like-tracks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /like-tracks} : Updates an existing likeTrack.
     *
     * @param likeTrackDTO the likeTrackDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated likeTrackDTO,
     * or with status {@code 400 (Bad Request)} if the likeTrackDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the likeTrackDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/like-tracks")
    public ResponseEntity<LikeTrackDTO> updateLikeTrack(@RequestBody LikeTrackDTO likeTrackDTO) throws URISyntaxException {
        log.debug("REST request to update LikeTrack : {}", likeTrackDTO);
        if (likeTrackDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        LikeTrackDTO result = likeTrackService.save(likeTrackDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, likeTrackDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /like-tracks} : get all the likeTracks.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of likeTracks in body.
     */
    @GetMapping("/like-tracks")
    public List<LikeTrackDTO> getAllLikeTracks() {
        log.debug("REST request to get all LikeTracks");
        return likeTrackService.findAll();
    }

    /**
     * {@code GET  /like-tracks/:id} : get the "id" likeTrack.
     *
     * @param id the id of the likeTrackDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the likeTrackDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/like-tracks/{id}")
    public ResponseEntity<LikeTrackDTO> getLikeTrack(@PathVariable Long id) {
        log.debug("REST request to get LikeTrack : {}", id);
        Optional<LikeTrackDTO> likeTrackDTO = likeTrackService.findOne(id);
        return ResponseUtil.wrapOrNotFound(likeTrackDTO);
    }

    /**
     * {@code DELETE  /like-tracks/:id} : delete the "id" likeTrack.
     *
     * @param id the id of the likeTrackDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/like-tracks/{id}")
    public ResponseEntity<Void> deleteLikeTrack(@PathVariable Long id) {
        log.debug("REST request to delete LikeTrack : {}", id);
        likeTrackService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
