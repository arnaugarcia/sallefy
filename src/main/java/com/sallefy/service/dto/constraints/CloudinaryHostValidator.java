package com.sallefy.service.dto.constraints;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.net.MalformedURLException;
import java.net.URL;

import static com.sallefy.config.Constants.CLOUDINARY_HOST_URL;

public class CloudinaryHostValidator implements ConstraintValidator<CloudinaryHost, String> {

    @Override
    public void initialize(CloudinaryHost constraintAnnotation) {

    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext constraintValidatorContext) {
        try {
            URL url = new URL(value);
            return url.getHost().equals(CLOUDINARY_HOST_URL);
        } catch (MalformedURLException e) {
            return false;
        }
    }
}
