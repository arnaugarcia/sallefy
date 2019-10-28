package com.sallefy.service;

import com.sallefy.service.dto.FollowDTO;
import com.sallefy.service.dto.PlaylistDTO;
import com.sallefy.service.dto.UserSimplifyedDTO;

import java.util.List;

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
     * Method to follow or un follow a User by "login"
     *
     * @param login the "login" of the User
     * @return a FollowDTO with the followed boolean
     */
    FollowDTO toggleFollowUser(String login);

    /**
     * Method to delete all the followers by a Playlist "id"
     *
     * @param playlistId the id of the Playlist
     */
    void deleteFollowersByPlaylist(Long playlistId);

    /**
     * Method to find all the followers of by the current user
     *
     * @return the list of followers
     */
    List<UserSimplifyedDTO> findFollowersOfCurrentUser();

    /**
     * Method to find all the following users by the current user
     *
     * @return the list of users
     */
    List<UserSimplifyedDTO> findFollowingUsersByCurrentUser();

    /**
     * Method to find the playlists that follows the current user
     *
     * @return the list of playlists
     */
    List<PlaylistDTO> findFollowingPlaylistsByCurrentUser();
}
