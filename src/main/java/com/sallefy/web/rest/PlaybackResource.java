package com.sallefy.web.rest;

import com.sallefy.service.PlaybackService;
import com.sallefy.web.rest.errors.BadRequestAlertException;
import com.sallefy.service.dto.PlaybackDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.sallefy.domain.Playback}.
 */
@RestController
@RequestMapping("/api")
public class PlaybackResource {

    private final Logger log = LoggerFactory.getLogger(PlaybackResource.class);

    private static final String ENTITY_NAME = "playback";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PlaybackService playbackService;

    public PlaybackResource(PlaybackService playbackService) {
        this.playbackService = playbackService;
    }

    /**
     * {@code POST  /playbacks} : Create a new playback.
     *
     * @param playbackDTO the playbackDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new playbackDTO, or with status {@code 400 (Bad Request)} if the playback has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/playbacks")
    public ResponseEntity<PlaybackDTO> createPlayback(@Valid @RequestBody PlaybackDTO playbackDTO) throws URISyntaxException {
        log.debug("REST request to save Playback : {}", playbackDTO);
        if (playbackDTO.getId() != null) {
            throw new BadRequestAlertException("A new playback cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PlaybackDTO result = playbackService.save(playbackDTO);
        return ResponseEntity.created(new URI("/api/playbacks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /playbacks} : Updates an existing playback.
     *
     * @param playbackDTO the playbackDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated playbackDTO,
     * or with status {@code 400 (Bad Request)} if the playbackDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the playbackDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/playbacks")
    public ResponseEntity<PlaybackDTO> updatePlayback(@Valid @RequestBody PlaybackDTO playbackDTO) throws URISyntaxException {
        log.debug("REST request to update Playback : {}", playbackDTO);
        if (playbackDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PlaybackDTO result = playbackService.save(playbackDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, playbackDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /playbacks} : get all the playbacks.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of playbacks in body.
     */
    @GetMapping("/playbacks")
    public List<PlaybackDTO> getAllPlaybacks() {
        log.debug("REST request to get all Playbacks");
        return playbackService.findAll();
    }

    /**
     * {@code GET  /playbacks/:id} : get the "id" playback.
     *
     * @param id the id of the playbackDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the playbackDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/playbacks/{id}")
    public ResponseEntity<PlaybackDTO> getPlayback(@PathVariable Long id) {
        log.debug("REST request to get Playback : {}", id);
        Optional<PlaybackDTO> playbackDTO = playbackService.findOne(id);
        return ResponseUtil.wrapOrNotFound(playbackDTO);
    }

    /**
     * {@code DELETE  /playbacks/:id} : delete the "id" playback.
     *
     * @param id the id of the playbackDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/playbacks/{id}")
    public ResponseEntity<Void> deletePlayback(@PathVariable Long id) {
        log.debug("REST request to delete Playback : {}", id);
        playbackService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
