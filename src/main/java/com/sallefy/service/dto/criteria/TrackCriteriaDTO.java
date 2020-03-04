package com.sallefy.service.dto.criteria;

import java.io.Serializable;
import java.util.Objects;

public class TrackCriteriaDTO extends BaseCriteria implements Serializable {

    private final Boolean recent;

    private final Boolean liked;

    private final Boolean played;

    public TrackCriteriaDTO(Integer size, Boolean recent, Boolean liked, Boolean played) {
        super(size);
        this.recent = recent;
        this.liked = liked;
        this.played = played;
    }

    public Boolean getRecent() {
        return recent;
    }

    public Boolean getLiked() {
        return liked;
    }

    public Boolean getPlayed() {
        return played;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof TrackCriteriaDTO)) return false;
        TrackCriteriaDTO that = (TrackCriteriaDTO) o;
        return Objects.equals(recent, that.recent) &&
            Objects.equals(liked, that.liked) &&
            Objects.equals(played, that.played);
    }

    @Override
    public int hashCode() {
        return Objects.hash(recent, liked, played);
    }

    @Override
    public String toString() {
        return "TrackCriteria{" +
            "recent=" + recent +
            ", liked=" + liked +
            ", played=" + played +
            '}';
    }
}
