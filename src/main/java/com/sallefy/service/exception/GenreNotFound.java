package com.sallefy.service.exception;

public class GenreNotFound extends RuntimeException {

    public GenreNotFound() {
        super("Genre not found");
    }
}
