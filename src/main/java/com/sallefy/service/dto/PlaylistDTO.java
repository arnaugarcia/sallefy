package com.sallefy.service.dto;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import javax.persistence.Lob;

/**
 * A DTO for the {@link com.sallefy.domain.Playlist} entity.
 */
public class PlaylistDTO implements Serializable {

    private Long id;

    private String name;

    private Boolean collaborative;

    @Lob
    private String description;

    private String primaryColor;

    private String cover;

    private String thumbnail;

    private Boolean publicAccessible;

    private Integer numberSongs;

    private Integer followers;

    private Double rating;


    private Long userId;

    private String userLogin;

    private Set<TrackDTO> tracks = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean isCollaborative() {
        return collaborative;
    }

    public void setCollaborative(Boolean collaborative) {
        this.collaborative = collaborative;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPrimaryColor() {
        return primaryColor;
    }

    public void setPrimaryColor(String primaryColor) {
        this.primaryColor = primaryColor;
    }

    public String getCover() {
        return cover;
    }

    public void setCover(String cover) {
        this.cover = cover;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }

    public Boolean isPublicAccessible() {
        return publicAccessible;
    }

    public void setPublicAccessible(Boolean publicAccessible) {
        this.publicAccessible = publicAccessible;
    }

    public Integer getNumberSongs() {
        return numberSongs;
    }

    public void setNumberSongs(Integer numberSongs) {
        this.numberSongs = numberSongs;
    }

    public Integer getFollowers() {
        return followers;
    }

    public void setFollowers(Integer followers) {
        this.followers = followers;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
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

        PlaylistDTO playlistDTO = (PlaylistDTO) o;
        if (playlistDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), playlistDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PlaylistDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", collaborative='" + isCollaborative() + "'" +
            ", description='" + getDescription() + "'" +
            ", primaryColor='" + getPrimaryColor() + "'" +
            ", cover='" + getCover() + "'" +
            ", thumbnail='" + getThumbnail() + "'" +
            ", publicAccessible='" + isPublicAccessible() + "'" +
            ", numberSongs=" + getNumberSongs() +
            ", followers=" + getFollowers() +
            ", rating=" + getRating() +
            ", user=" + getUserId() +
            ", user='" + getUserLogin() + "'" +
            "}";
    }
}
