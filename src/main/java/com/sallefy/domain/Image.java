package com.sallefy.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Image.
 */
@Entity
@Table(name = "image")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Image implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "url")
    private String url;

    @Column(name = "height")
    private Integer height;

    @Column(name = "reference")
    private String reference;

    @Column(name = "thumbnail")
    private Boolean thumbnail;

    @Column(name = "cover")
    private Boolean cover;

    @Column(name = "width")
    private Integer width;

    @ManyToOne
    @JsonIgnoreProperties("images")
    private Album album;

    @ManyToOne
    @JsonIgnoreProperties("images")
    private Artist artist;

    @ManyToOne
    @JsonIgnoreProperties("images")
    private Playlist playlist;

    @ManyToOne
    @JsonIgnoreProperties("images")
    private Track track;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public Image url(String url) {
        this.url = url;
        return this;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Integer getHeight() {
        return height;
    }

    public Image height(Integer height) {
        this.height = height;
        return this;
    }

    public void setHeight(Integer height) {
        this.height = height;
    }

    public String getReference() {
        return reference;
    }

    public Image reference(String reference) {
        this.reference = reference;
        return this;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public Boolean isThumbnail() {
        return thumbnail;
    }

    public Image thumbnail(Boolean thumbnail) {
        this.thumbnail = thumbnail;
        return this;
    }

    public void setThumbnail(Boolean thumbnail) {
        this.thumbnail = thumbnail;
    }

    public Boolean isCover() {
        return cover;
    }

    public Image cover(Boolean cover) {
        this.cover = cover;
        return this;
    }

    public void setCover(Boolean cover) {
        this.cover = cover;
    }

    public Integer getWidth() {
        return width;
    }

    public Image width(Integer width) {
        this.width = width;
        return this;
    }

    public void setWidth(Integer width) {
        this.width = width;
    }

    public Album getAlbum() {
        return album;
    }

    public Image album(Album album) {
        this.album = album;
        return this;
    }

    public void setAlbum(Album album) {
        this.album = album;
    }

    public Artist getArtist() {
        return artist;
    }

    public Image artist(Artist artist) {
        this.artist = artist;
        return this;
    }

    public void setArtist(Artist artist) {
        this.artist = artist;
    }

    public Playlist getPlaylist() {
        return playlist;
    }

    public Image playlist(Playlist playlist) {
        this.playlist = playlist;
        return this;
    }

    public void setPlaylist(Playlist playlist) {
        this.playlist = playlist;
    }

    public Track getTrack() {
        return track;
    }

    public Image track(Track track) {
        this.track = track;
        return this;
    }

    public void setTrack(Track track) {
        this.track = track;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Image)) {
            return false;
        }
        return id != null && id.equals(((Image) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Image{" +
            "id=" + getId() +
            ", url='" + getUrl() + "'" +
            ", height=" + getHeight() +
            ", reference='" + getReference() + "'" +
            ", thumbnail='" + isThumbnail() + "'" +
            ", cover='" + isCover() + "'" +
            ", width=" + getWidth() +
            "}";
    }
}
