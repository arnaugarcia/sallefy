package com.sallefy.service;

import com.sallefy.service.dto.LikeDTO;

/**
 * Service Interface for managing likes in Albums and Tracks.
 */
public interface LikeService {

    /**
     * Method to like a Track by "id"
     *
     * @param trackId the id of the Track
     * @return a LikeTrackDTO with the liked boolean
     */
    LikeDTO toggleLikeTrack(Long trackId);
}
