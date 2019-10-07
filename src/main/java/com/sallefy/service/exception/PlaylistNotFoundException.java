package com.sallefy.service.exception;


public class PlaylistNotFoundException extends RuntimeException {

    public PlaylistNotFoundException() {
        super("No playlist was found");
    }

}
