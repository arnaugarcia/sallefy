package com.sallefy.service.dto;
import java.time.ZonedDateTime;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.sallefy.domain.FollowUser} entity.
 */
public class FollowUserDTO implements Serializable {

    private Long id;

    private Boolean liked;

    private ZonedDateTime date;


    private Long followedId;

    private String followedLogin;

    private Long userId;

    private String userLogin;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isLiked() {
        return liked;
    }

    public void setLiked(Boolean liked) {
        this.liked = liked;
    }

    public ZonedDateTime getDate() {
        return date;
    }

    public void setDate(ZonedDateTime date) {
        this.date = date;
    }

    public Long getFollowedId() {
        return followedId;
    }

    public void setFollowedId(Long userId) {
        this.followedId = userId;
    }

    public String getFollowedLogin() {
        return followedLogin;
    }

    public void setFollowedLogin(String userLogin) {
        this.followedLogin = userLogin;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserLogin() {
        return userLogin;
    }

    public void setUserLogin(String userLogin) {
        this.userLogin = userLogin;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        FollowUserDTO followUserDTO = (FollowUserDTO) o;
        if (followUserDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), followUserDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FollowUserDTO{" +
            "id=" + getId() +
            ", liked='" + isLiked() + "'" +
            ", date='" + getDate() + "'" +
            ", followed=" + getFollowedId() +
            ", followed='" + getFollowedLogin() + "'" +
            ", user=" + getUserId() +
            ", user='" + getUserLogin() + "'" +
            "}";
    }
}
