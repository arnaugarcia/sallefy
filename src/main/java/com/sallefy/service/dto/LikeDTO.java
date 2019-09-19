package com.sallefy.service.dto;

import java.io.Serializable;

/**
 * A DTO for the {@link com.sallefy.domain.LikeTrack} entity.
 */
public class LikeDTO implements Serializable {

    private Boolean liked;

    public Boolean getLiked() {
        return liked;
    }

    public void setLiked(Boolean liked) {
        this.liked = liked;
    }
}
