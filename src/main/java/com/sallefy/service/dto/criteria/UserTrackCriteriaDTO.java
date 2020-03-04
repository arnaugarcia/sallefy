package com.sallefy.service.dto.criteria;

import java.io.Serializable;

public class UserTrackCriteriaDTO extends BaseCriteria implements Serializable {

    private final Boolean popular;

    public UserTrackCriteriaDTO(Integer size, Boolean popular) {
        super(size);
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
