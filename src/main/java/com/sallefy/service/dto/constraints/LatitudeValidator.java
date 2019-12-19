package com.sallefy.service.dto.constraints;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class LatitudeValidator implements ConstraintValidator<Latitude, Double> {
    public void initialize(Latitude constraint) {
    }

    public boolean isValid(Double latitude, ConstraintValidatorContext context) {
        return latitude > -90 && latitude < 90;
    }

}
