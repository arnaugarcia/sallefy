package com.sallefy.service.dto;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the {@link com.sallefy.domain.Album} entity.
 */
public class AlbumDTO implements Serializable {

    private Long id;

    private String title;

    private Integer year;

    private String thumbnail;

    private Integer totalTracks;


    private Long userId;

    private String userLogin;

    private Set<TrackDTO> tracks = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }

    public Integer getTotalTracks() {
        return totalTracks;
    }

    public void setTotalTracks(Integer totalTracks) {
        this.totalTracks = totalTracks;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserLogin() {
        return userLogin;
    }

    public void setUserLogin(String userLogin) {
        this.userLogin = userLogin;
    }

    public Set<TrackDTO> getTracks() {
        return tracks;
    }

    public void setTracks(Set<TrackDTO> tracks) {
        this.tracks = tracks;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        AlbumDTO albumDTO = (AlbumDTO) o;
        if (albumDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), albumDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AlbumDTO{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", year=" + getYear() +
            ", thumbnail='" + getThumbnail() + "'" +
            ", totalTracks=" + getTotalTracks() +
            ", user=" + getUserId() +
            ", user='" + getUserLogin() + "'" +
            "}";
    }
}
