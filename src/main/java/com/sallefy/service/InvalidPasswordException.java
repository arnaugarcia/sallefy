package com.sallefy.service;

public class InvalidPasswordException extends RuntimeException {

    public InvalidPasswordException() {
        super("Incorrect password");
    }

}
