package com.sallefy.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Track.
 */
@Entity
@Table(name = "track")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Track implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "raiting")
    private Double raiting;

    @Column(name = "reference")
    private String reference;

    @Column(name = "duration")
    private Integer duration;

    @Column(name = "primary_color")
    private String primaryColor;

    @OneToMany(mappedBy = "track")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Image> images = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "track_playlist",
               joinColumns = @JoinColumn(name = "track_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "playlist_id", referencedColumnName = "id"))
    private Set<Playlist> playlists = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Track name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getRaiting() {
        return raiting;
    }

    public Track raiting(Double raiting) {
        this.raiting = raiting;
        return this;
    }

    public void setRaiting(Double raiting) {
        this.raiting = raiting;
    }

    public String getReference() {
        return reference;
    }

    public Track reference(String reference) {
        this.reference = reference;
        return this;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public Integer getDuration() {
        return duration;
    }

    public Track duration(Integer duration) {
        this.duration = duration;
        return this;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public String getPrimaryColor() {
        return primaryColor;
    }

    public Track primaryColor(String primaryColor) {
        this.primaryColor = primaryColor;
        return this;
    }

    public void setPrimaryColor(String primaryColor) {
        this.primaryColor = primaryColor;
    }

    public Set<Image> getImages() {
        return images;
    }

    public Track images(Set<Image> images) {
        this.images = images;
        return this;
    }

    public Track addImages(Image image) {
        this.images.add(image);
        image.setTrack(this);
        return this;
    }

    public Track removeImages(Image image) {
        this.images.remove(image);
        image.setTrack(null);
        return this;
    }

    public void setImages(Set<Image> images) {
        this.images = images;
    }

    public Set<Playlist> getPlaylists() {
        return playlists;
    }

    public Track playlists(Set<Playlist> playlists) {
        this.playlists = playlists;
        return this;
    }

    public Track addPlaylist(Playlist playlist) {
        this.playlists.add(playlist);
        playlist.getTracks().add(this);
        return this;
    }

    public Track removePlaylist(Playlist playlist) {
        this.playlists.remove(playlist);
        playlist.getTracks().remove(this);
        return this;
    }

    public void setPlaylists(Set<Playlist> playlists) {
        this.playlists = playlists;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Track)) {
            return false;
        }
        return id != null && id.equals(((Track) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Track{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", raiting=" + getRaiting() +
            ", reference='" + getReference() + "'" +
            ", duration=" + getDuration() +
            ", primaryColor='" + getPrimaryColor() + "'" +
            "}";
    }
}
