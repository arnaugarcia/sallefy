package com.sallefy.service.exception;

public class ExternalClientError extends RuntimeException {

    public ExternalClientError() {
        super("There's been a problem with the external API...");
    }
}
