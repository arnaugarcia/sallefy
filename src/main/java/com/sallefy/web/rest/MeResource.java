package com.sallefy.web.rest;

import com.sallefy.service.TrackService;
import com.sallefy.service.dto.TrackDTO;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.hibernate.cfg.NotYetImplementedException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * REST controller for managing all the library of current user
 */
@RestController
@RequestMapping("/api")
@ApiResponses(value = {
    @ApiResponse(code = 401, message = "Credentials needed")
})
public class MeResource {

    private final Logger log = LoggerFactory.getLogger(MeResource.class);

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TrackService trackService;

    public MeResource(TrackService trackService) {
        this.trackService = trackService;
    }

    /**
     * {@code GET  /me/tracks} : get all the tracks of the current user.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tracks in body.
     */
    @ApiOperation(
        value = "Shows own tracks",
        notes = "If the current user has ADMIN role, shows all the tracks of all users"
    )
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "Successful operation")
    })
    @GetMapping("/me/tracks")
    public ResponseEntity<List<TrackDTO>> getOwnTracks() {
        log.debug("REST request to get all Tracks");
        return ResponseEntity.ok(trackService.findAll());
    }

    /**
     * {@code GET  /me/albums} : get all the albums of the current user.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of albums in body.
     */
    @ApiOperation(
        value = "Shows own albums",
        notes = "If the current user has ADMIN role, shows all the albums of all users"
    )
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "Successful operation")
    })
    @GetMapping("/me/albums")
    public ResponseEntity<List<TrackDTO>> getOwnAlbums() {
        log.debug("REST request to get own albums");
        throw new NotYetImplementedException("Not yet implemented");
    }

    /**
     * {@code GET  /me/playlists} : get all the playlists of the current user.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of albums in body.
     */
    @ApiOperation(
        value = "Shows own albums",
        notes = "Returns all the albums, including the private ones. If the current user has ADMIN role, shows all the albums of all users"
    )
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "Successful operation")
    })
    @GetMapping("/me/playlists")
    public ResponseEntity<List<TrackDTO>> getOwnPlaylists() {
        log.debug("REST request to get own playlists");
        throw new NotYetImplementedException("Not yet implemented");
    }

    /**
     * {@code GET  /me/playlists/:id} : get the playlist by "id".
     *
     * @param id the id of the playlist to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the playlist, or with status {@code 404 (Not Found)}.
     */
    @ApiOperation(
        notes = "Find own track by id",
        value = "Shows the desired playlist by the requested id"
    )
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "Successful operation"),
        @ApiResponse(code = 403, message = "You're not the owner of the requested source"),
        @ApiResponse(code = 404, message = "Playlist not found"),
    })
    @GetMapping("/me/playlists/{id}")
    public ResponseEntity<TrackDTO> getPlaylist(@PathVariable Long id) {
        log.debug("REST request to get a Playlist with id: {}", id);
        throw new NotYetImplementedException("Not yet implemented");
    }

}
