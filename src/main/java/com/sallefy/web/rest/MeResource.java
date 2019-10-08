package com.sallefy.web.rest;

import com.sallefy.service.FollowService;
import com.sallefy.service.PlaylistService;
import com.sallefy.service.TrackService;
import com.sallefy.service.dto.AlbumDTO;
import com.sallefy.service.dto.PlaylistDTO;
import com.sallefy.service.dto.TrackDTO;
import com.sallefy.service.dto.UserDTO;
import com.sallefy.web.rest.errors.NotYetImplementedException;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.http.ResponseEntity.ok;

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

    private final FollowService followService;

    private final PlaylistService playlistService;

    public MeResource(TrackService trackService,
                      FollowService followService,
                      PlaylistService playlistService) {
        this.trackService = trackService;
        this.followService = followService;
        this.playlistService = playlistService;
    }

    /**
     * {@code GET  /me/tracks} : get all the tracks of the current user.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tracks in body.
     */
    @ApiOperation(
        value = "Shows own tracks",
        notes = "Shows all the tracks of the current user"
    )
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "Successful operation")
    })
    @GetMapping("/me/tracks")
    public ResponseEntity<List<TrackDTO>> getOwnTracks() {
        log.debug("REST request to get all Tracks");
        return ok(trackService.findAllByCurrentUser());
    }

    /**
     * {@code GET  /me/tracks/:id} : get the track by "id".
     *
     * @param id the id of the track to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the track, or with status {@code 404 (Not Found)}.
     */
    @ApiOperation(
        notes = "Find own track by id",
        value = "Shows the desired track by the requested id"
    )
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "Successful operation"),
        @ApiResponse(code = 403, message = "You're not the owner of the requested source"),
        @ApiResponse(code = 404, message = "Track not found"),
    })
    @GetMapping("/me/tracks/{id}")
    public ResponseEntity<TrackDTO> getOwnTrackById(@PathVariable Long id) {
        log.debug("REST request to get a Track with id: {}", id);
        TrackDTO trackDTO = trackService.findOwnTrackById(id);
        return ok(trackDTO);
    }

    /**
     * {@code GET  /me/tracks/liked} : get the liked tracks.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of the liked track in the body.
     */
    @ApiOperation(
        notes = "Find liked tracks",
        value = "Shows al the liked tracks by the current user"
    )
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "Successful operation")
    })
    @GetMapping("/me/tracks/liked")
    public ResponseEntity<List<TrackDTO>> getLikedTracks() {
        log.debug("REST request to get the list of liked Tracks");
        final List<TrackDTO> likedTracks = trackService.findAllCurrentUserLiked();
        return ok(likedTracks);
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
        throw new NotYetImplementedException();
    }

    /**
     * {@code GET  /me/albums/:id} : get the album by "id".
     *
     * @param id the id of the album to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the album, or with status {@code 404 (Not Found)}.
     */
    @ApiOperation(
        notes = "Find own album by id",
        value = "Shows the desired album by the requested id"
    )
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "Successful operation"),
        @ApiResponse(code = 403, message = "You're not the owner of the requested source"),
        @ApiResponse(code = 404, message = "Playlist not found"),
    })
    @GetMapping("/me/albums/{id}")
    public ResponseEntity<TrackDTO> getOwnAlbumById(@PathVariable Long id) {
        log.debug("REST request to get a Album with id: {}", id);
        throw new NotYetImplementedException();
    }

    /**
     * {@code GET  /me/albums/liked} : get the liked albums.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of the liked albums in the body.
     */
    @ApiOperation(
        notes = "Find liked albums",
        value = "Shows al the liked albums by the current user"
    )
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "Successful operation")
    })
    @GetMapping("/me/albums/liked")
    public ResponseEntity<List<AlbumDTO>> getLikedAlbums() {
        log.debug("REST request to get the list of liked Albums");
        throw new NotYetImplementedException();
    }

    /**
     * {@code GET  /me/playlists} : get all the playlists of the current user.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of playlists in body.
     */
    @ApiOperation(
        value = "Shows own playlists",
        notes = "Returns all the playlists, including the private ones. If the current user has ADMIN role, shows all the albums of all users"
    )
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "Successful operation")
    })
    @GetMapping("/me/playlists")
    public ResponseEntity<List<PlaylistDTO>> getOwnPlaylists() {
        log.debug("REST request to get own playlists");
        List<PlaylistDTO> playlists = playlistService.findAllByCurrentUser();
        return ok(playlists);
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
    public ResponseEntity<TrackDTO> getOwnPlaylist(@PathVariable Long id) {
        log.debug("REST request to get a Playlist with id: {}", id);
        throw new NotYetImplementedException();
    }

    /**
     * {@code GET  /me/playlists/following} : get the following playlists.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of the following playlists in the body.
     */
    @ApiOperation(
        notes = "Find following playlists",
        value = "Shows all the following playlists by the current user"
    )
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "Successful operation")
    })
    @GetMapping("/me/playlists/following")
    public ResponseEntity<List<PlaylistDTO>> getFollowingPlaylists() {
        log.debug("REST request to get the list of following Playlists by current user");
        List<PlaylistDTO> followingPlaylists = followService.findFollowingPlaylistsByCurrentUser();
        return ok(followingPlaylists);

    }

    /**
     * {@code GET  /me/following} : get the following users.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of the following users in the body.
     */
    @ApiOperation(
        notes = "Find following users",
        value = "Shows all the following users by the current user"
    )
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "Successful operation")
    })
    @GetMapping("/me/followings")
    public ResponseEntity<List<UserDTO>> getFollowingUsers() {
        log.debug("REST request to get the list of following Users");
        List<UserDTO> following = followService.findFollowingUsersByCurrentUser();
        return ok(following);
    }

    /**
     * {@code GET  /me/followers} : get the current user followers.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of the current user followers in the body.
     */
    @ApiOperation(
        notes = "Find followers of the current user",
        value = "Shows all the current user followers"
    )
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "Successful operation")
    })
    @GetMapping("/me/followers")
    public ResponseEntity<List<UserDTO>> getFollowersOfTheUser() {
        log.debug("REST request to get the list of the current user followers");
        List<UserDTO> followers = followService.findFollowersOfCurrentUser();
        return ok(followers);
    }

}
