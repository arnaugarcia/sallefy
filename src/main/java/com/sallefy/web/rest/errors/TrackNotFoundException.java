package com.sallefy.web.rest.errors;

public class TrackNotFoundException extends NotFoundAlertException {

    public TrackNotFoundException() {
        super("Track not found", "Track", ErrorConstants.ERR_TRACK_NOT_FOUND);
    }

}
