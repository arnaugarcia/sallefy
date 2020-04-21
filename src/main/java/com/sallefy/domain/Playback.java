package com.sallefy.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.sallefy.domain.enumeration.AgentType;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * A Playback.
 */
@Entity
@Table(name = "playback")
public class Playback implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ip")
    private String ip;

    @Column(name = "latitude")
    private Double latitude;

    @Column(name = "longitude")
    private Double longitude;

    @Enumerated(EnumType.STRING)
    @Column(name = "agent")
    private AgentType agent;

    @CreationTimestamp
    @Column(name = "date")
    private LocalDateTime date;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("playbacks")
    private User user;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("playbacks")
    private Track track;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIp() {
        return ip;
    }

    public Playback ip(String ip) {
        this.ip = ip;
        return this;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public Double getLatitude() {
        return latitude;
    }

    public Playback latitude(Double latitude) {
        this.latitude = latitude;
        return this;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public Playback longitude(Double longitude) {
        this.longitude = longitude;
        return this;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public AgentType getAgent() {
        return agent;
    }

    public Playback agent(AgentType agent) {
        this.agent = agent;
        return this;
    }

    public void setAgent(AgentType agent) {
        this.agent = agent;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public Playback date(LocalDateTime date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public User getUser() {
        return user;
    }

    public Playback user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Track getTrack() {
        return track;
    }

    public Playback track(Track track) {
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
        if (!(o instanceof Playback)) {
            return false;
        }
        return id != null && id.equals(((Playback) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Playback{" +
            "id=" + getId() +
            ", ip='" + getIp() + "'" +
            ", latitude=" + getLatitude() +
            ", longitude=" + getLongitude() +
            ", agent='" + getAgent() + "'" +
            ", date='" + getDate() + "'" +
            "}";
    }
}
