package com.sallefy.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;

/**
 * A FollowUser.
 */
@Entity
@Table(name = "follow_user", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"user_id", "followed_id"})
})
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class FollowUser implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreationTimestamp
    @Column(name = "date")
    private ZonedDateTime date;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("followUsers")
    private User followed;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("followUsers")
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getDate() {
        return date;
    }

    public FollowUser date(ZonedDateTime date) {
        this.date = date;
        return this;
    }

    public void setDate(ZonedDateTime date) {
        this.date = date;
    }

    public User getFollowed() {
        return followed;
    }

    public FollowUser followed(User user) {
        this.followed = user;
        return this;
    }

    public void setFollowed(User user) {
        this.followed = user;
    }

    public User getUser() {
        return user;
    }

    public FollowUser user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof FollowUser)) {
            return false;
        }
        return id != null && id.equals(((FollowUser) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "FollowUser{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            "}";
    }
}
