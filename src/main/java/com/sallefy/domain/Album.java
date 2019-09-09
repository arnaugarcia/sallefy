package com.sallefy.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Album.
 */
@Entity
@Table(name = "album")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Album implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "reference")
    private String reference;

    @Column(name = "year")
    private Integer year;

    @Column(name = "total_tracks")
    private Integer totalTracks;

    @OneToMany(mappedBy = "album")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Image> images = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "album_track",
               joinColumns = @JoinColumn(name = "album_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "track_id", referencedColumnName = "id"))
    private Set<Track> tracks = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Album title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getReference() {
        return reference;
    }

    public Album reference(String reference) {
        this.reference = reference;
        return this;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public Integer getYear() {
        return year;
    }

    public Album year(Integer year) {
        this.year = year;
        return this;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Integer getTotalTracks() {
        return totalTracks;
    }

    public Album totalTracks(Integer totalTracks) {
        this.totalTracks = totalTracks;
        return this;
    }

    public void setTotalTracks(Integer totalTracks) {
        this.totalTracks = totalTracks;
    }

    public Set<Image> getImages() {
        return images;
    }

    public Album images(Set<Image> images) {
        this.images = images;
        return this;
    }

    public Album addImages(Image image) {
        this.images.add(image);
        image.setAlbum(this);
        return this;
    }

    public Album removeImages(Image image) {
        this.images.remove(image);
        image.setAlbum(null);
        return this;
    }

    public void setImages(Set<Image> images) {
        this.images = images;
    }

    public Set<Track> getTracks() {
        return tracks;
    }

    public Album tracks(Set<Track> tracks) {
        this.tracks = tracks;
        return this;
    }

    public Album addTrack(Track track) {
        this.tracks.add(track);
        track.getAlbums().add(this);
        return this;
    }

    public Album removeTrack(Track track) {
        this.tracks.remove(track);
        track.getAlbums().remove(this);
        return this;
    }

    public void setTracks(Set<Track> tracks) {
        this.tracks = tracks;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Album)) {
            return false;
        }
        return id != null && id.equals(((Album) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Album{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", reference='" + getReference() + "'" +
            ", year=" + getYear() +
            ", totalTracks=" + getTotalTracks() +
            "}";
    }
}
