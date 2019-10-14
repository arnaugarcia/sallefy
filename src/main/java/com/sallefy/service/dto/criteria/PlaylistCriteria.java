package com.sallefy.service.dto.criteria;

import java.io.Serializable;
import java.util.Objects;

public class PlaylistCriteria extends BaseCriteria implements Serializable {

    private boolean recent;

    private boolean popular;

    public PlaylistCriteria() {
    }

    public boolean isRecent() {
        return recent;
    }

    public void setRecent(boolean recent) {
        this.recent = recent;
    }

    public boolean isPopular() {
        return popular;
    }

    public void setPopular(boolean popular) {
        this.popular = popular;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PlaylistCriteria)) return false;
        PlaylistCriteria that = (PlaylistCriteria) o;
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