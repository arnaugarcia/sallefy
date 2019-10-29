package com.sallefy.service.dto.criteria;

import java.io.Serializable;
import java.util.Objects;

public class UserCriteriaDTO extends BaseCriteria implements Serializable {

    private Boolean recent;

    public UserCriteriaDTO() {
    }

    public Boolean getRecent() {
        return recent;
    }

    public void setRecent(Boolean recent) {
        this.recent = recent;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof UserCriteriaDTO)) return false;
        UserCriteriaDTO that = (UserCriteriaDTO) o;
        return Objects.equals(recent, that.recent);
    }

    @Override
    public int hashCode() {
        return Objects.hash(recent);
    }

    @Override
    public String toString() {
        return "TrackCriteria{" +
            "recent=" + recent +
            '}';
    }
}
