package com.sallefy.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.sallefy.web.rest.TestUtil;

public class TrackTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Track.class);
        Track track1 = new Track();
        track1.setId(1L);
        Track track2 = new Track();
        track2.setId(track1.getId());
        assertThat(track1).isEqualTo(track2);
        track2.setId(2L);
        assertThat(track1).isNotEqualTo(track2);
        track1.setId(null);
        assertThat(track1).isNotEqualTo(track2);
    }
}
