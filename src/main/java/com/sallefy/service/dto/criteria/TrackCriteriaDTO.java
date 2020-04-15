package com.sallefy.service.dto.criteria;

import java.io.Serializable;
import java.util.Objects;

public class TrackCriteriaDTO extends BaseCriteria implements Serializable {

    private final Boolean recent;

    private final Boolean liked;

    private final Boolean played;

    private final String genre;

    public TrackCriteriaDTO(Integer size, Boolean recent, Boolean liked, Boolean played, String genre) {
        super(size);
        this.recent = recent;
        this.liked = liked;
        this.played = played;
        this.genre = genre;
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

    public String getGenre() {
        return genre;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof TrackCriteriaDTO)) return false;
        TrackCriteriaDTO that = (TrackCriteriaDTO) o;
        return Objects.equals(recent, that.recent) &&
            Objects.equals(liked, that.liked) &&
            Objects.equals(played, that.played) &&
            Objects.equals(genre, that.genre);
    }

    @Override
    public int hashCode() {
        return Objects.hash(recent, liked, played, genre);
    }

    @Override
    public String toString() {
        return "TrackCriteriaDTO{" +
            "recent=" + recent +
            ", liked=" + liked +
            ", played=" + played +
            ", genre='" + genre + '\'' +
            '}';
    }
}
