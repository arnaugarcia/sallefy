package com.sallefy.service.dto;

import io.swagger.annotations.ApiModel;

import java.io.Serializable;

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
}
