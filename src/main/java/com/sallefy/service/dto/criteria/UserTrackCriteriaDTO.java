package com.sallefy.service.dto.criteria;

import java.io.Serializable;

public class UserTrackCriteriaDTO implements Serializable {

    private final Boolean popular;

    public UserTrackCriteriaDTO(Boolean popular) {
        this.popular = popular;
    }

    public Boolean getPopular() {
        return popular;
    }

    @Override
    public String toString() {
        return "UserTrackCriteriaDTO{" +
            "popular='" + popular + '\'' +
            '}';
    }
}
