package com.sallefy.service.dto.criteria;

import java.io.Serializable;
import java.util.Objects;

public class UserCriteriaDTO extends BaseCriteria implements Serializable {

    private Boolean recent;

    private Boolean popular;

    private Boolean notFollowing;

    public UserCriteriaDTO() {
    }

    public Boolean getRecent() {
        return recent;
    }

    public void setRecent(Boolean recent) {
        this.recent = recent;
    }

    public Boolean getPopular() {
        return popular;
    }

    public void setPopular(Boolean popular) {
        this.popular = popular;
    }

    public Boolean getNotFollowing() {
        return notFollowing;
    }

    public void setNotFollowing(Boolean notFollowing) {
        this.notFollowing = notFollowing;
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
