package com.sallefy.service;

import com.sallefy.service.dto.LikeTrackDTO;
import io.undertow.util.BadRequestException;

import java.util.Optional;

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
    Optional<LikeTrackDTO> toggleLikeTrack(Long trackId) throws BadRequestException;
}
