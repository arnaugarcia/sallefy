package com.sallefy.service.dto;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the {@link com.sallefy.domain.Track} entity.
 */
public class TrackDTO implements Serializable {

    private Long id;

    private String name;

    private Double raiting;

    private String reference;

    private Integer duration;

    private String primaryColor;


    private Set<PlaylistDTO> playlists = new HashSet<>();

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

    public Double getRaiting() {
        return raiting;
    }

    public void setRaiting(Double raiting) {
        this.raiting = raiting;
    }

    public String getReference() {
        return reference;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public String getPrimaryColor() {
        return primaryColor;
    }

    public void setPrimaryColor(String primaryColor) {
        this.primaryColor = primaryColor;
    }

    public Set<PlaylistDTO> getPlaylists() {
        return playlists;
    }

    public void setPlaylists(Set<PlaylistDTO> playlists) {
        this.playlists = playlists;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TrackDTO trackDTO = (TrackDTO) o;
        if (trackDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), trackDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TrackDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", raiting=" + getRaiting() +
            ", reference='" + getReference() + "'" +
            ", duration=" + getDuration() +
            ", primaryColor='" + getPrimaryColor() + "'" +
            "}";
    }
}
