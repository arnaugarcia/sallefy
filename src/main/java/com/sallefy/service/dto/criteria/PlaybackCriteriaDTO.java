package com.sallefy.service.dto.criteria;

import com.sallefy.service.dto.constraints.AllOrNone;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

@AllOrNone({"latitude", "longitude", "radius"})
public class PlaybackCriteriaDTO implements Serializable {

    private final Double latitude;
    private final Double longitude;
    private final Integer radius;
    private final LocalDate startDate;
    private final LocalDate endDate;
    private final String username;
    private final Long trackId;
    private final String genre;

    public PlaybackCriteriaDTO(Double latitude, Double longitude, Integer radius, LocalDate startDate, LocalDate endDate, String username, Long trackId, String genre) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.radius = radius;
        this.startDate = startDate;
        this.endDate = endDate;
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

    public LocalDate getStartDate() {
        return startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
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
            Objects.equals(startDate, that.startDate) &&
            Objects.equals(endDate, that.endDate) &&
            Objects.equals(username, that.username) &&
            Objects.equals(trackId, that.trackId) &&
            Objects.equals(genre, that.genre);
    }

    @Override
    public int hashCode() {
        return Objects.hash(latitude, longitude, radius, startDate, endDate, username, trackId, genre);
    }

    @Override
    public String toString() {
        return "PlaybackCriteriaDTO{" +
            "latitude=" + latitude +
            ", longitude=" + longitude +
            ", radius=" + radius +
            ", startDate=" + startDate +
            ", endDate=" + endDate +
            ", username='" + username + '\'' +
            ", trackId=" + trackId +
            ", genre='" + genre + '\'' +
            '}';
    }
}
