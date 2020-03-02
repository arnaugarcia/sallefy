package com.sallefy.service.dto.criteria;

import java.io.Serializable;
import java.util.Objects;

public class UserCriteriaDTO extends BaseCriteria implements Serializable {

    private final Boolean recent;

    private final Boolean popular;

    private final Boolean notFollowing;

    public UserCriteriaDTO(Boolean recent, Boolean popular, Boolean notFollowing) {
        this.recent = recent;
        this.popular = popular;
        this.notFollowing = notFollowing;
    }


    public Boolean getRecent() {
        return recent;
    }


    public Boolean getPopular() {
        return popular;
    }


    public Boolean getNotFollowing() {
        return notFollowing;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof UserCriteriaDTO)) return false;
        UserCriteriaDTO that = (UserCriteriaDTO) o;
        return Objects.equals(recent, that.recent) &&
            Objects.equals(popular, that.popular) &&
            Objects.equals(notFollowing, that.notFollowing);
    }

    @Override
    public int hashCode() {
        return Objects.hash(recent, popular, notFollowing);
    }

    @Override
    public String toString() {
        return "UserCriteriaDTO{" +
            "recent=" + recent +
            ", popular=" + popular +
            ", notFollowing=" + notFollowing +
            '}';
    }
}
