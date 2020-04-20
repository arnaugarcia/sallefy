package com.sallefy.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.ZonedDateTime;

/**
 * A LikeAlbum.
 */
@Entity
@Table(name = "like_album", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"user_id", "album_id"})
})
public class LikeAlbum implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "liked")
    private Boolean liked;

    @Column(name = "date")
    private ZonedDateTime date;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("likeAlbums")
    private User user;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("likeAlbums")
    private Album album;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isLiked() {
        return liked;
    }

    public LikeAlbum liked(Boolean liked) {
        this.liked = liked;
        return this;
    }

    public void setLiked(Boolean liked) {
        this.liked = liked;
    }

    public ZonedDateTime getDate() {
        return date;
    }

    public LikeAlbum date(ZonedDateTime date) {
        this.date = date;
        return this;
    }

    public void setDate(ZonedDateTime date) {
        this.date = date;
    }

    public User getUser() {
        return user;
    }

    public LikeAlbum user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Album getAlbum() {
        return album;
    }

    public LikeAlbum album(Album album) {
        this.album = album;
        return this;
    }

    public void setAlbum(Album album) {
        this.album = album;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LikeAlbum)) {
            return false;
        }
        return id != null && id.equals(((LikeAlbum) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "LikeAlbum{" +
            "id=" + getId() +
            ", liked='" + isLiked() + "'" +
            ", date='" + getDate() + "'" +
            "}";
    }
}
