package com.sallefy.service.dto;

import java.io.Serializable;

/**
 * A DTO for the {@link com.sallefy.domain.Genre} entity.
 */
public class GenreDTO implements Serializable {

    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
