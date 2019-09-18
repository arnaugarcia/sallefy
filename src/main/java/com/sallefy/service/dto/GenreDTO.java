package com.sallefy.service.dto;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.sallefy.domain.Genre} entity.
 */
public class GenreDTO implements Serializable {

    private Long id;

    private String name;

    private Integer popularity;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getPopularity() {
        return popularity;
    }

    public void setPopularity(Integer popularity) {
        this.popularity = popularity;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        GenreDTO genreDTO = (GenreDTO) o;
        if (genreDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), genreDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GenreDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", popularity=" + getPopularity() +
            "}";
    }
}