package com.sallefy.service.dto.constraints;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import javax.validation.constraints.NotEmpty;

public class LongitudeValidator implements ConstraintValidator<Longitude, Double> {
    public void initialize(Longitude constraint) {
    }

    public boolean isValid(Double latitude, ConstraintValidatorContext context) {
        return (latitude > 180 || latitude < - 180);
    }
}
