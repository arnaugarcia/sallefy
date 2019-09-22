package com.sallefy.web.rest.errors;

public class TrackNotFoundException extends RuntimeException {

    public TrackNotFoundException() {
        super("Track not found");
    }

}
