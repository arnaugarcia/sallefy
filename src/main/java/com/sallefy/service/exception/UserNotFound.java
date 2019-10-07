package com.sallefy.service.exception;


public class UserNotFound extends RuntimeException {

    public UserNotFound() {
        super("User not found");
    }

}
