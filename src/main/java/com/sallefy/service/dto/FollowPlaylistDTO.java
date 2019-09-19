package com.sallefy.service.dto;
import java.time.ZonedDateTime;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.sallefy.domain.FollowPlaylist} entity.
 */
public class FollowPlaylistDTO implements Serializable {

    private Long id;

    private ZonedDateTime date;


    private Long userId;

    private String userLogin;

    private Long playlistId;

    private String playlistName;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getDate() {
        return date;
    }

    public void setDate(ZonedDateTime date) {
        this.date = date;
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

    public Long getPlaylistId() {
        return playlistId;
    }

    public void setPlaylistId(Long playlistId) {
        this.playlistId = playlistId;
    }

    public String getPlaylistName() {
        return playlistName;
    }

    public void setPlaylistName(String playlistName) {
        this.playlistName = playlistName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        FollowPlaylistDTO followPlaylistDTO = (FollowPlaylistDTO) o;
        if (followPlaylistDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), followPlaylistDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FollowPlaylistDTO{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", user=" + getUserId() +
            ", user='" + getUserLogin() + "'" +
            ", playlist=" + getPlaylistId() +
            ", playlist='" + getPlaylistName() + "'" +
            "}";
    }
}
