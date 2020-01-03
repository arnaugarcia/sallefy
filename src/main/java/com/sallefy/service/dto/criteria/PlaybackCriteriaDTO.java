package com.sallefy.service.dto.criteria;

import com.sallefy.service.dto.constraints.AllOrNone;

import java.io.Serializable;
import java.util.Objects;

@AllOrNone({"latitude", "longitude", "radius"})
public class PlaybackCriteriaDTO extends BaseCriteria implements Serializable {

    private Double latitude;
    private Double longitude;
    private Integer radius;
    private String username;
    private Long trackId;
    private String genre;

    public PlaybackCriteriaDTO() {
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public Integer getRadius() {
        return radius;
    }

    public void setRadius(Integer radius) {
        this.radius = radius;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Long getTrackId() {
        return trackId;
    }

    public void setTrackId(Long trackId) {
        this.trackId = trackId;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
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
