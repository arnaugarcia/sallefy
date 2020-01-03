package com.sallefy.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.sallefy.web.rest.TestUtil;

public class PlaybackTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Playback.class);
        Playback playback1 = new Playback();
        playback1.setId(1L);
        Playback playback2 = new Playback();
        playback2.setId(playback1.getId());
        assertThat(playback1).isEqualTo(playback2);
        playback2.setId(2L);
        assertThat(playback1).isNotEqualTo(playback2);
        playback1.setId(null);
        assertThat(playback1).isNotEqualTo(playback2);
    }
}
