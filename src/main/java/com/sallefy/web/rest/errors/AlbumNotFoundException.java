package com.sallefy.web.rest.errors;

public class AlbumNotFoundException extends NotFoundAlertException {

    public AlbumNotFoundException() {
        super("Album not found", "Track", "notFound");
    }

}
