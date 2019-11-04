package com.sallefy.service.dto;

import java.io.Serializable;

public class SearchDTO implements Serializable {

    private PlaylistDTO playlists;

    private UserSimplifyedDTO users;

    private TrackDTO tracks;

    public PlaylistDTO getPlaylists() {
        return playlists;
    }

    public void setPlaylists(PlaylistDTO playlists) {
        this.playlists = playlists;
    }

    public UserSimplifyedDTO getUsers() {
        return users;
    }

    public void setUsers(UserSimplifyedDTO users) {
        this.users = users;
    }

    public TrackDTO getTracks() {
        return tracks;
    }

    public void setTracks(TrackDTO tracks) {
        this.tracks = tracks;
    }

    @Override
    public String toString() {
        return "SearchDTO{" +
            "playlists=" + playlists +
            ", users=" + users +
            ", tracks=" + tracks +
            '}';
    }
}
