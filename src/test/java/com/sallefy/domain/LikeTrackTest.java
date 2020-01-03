package com.sallefy.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.sallefy.web.rest.TestUtil;

public class LikeTrackTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LikeTrack.class);
        LikeTrack likeTrack1 = new LikeTrack();
        likeTrack1.setId(1L);
        LikeTrack likeTrack2 = new LikeTrack();
        likeTrack2.setId(likeTrack1.getId());
        assertThat(likeTrack1).isEqualTo(likeTrack2);
        likeTrack2.setId(2L);
        assertThat(likeTrack1).isNotEqualTo(likeTrack2);
        likeTrack1.setId(null);
        assertThat(likeTrack1).isNotEqualTo(likeTrack2);
    }
}
