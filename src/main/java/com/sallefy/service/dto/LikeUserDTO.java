package com.sallefy.service.dto;
import java.time.ZonedDateTime;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.sallefy.domain.LikeUser} entity.
 */
public class LikeUserDTO implements Serializable {

    private Long id;

    private Boolean liked;

    private ZonedDateTime date;


    private Long likedUserId;

    private String likedUserLogin;

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

    public Long getLikedUserId() {
        return likedUserId;
    }

    public void setLikedUserId(Long userId) {
        this.likedUserId = userId;
    }

    public String getLikedUserLogin() {
        return likedUserLogin;
    }

    public void setLikedUserLogin(String userLogin) {
        this.likedUserLogin = userLogin;
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

        LikeUserDTO likeUserDTO = (LikeUserDTO) o;
        if (likeUserDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), likeUserDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "LikeUserDTO{" +
            "id=" + getId() +
            ", liked='" + isLiked() + "'" +
            ", date='" + getDate() + "'" +
            ", likedUser=" + getLikedUserId() +
            ", likedUser='" + getLikedUserLogin() + "'" +
            ", user=" + getUserId() +
            ", user='" + getUserLogin() + "'" +
            "}";
    }
}
