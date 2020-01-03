package com.sallefy.web.rest.errors;

import org.zalando.problem.AbstractThrowableProblem;
import org.zalando.problem.Status;

public class UserNotFoundException extends AbstractThrowableProblem {

    private static final long serialVersionUID = 1L;

    public UserNotFoundException() {
        super(ErrorConstants.USER_NOT_FOUND_TYPE, "User not found", Status.BAD_REQUEST);
    }
}
