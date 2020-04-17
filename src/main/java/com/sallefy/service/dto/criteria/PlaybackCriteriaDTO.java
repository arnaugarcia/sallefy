package com.sallefy.service.dto.criteria;

import com.sallefy.service.dto.constraints.AllOrNone;

import java.io.Serializable;
import java.util.Objects;

@AllOrNone({"latitude", "longitude", "radius"})
public class PlaybackCriteriaDTO implements Serializable {

    private final Double latitude;
    private final Double longitude;
    private final Integer radius;
    private final String username;
    private final Long trackId;
    private final String genre;

    public PlaybackCriteriaDTO(Double latitude, Double longitude, Integer radius, String username, Long trackId, String genre) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.radius = radius;
        this.username = username;
        this.trackId = trackId;
        this.genre = genre;
    }

    public Double getLatitude() {
        return latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public Integer getRadius() {
        return radius;
    }

    public String getUsername() {
        return username;
    }

    public Long getTrackId() {
        return trackId;
    }

    public String getGenre() {
        return genre;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PlaybackCriteriaDTO)) return false;
        PlaybackCriteriaDTO that = (PlaybackCriteriaDTO) o;
        return Objects.equals(latitude, that.latitude) &&
            Objects.equals(longitude, that.longitude) &&
            Objects.equals(radius, that.radius) &&
            Objects.equals(username, that.username) &&
            Objects.equals(trackId, that.trackId) &&
            Objects.equals(genre, that.genre);
    }

    @Override
    public int hashCode() {
        return Objects.hash(latitude, longitude, radius, username, trackId, genre);
    }


}
