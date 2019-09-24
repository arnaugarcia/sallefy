package com.sallefy.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

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

    @Column(name = "year")
    private Integer year;

    @Column(name = "thumbnail")
    private String thumbnail;

    @Column(name = "total_tracks")
    private Integer totalTracks;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("albums")
    private User user;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "album_track",
               joinColumns = @JoinColumn(name = "album_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "track_id", referencedColumnName = "id"))
    private Set<Track> tracks = new HashSet<>();

    @OneToMany(mappedBy = "album")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<LikeAlbum> likeAlbums = new HashSet<>();

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

    public String getThumbnail() {
        return thumbnail;
    }

    public Album thumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
        return this;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
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

    public User getUser() {
        return user;
    }

    public Album user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
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

    public Set<LikeAlbum> getLikeAlbums() {
        return likeAlbums;
    }

    public Album likeAlbums(Set<LikeAlbum> likeAlbums) {
        this.likeAlbums = likeAlbums;
        return this;
    }

    public Album addLikeAlbum(LikeAlbum likeAlbum) {
        this.likeAlbums.add(likeAlbum);
        likeAlbum.setAlbum(this);
        return this;
    }

    public Album removeLikeAlbum(LikeAlbum likeAlbum) {
        this.likeAlbums.remove(likeAlbum);
        likeAlbum.setAlbum(null);
        return this;
    }

    public void setLikeAlbums(Set<LikeAlbum> likeAlbums) {
        this.likeAlbums = likeAlbums;
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
            ", year=" + getYear() +
            ", thumbnail='" + getThumbnail() + "'" +
            ", totalTracks=" + getTotalTracks() +
            "}";
    }
}
