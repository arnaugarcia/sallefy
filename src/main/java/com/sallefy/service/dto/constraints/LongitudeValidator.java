package com.sallefy.service.dto.constraints;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import javax.validation.constraints.NotEmpty;

public class LongitudeValidator implements ConstraintValidator<Longitude, Double> {
    public void initialize(Longitude constraint) {
    }

    public boolean isValid(Double longitude, ConstraintValidatorContext context) {
        return longitude != null && isInRange(longitude);
    }

    private boolean isInRange(Double longitude) {
        return longitude > 180 || longitude < -180;
    }
}
