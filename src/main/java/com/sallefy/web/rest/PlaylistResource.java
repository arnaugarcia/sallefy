package com.sallefy.web.rest;

import com.sallefy.service.PlaylistService;
import com.sallefy.web.rest.errors.BadRequestAlertException;
import com.sallefy.service.dto.PlaylistDTO;

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
 * REST controller for managing {@link com.sallefy.domain.Playlist}.
 */
@RestController
@RequestMapping("/api")
public class PlaylistResource {

    private final Logger log = LoggerFactory.getLogger(PlaylistResource.class);

    private static final String ENTITY_NAME = "playlist";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PlaylistService playlistService;

    public PlaylistResource(PlaylistService playlistService) {
        this.playlistService = playlistService;
    }

    /**
     * {@code POST  /playlists} : Create a new playlist.
     *
     * @param playlistDTO the playlistDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new playlistDTO, or with status {@code 400 (Bad Request)} if the playlist has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/playlists")
    public ResponseEntity<PlaylistDTO> createPlaylist(@Valid @RequestBody PlaylistDTO playlistDTO) throws URISyntaxException {
        log.debug("REST request to save Playlist : {}", playlistDTO);
        if (playlistDTO.getId() != null) {
            throw new BadRequestAlertException("A new playlist cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PlaylistDTO result = playlistService.save(playlistDTO);
        return ResponseEntity.created(new URI("/api/playlists/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /playlists} : Updates an existing playlist.
     *
     * @param playlistDTO the playlistDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated playlistDTO,
     * or with status {@code 400 (Bad Request)} if the playlistDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the playlistDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/playlists")
    public ResponseEntity<PlaylistDTO> updatePlaylist(@Valid @RequestBody PlaylistDTO playlistDTO) {
        log.debug("REST request to update Playlist : {}", playlistDTO);
        if (playlistDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PlaylistDTO result = playlistService.save(playlistDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, playlistDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /playlists} : get all the playlists.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of playlists in body.
     */
    @GetMapping("/playlists")
    public List<PlaylistDTO> getAllPlaylists(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Playlists");
        return playlistService.findAll();
    }

    /**
     * {@code GET  /playlists/:id} : get the "id" playlist.
     *
     * @param id the id of the playlistDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the playlistDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/playlists/{id}")
    public ResponseEntity<PlaylistDTO> getPlaylist(@PathVariable Long id) {
        log.debug("REST request to get Playlist : {}", id);
        Optional<PlaylistDTO> playlistDTO = playlistService.findOne(id);
        return ResponseUtil.wrapOrNotFound(playlistDTO);
    }

    /**
     * {@code DELETE  /playlists/:id} : delete the "id" playlist.
     *
     * @param id the id of the playlistDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/playlists/{id}")
    public ResponseEntity<Void> deletePlaylist(@PathVariable Long id) {
        log.debug("REST request to delete Playlist : {}", id);
        playlistService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
