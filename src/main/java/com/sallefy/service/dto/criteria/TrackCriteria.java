package com.sallefy.service.dto.criteria;

import java.io.Serializable;
import java.util.Objects;

public class TrackCriteria extends BaseCriteria implements Serializable {

    private Boolean recent;

    private Boolean liked;

    public TrackCriteria() {
    }

    public Boolean getRecent() {
        return recent;
    }

    public void setRecent(Boolean recent) {
        this.recent = recent;
    }

    public Boolean getLiked() {
        return liked;
    }

    public void setLiked(Boolean liked) {
        this.liked = liked;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof TrackCriteria)) return false;
        TrackCriteria that = (TrackCriteria) o;
        return Objects.equals(recent, that.recent) &&
            Objects.equals(liked, that.liked);
    }

    @Override
    public int hashCode() {
        return Objects.hash(recent, liked);
    }

    @Override
    public String toString() {
        return "TrackCriteria{" +
            "recent=" + recent +
            ", liked=" + liked +
            '}';
    }
}
