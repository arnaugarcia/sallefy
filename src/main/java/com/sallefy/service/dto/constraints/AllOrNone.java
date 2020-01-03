package com.sallefy.service.dto.constraints;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static com.sallefy.web.rest.errors.ErrorConstants.ERR_VALIDATION;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Target(ElementType.TYPE)
@Retention(RUNTIME)
@Documented
@Constraint(validatedBy = AllOrNoneValidator.class)
public @interface AllOrNone {

    String[] value();

    String message() default ERR_VALIDATION;

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
