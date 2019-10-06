package com.sallefy.service;

import com.sallefy.service.dto.FollowDTO;

/**
 * Service Interface for managing follows in Users and Playlists.
 */
public interface FollowService {

    /**
     * Method to follow or un follow a Playlist by "id"
     *
     * @param playlistId the id of the Playlist
     * @return a FollowDTO with the followed boolean
     */
    FollowDTO toggleFollowPlaylist(Long playlistId);

    /**
     * Method to delete all the followers by a Playlist "id"
     *
     * @param playlistId the id of the Playlist
     */
    void deleteFollowersByPlaylist(Long playlistId);
}
