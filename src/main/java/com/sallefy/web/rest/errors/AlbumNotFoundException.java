package com.sallefy.web.rest.errors;

public class AlbumNotFoundException extends NotFoundAlertException {

    public AlbumNotFoundException() {
        super("Album not found", "Album", ErrorConstants.ERR_ALBUM_NOT_FOUND);
    }

}
