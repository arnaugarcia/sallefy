package com.sallefy.service.dto.constraints;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.net.MalformedURLException;
import java.net.URL;

import static com.sallefy.config.Constants.CLOUDINARY_HOST_URL;

public class CloudinaryHostValidator implements ConstraintValidator<CloudinaryHost, String> {

    private boolean optional;

    @Override
    public void initialize(CloudinaryHost constraintAnnotation) {
        this.optional = constraintAnnotation.optional();
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext constraintValidatorContext) {
        if (optional && value == null) {
            return true;
        }
        try {
            URL url = new URL(value);
            return url.getHost().equals(CLOUDINARY_HOST_URL);
        } catch (MalformedURLException e) {
            return false;
        }
    }
}
