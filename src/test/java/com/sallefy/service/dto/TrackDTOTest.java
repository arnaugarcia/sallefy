package com.sallefy.service.dto;

import com.sallefy.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class TrackDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TrackDTO.class);
        TrackDTO trackDTO1 = new TrackDTO();
        trackDTO1.setId(1L);
        TrackDTO trackDTO2 = new TrackDTO();
        assertThat(trackDTO1).isNotEqualTo(trackDTO2);
        trackDTO2.setId(trackDTO1.getId());
        assertThat(trackDTO1).isEqualTo(trackDTO2);
        trackDTO2.setId(2L);
        assertThat(trackDTO1).isNotEqualTo(trackDTO2);
        trackDTO1.setId(null);
        assertThat(trackDTO1).isNotEqualTo(trackDTO2);
    }
}
