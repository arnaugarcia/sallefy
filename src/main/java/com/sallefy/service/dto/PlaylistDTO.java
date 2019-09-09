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

    private String reference;

    @Lob
    private String description;

    private String primaryColor;

    private Boolean publicAccessible;

    private Integer numberSongs;

    private Integer followers;

    private Double rating;


    private Long ownerId;

    private String ownerLogin;

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

    public String getReference() {
        return reference;
    }

    public void setReference(String reference) {
        this.reference = reference;
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

    public Long getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Long userId) {
        this.ownerId = userId;
    }

    public String getOwnerLogin() {
        return ownerLogin;
    }

    public void setOwnerLogin(String userLogin) {
        this.ownerLogin = userLogin;
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
            ", reference='" + getReference() + "'" +
            ", description='" + getDescription() + "'" +
            ", primaryColor='" + getPrimaryColor() + "'" +
            ", publicAccessible='" + isPublicAccessible() + "'" +
            ", numberSongs=" + getNumberSongs() +
            ", followers=" + getFollowers() +
            ", rating=" + getRating() +
            ", owner=" + getOwnerId() +
            ", owner='" + getOwnerLogin() + "'" +
            "}";
    }
}
