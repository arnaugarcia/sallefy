package com.sallefy.service;

/**
 * Service to manage playbacks
 */
public interface PlayService {

    /**
     * Method to save a playback for a track
     *
     * @param id the "id" of the track
     */
    void playTrack(Long id);

}
