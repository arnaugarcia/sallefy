package com.sallefy.service.dto.criteria;

import java.io.Serializable;
import java.util.Objects;

public class PlaylistCriteriaDTO extends BaseCriteria implements Serializable {

    private final Boolean recent;

    private final Boolean popular;

    public PlaylistCriteriaDTO(Integer size, Boolean recent, Boolean popular) {
        super(size);
        this.recent = recent;
        this.popular = popular;
    }

    public Boolean isRecent() {
        return recent;
    }

    public Boolean getRecent() {
        return recent;
    }

    public Boolean getPopular() {
        return popular;
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
