package com.sallefy.service;

import javax.servlet.http.HttpServletRequest;

/**
 * Service to manage playbacks
 */
public interface PlayService {

    /**
     * Method to save a playback for a track
     *
     * @param requestContext the context of the client has made
     * @param id the "id" of the track
     */
    void playTrack(HttpServletRequest requestContext, Long id);

}
