package com.sallefy.service.dto;
import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Lob;

/**
 * A DTO for the {@link com.sallefy.domain.Artist} entity.
 */
public class ArtistDTO implements Serializable {

    private Long id;

    private String name;

    private String reference;

    private String photo;

    @Lob
    private String biography;


    private Long albumId;

    private String albumTitle;

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

    public String getReference() {
        return reference;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public String getBiography() {
        return biography;
    }

    public void setBiography(String biography) {
        this.biography = biography;
    }

    public Long getAlbumId() {
        return albumId;
    }

    public void setAlbumId(Long albumId) {
        this.albumId = albumId;
    }

    public String getAlbumTitle() {
        return albumTitle;
    }

    public void setAlbumTitle(String albumTitle) {
        this.albumTitle = albumTitle;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ArtistDTO artistDTO = (ArtistDTO) o;
        if (artistDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), artistDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ArtistDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", reference='" + getReference() + "'" +
            ", photo='" + getPhoto() + "'" +
            ", biography='" + getBiography() + "'" +
            ", album=" + getAlbumId() +
            ", album='" + getAlbumTitle() + "'" +
            "}";
    }
}
