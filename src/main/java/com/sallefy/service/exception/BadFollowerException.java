package com.sallefy.service.exception;


public class BadFollowerException extends RuntimeException {

    public BadFollowerException() {
        super("Are you trying to follow yourself? Really?");
    }

}
