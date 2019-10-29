package com.sallefy.service.dto;

import java.io.Serializable;

/**
 * A DTO for status of liking entity.
 */
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
