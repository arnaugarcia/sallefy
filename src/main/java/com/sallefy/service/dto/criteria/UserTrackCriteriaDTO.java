package com.sallefy.service.dto.criteria;

import java.io.Serializable;

public class UserTrackCriteriaDTO extends BaseCriteria implements Serializable {

    private Boolean popular;

    public UserTrackCriteriaDTO() {
    }

    public Boolean getPopular() {
        return popular;
    }

    public void setPopular(Boolean popular) {
        this.popular = popular;
    }

    @Override
    public String toString() {
        return "UserTrackCriteriaDTO{" +
            "popular='" + popular + '\'' +
            '}';
    }
}
