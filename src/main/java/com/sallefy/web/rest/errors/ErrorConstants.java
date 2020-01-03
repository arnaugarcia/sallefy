package com.sallefy.web.rest.errors;

import java.net.URI;

public final class ErrorConstants {

    public static final String ERR_CONCURRENCY_FAILURE = "error.concurrencyFailure";
    public static final String ERR_VALIDATION = "error.validation";
    public static final String ERR_ALBUM_NOT_FOUND = "error.album.notFound";
    public static final String ERR_GENRE_NOT_FOUND = "error.genre.notFound";
    public static final String ERR_PLAYLIST_NOT_FOUND = "error.playlist.notFound";
    public static final String ERR_TRACK_NOT_FOUND = "error.track.notFound";
    public static final String ERR_OWNER_DIFFERS = "error.user.differs";
    public static final String NOT_YET_IMPLEMENTED = "error.server.notYetImplemented";
    public static final String ERR_USER_NOT_FOUND = "error.user.notFound";
    public static final String ERR_SERVICE_UNAVAILABLE = "error.server.notAvailable";
    public static final String ERR_GENERIC = "error.generic";

    public static final String PROBLEM_BASE_URL = "http://sallefy.eu-west-3.elasticbeanstalk.com/problem";
    public static final URI DEFAULT_TYPE = URI.create(PROBLEM_BASE_URL + "/problem-with-message");
    public static final URI FORBIDDEN_TYPE = URI.create(PROBLEM_BASE_URL + "/forbidden");
    public static final URI CONSTRAINT_VIOLATION_TYPE = URI.create(PROBLEM_BASE_URL + "/constraint-violation");
    public static final URI NOT_FOUND_TYPE = URI.create(PROBLEM_BASE_URL + "/not-found");
    public static final URI INVALID_PASSWORD_TYPE = URI.create(PROBLEM_BASE_URL + "/invalid-password");
    public static final URI EMAIL_ALREADY_USED_TYPE = URI.create(PROBLEM_BASE_URL + "/email-already-used");
    public static final URI LOGIN_ALREADY_USED_TYPE = URI.create(PROBLEM_BASE_URL + "/login-already-used");
    public static final URI EMAIL_NOT_FOUND_TYPE = URI.create(PROBLEM_BASE_URL + "/email-not-found");
    public static final URI USER_NOT_FOUND_TYPE = URI.create(PROBLEM_BASE_URL + "/user-not-found");
    public static final URI NOT_IMPLEMENTED = URI.create(PROBLEM_BASE_URL + "/not-implemented");

    private ErrorConstants() {
    }
}
