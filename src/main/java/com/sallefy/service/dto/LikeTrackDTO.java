package com.sallefy.service.dto;
import java.time.ZonedDateTime;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.sallefy.domain.LikeTrack} entity.
 */
public class LikeTrackDTO implements Serializable {

    private Long id;

    private Boolean liked;

    private ZonedDateTime date;


    private Long trackId;

    private String trackName;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isLiked() {
        return liked;
    }

    public void setLiked(Boolean liked) {
        this.liked = liked;
    }

    public ZonedDateTime getDate() {
        return date;
    }

    public void setDate(ZonedDateTime date) {
        this.date = date;
    }

    public Long getTrackId() {
        return trackId;
    }

    public void setTrackId(Long trackId) {
        this.trackId = trackId;
    }

    public String getTrackName() {
        return trackName;
    }

    public void setTrackName(String trackName) {
        this.trackName = trackName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        LikeTrackDTO likeTrackDTO = (LikeTrackDTO) o;
        if (likeTrackDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), likeTrackDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "LikeTrackDTO{" +
            "id=" + getId() +
            ", liked='" + isLiked() + "'" +
            ", date='" + getDate() + "'" +
            ", track=" + getTrackId() +
            ", track='" + getTrackName() + "'" +
            "}";
    }
}
