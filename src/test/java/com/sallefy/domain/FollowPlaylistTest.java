package com.sallefy.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.sallefy.web.rest.TestUtil;

public class FollowPlaylistTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FollowPlaylist.class);
        FollowPlaylist followPlaylist1 = new FollowPlaylist();
        followPlaylist1.setId(1L);
        FollowPlaylist followPlaylist2 = new FollowPlaylist();
        followPlaylist2.setId(followPlaylist1.getId());
        assertThat(followPlaylist1).isEqualTo(followPlaylist2);
        followPlaylist2.setId(2L);
        assertThat(followPlaylist1).isNotEqualTo(followPlaylist2);
        followPlaylist1.setId(null);
        assertThat(followPlaylist1).isNotEqualTo(followPlaylist2);
    }
}
