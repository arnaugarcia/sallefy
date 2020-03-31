package com.sallefy.service.dto;

import io.swagger.annotations.ApiModel;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for status of liking entity.
 */
@ApiModel(value = "Like", description = "A DTO representing if the entity is liked or not")
public class LikeDTO implements Serializable {

    private Boolean liked;

    public LikeDTO() {
    }

    public LikeDTO(Boolean liked) {
        this.liked = liked;
    }

    public Boolean getLiked() {
        return liked;
    }

    public void setLiked(Boolean liked) {
        this.liked = liked;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof LikeDTO)) return false;
        LikeDTO likeDTO = (LikeDTO) o;
        return Objects.equals(liked, likeDTO.liked);
    }

    @Override
    public int hashCode() {
        return Objects.hash(liked);
    }
}
