package com.sallefy.web.rest;

import com.sallefy.service.FollowPlaylistService;
import com.sallefy.web.rest.errors.BadRequestAlertException;
import com.sallefy.service.dto.FollowPlaylistDTO;

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
 * REST controller for managing {@link com.sallefy.domain.FollowPlaylist}.
 */
@RestController
@RequestMapping("/api")
public class FollowPlaylistResource {

    private final Logger log = LoggerFactory.getLogger(FollowPlaylistResource.class);

    private static final String ENTITY_NAME = "followPlaylist";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FollowPlaylistService followPlaylistService;

    public FollowPlaylistResource(FollowPlaylistService followPlaylistService) {
        this.followPlaylistService = followPlaylistService;
    }

    /**
     * {@code POST  /follow-playlists} : Create a new followPlaylist.
     *
     * @param followPlaylistDTO the followPlaylistDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new followPlaylistDTO, or with status {@code 400 (Bad Request)} if the followPlaylist has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/follow-playlists")
    public ResponseEntity<FollowPlaylistDTO> createFollowPlaylist(@RequestBody FollowPlaylistDTO followPlaylistDTO) throws URISyntaxException {
        log.debug("REST request to save FollowPlaylist : {}", followPlaylistDTO);
        if (followPlaylistDTO.getId() != null) {
            throw new BadRequestAlertException("A new followPlaylist cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FollowPlaylistDTO result = followPlaylistService.save(followPlaylistDTO);
        return ResponseEntity.created(new URI("/api/follow-playlists/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /follow-playlists} : Updates an existing followPlaylist.
     *
     * @param followPlaylistDTO the followPlaylistDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated followPlaylistDTO,
     * or with status {@code 400 (Bad Request)} if the followPlaylistDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the followPlaylistDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/follow-playlists")
    public ResponseEntity<FollowPlaylistDTO> updateFollowPlaylist(@RequestBody FollowPlaylistDTO followPlaylistDTO) throws URISyntaxException {
        log.debug("REST request to update FollowPlaylist : {}", followPlaylistDTO);
        if (followPlaylistDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FollowPlaylistDTO result = followPlaylistService.save(followPlaylistDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, followPlaylistDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /follow-playlists} : get all the followPlaylists.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of followPlaylists in body.
     */
    @GetMapping("/follow-playlists")
    public List<FollowPlaylistDTO> getAllFollowPlaylists() {
        log.debug("REST request to get all FollowPlaylists");
        return followPlaylistService.findAll();
    }

    /**
     * {@code GET  /follow-playlists/:id} : get the "id" followPlaylist.
     *
     * @param id the id of the followPlaylistDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the followPlaylistDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/follow-playlists/{id}")
    public ResponseEntity<FollowPlaylistDTO> getFollowPlaylist(@PathVariable Long id) {
        log.debug("REST request to get FollowPlaylist : {}", id);
        Optional<FollowPlaylistDTO> followPlaylistDTO = followPlaylistService.findOne(id);
        return ResponseUtil.wrapOrNotFound(followPlaylistDTO);
    }

    /**
     * {@code DELETE  /follow-playlists/:id} : delete the "id" followPlaylist.
     *
     * @param id the id of the followPlaylistDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/follow-playlists/{id}")
    public ResponseEntity<Void> deleteFollowPlaylist(@PathVariable Long id) {
        log.debug("REST request to delete FollowPlaylist : {}", id);
        followPlaylistService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
