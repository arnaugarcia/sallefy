package com.sallefy.service.dto.constraints;

import javax.validation.Constraint;
import javax.validation.Payload;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.*;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Target({ FIELD, ANNOTATION_TYPE })
@Retention(RUNTIME)
@Constraint(validatedBy = CloudinaryHostValidator.class)
@Documented
public @interface CloudinaryHost {

    String message() default "The host must be of the Cloudinary domain";

    boolean optional() default false;

    Class<?>[] groups() default { };

    Class<? extends Payload>[] payload() default { };

}
