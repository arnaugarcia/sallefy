package com.sallefy.service.dto.constraints;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import static org.springframework.util.StringUtils.isEmpty;

public class LongitudeValidator implements ConstraintValidator<Longitude, Double> {
    public void initialize(Longitude constraint) {
    }

    public boolean isValid(Double longitude, ConstraintValidatorContext context) {
        return !isEmpty(longitude) && longitude < 180 && longitude > -180;
    }
}
