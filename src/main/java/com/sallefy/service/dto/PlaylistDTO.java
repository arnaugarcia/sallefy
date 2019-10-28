package com.sallefy.service.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.Lob;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A DTO for the {@link com.sallefy.domain.Playlist} entity.
 */
public class PlaylistDTO implements Serializable {

    private Long id;

    @NotNull
    private String name;

    @Lob
    private String description;

    private String cover;

    private String thumbnail;

    @JsonProperty("public")
    private Boolean publicAccessible;

    private UserSimplifyedDTO owner;

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public UserSimplifyedDTO getOwner() {
        return owner;
    }

    public void setOwner(UserSimplifyedDTO owner) {
        this.owner = owner;
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
            ", description='" + getDescription() + "'" +
            ", cover='" + getCover() + "'" +
            ", thumbnail='" + getThumbnail() + "'" +
            ", publicAccessible='" + isPublicAccessible() + "'" +
            ", owner='" + getOwner() + "'" +
            "}";
    }
}
