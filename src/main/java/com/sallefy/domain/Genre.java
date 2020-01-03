package com.sallefy.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Genre.
 */
@Entity
@Table(name = "genre")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Genre implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "popularity")
    private Integer popularity;

    @ManyToMany(mappedBy = "genres")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Track> tracks = new HashSet<>();

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

    public Genre name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getPopularity() {
        return popularity;
    }

    public Genre popularity(Integer popularity) {
        this.popularity = popularity;
        return this;
    }

    public void setPopularity(Integer popularity) {
        this.popularity = popularity;
    }

    public Set<Track> getTracks() {
        return tracks;
    }

    public Genre tracks(Set<Track> tracks) {
        this.tracks = tracks;
        return this;
    }

    public Genre addTrack(Track track) {
        this.tracks.add(track);
        track.getGenres().add(this);
        return this;
    }

    public Genre removeTrack(Track track) {
        this.tracks.remove(track);
        track.getGenres().remove(this);
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
        if (!(o instanceof Genre)) {
            return false;
        }
        return id != null && id.equals(((Genre) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Genre{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", popularity=" + getPopularity() +
            "}";
    }
}
