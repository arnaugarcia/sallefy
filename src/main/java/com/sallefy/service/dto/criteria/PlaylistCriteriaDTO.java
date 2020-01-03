package com.sallefy.service.dto.criteria;

import java.io.Serializable;
import java.util.Objects;

public class PlaylistCriteriaDTO extends BaseCriteria implements Serializable {

    private Boolean recent;

    private Boolean popular;

    public PlaylistCriteriaDTO() {
    }

    public Boolean isRecent() {
        return recent;
    }

    public void setRecent(Boolean recent) {
        this.recent = recent;
    }

    public Boolean getRecent() {
        return recent;
    }

    public Boolean getPopular() {
        return popular;
    }

    public void setPopular(Boolean popular) {
        this.popular = popular;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PlaylistCriteriaDTO)) return false;
        PlaylistCriteriaDTO that = (PlaylistCriteriaDTO) o;
        return recent == that.recent &&
            popular == that.popular;
    }

    @Override
    public int hashCode() {
        return Objects.hash(recent, popular);
    }

    @Override
    public String toString() {
        return "PlaylistCriteria{" +
            "recent=" + recent +
            ", popular=" + popular +
            '}';
    }
}
