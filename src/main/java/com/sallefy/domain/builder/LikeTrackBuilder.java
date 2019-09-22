package com.sallefy.domain.builder;

import com.sallefy.domain.LikeTrack;
import com.sallefy.domain.Track;
import com.sallefy.domain.User;

public class LikeTrackBuilder {

    private Boolean liked;
    private User user;
    private Track track;

    public static LikeTrackBuilder aLikeTrack() {
        return new LikeTrackBuilder();
    }

    public LikeTrackBuilder isLiked(Boolean liked) {
        this.liked = liked;
        return this;
    }

    public LikeTrackBuilder withUser(User user) {
        this.user = user;
        return this;
    }

    public LikeTrackBuilder withTrack(Track track) {
        this.track = track;
        return this;
    }

    public LikeTrack build() {
        return new LikeTrack(liked, user, track);
    }
}
