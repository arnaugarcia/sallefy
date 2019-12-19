package com.sallefy.service;

import com.sallefy.service.dto.LatLongDTO;

import javax.servlet.http.HttpServletRequest;

/**
 * Service to manage playbacks
 */
public interface PlayService {

    /**
     * Method to save a playback for a track
     *  @param requestContext the context of the client has made
     * @param latLong the latitude and longitude
     * @param id the "id" of the track
     */
    void playTrack(HttpServletRequest requestContext, LatLongDTO latLong, Long id);

}
