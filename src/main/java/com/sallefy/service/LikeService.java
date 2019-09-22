package com.sallefy.service;

import com.sallefy.service.dto.LikeDTO;

/**
 * Service Interface for managing likes in Albums and Tracks.
 */
public interface LikeService {

    /**
     * Method to like or dislike a Track by "id"
     *
     * @param trackId the id of the Track
     * @return a LikeDTO with the liked boolean
     */
    LikeDTO toggleLikeTrack(Long trackId);

    /**
     * Method to like or dislike an Album by "id"
     * @param albumId the id of the album
     * @return a LikeDTO with the liked boolean
     */
    LikeDTO toggleLikeAlbum(Long albumId);
}
