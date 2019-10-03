package com.sallefy.web.rest.errors;

public class NotImplementedException extends NotImplementedAlertException {

    private static final long serialVersionUID = 1L;

    public NotImplementedException() {
        super(ErrorConstants.NOT_IMPLEMENTED, "Not implemented!", "sallefy", ErrorConstants.NOT_YET_IMPLEMENTED);
    }
}
