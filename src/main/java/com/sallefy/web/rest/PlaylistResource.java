package com.sallefy.web.rest;

import com.sallefy.service.FollowService;
import com.sallefy.service.PlaylistQueryService;
import com.sallefy.service.PlaylistService;
import com.sallefy.service.dto.FollowDTO;
import com.sallefy.service.dto.PlaylistDTO;
import com.sallefy.service.dto.PlaylistRequestDTO;
import com.sallefy.service.dto.criteria.PlaylistCriteria;
import com.sallefy.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.web.util.HeaderUtil;
import io.swagger.annotations.*;
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

    private final PlaylistQueryService playlistQueryService;

    private final FollowService followService;

    public PlaylistResource(PlaylistService playlistService,
                            PlaylistQueryService playlistQueryService,
                            FollowService followService) {
        this.playlistService = playlistService;
        this.playlistQueryService = playlistQueryService;
        this.followService = followService;
    }

    /**
     * {@code POST  /playlists} : Create a new playlist.
     *
     * @param playlistRequest the request of the playlist to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new playlistDTO, or with status {@code 400 (Bad Request)} if the playlist has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/playlists")
    public ResponseEntity<PlaylistDTO> createPlaylist(@Valid @RequestBody PlaylistRequestDTO playlistRequest) throws URISyntaxException {
        log.debug("REST request to save Playlist : {}", playlistRequest);
        if (playlistRequest.getId() != null) {
            throw new BadRequestAlertException("A new playlist cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PlaylistDTO result = playlistService.save(playlistRequest);
        return ResponseEntity.created(new URI("/api/playlists/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /playlists} : Updates an existing playlist.
     *
     * @param playlistRequest the request of the playlist to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated playlistDTO,
     * or with status {@code 400 (Bad Request)} if the playlistDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the playlistDTO couldn't be updated.
     */
    @PutMapping("/playlists")
    public ResponseEntity<PlaylistDTO> updatePlaylist(@Valid @RequestBody PlaylistRequestDTO playlistRequest) {
        log.debug("REST request to update Playlist : {}", playlistRequest);
        if (playlistRequest.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PlaylistDTO result = playlistService.save(playlistRequest);
        return ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, playlistRequest.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /playlists} : get all the playlists.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of playlists in body.
     */
    @ApiOperation(
        value = "Shows playlists",
        notes = "If the current user has ADMIN role, shows all the tracks of all users"
    )
    @ApiImplicitParams({
        @ApiImplicitParam(name = "recent", value = "Sort by most recent", dataType = "boolean", paramType = "query"),
        @ApiImplicitParam(name = "popular", value = "Sort by most followed", dataType = "boolean", paramType = "query"),
        @ApiImplicitParam(name = "size", value = "Limits the response elements to the desired number", dataType = "integer", paramType = "query"),
    })
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "Successful operation")
    })
    @GetMapping("/playlists")
    public ResponseEntity<List<PlaylistDTO>> getAllPlaylists(PlaylistCriteria criteria) {
        log.debug("REST request to get all Playlists");
        final List<PlaylistDTO> playlists = playlistQueryService.findByCriteria(criteria);
        return ok(playlists);
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
        PlaylistDTO playlistDTO = playlistService.findOne(id);
        return ok(playlistDTO);
    }

    /**
     * {@code GET /playlists/:id/follow} : follow the desired playlist.
     *
     * @param id the id of the playlist.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the followDTO, or with status {@code 404 (Not Found)}.
     */
    @ApiOperation(
        value = "Follows the playlist by id",
        notes = "This method is a toggle. It means that if you need to 'unfollow' make the same request and the result will be false."
    )
    @ApiResponses(value = {
        @ApiResponse(code = 201, message = "Successful operation"),
        @ApiResponse(code = 404, message = "Playlist not found")
    })
    @PutMapping("/playlists/{id}/follow")
    public ResponseEntity<FollowDTO> toggleFollowPlaylist(@PathVariable Long id) {
        log.debug("REST request to follow the playlist with id {}", id);
        FollowDTO followDTO = followService.toggleFollowPlaylist(id);
        return ok(followDTO);
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
