package com.sallefy.service.exception;


public class PlaylistNotFound extends RuntimeException {

    public PlaylistNotFound() {
        super("No playlist was found");
    }

}
