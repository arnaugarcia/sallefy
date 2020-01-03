package com.sallefy.service.dto;

import com.sallefy.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class LikeAlbumDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(LikeAlbumDTO.class);
        LikeAlbumDTO likeAlbumDTO1 = new LikeAlbumDTO();
        likeAlbumDTO1.setId(1L);
        LikeAlbumDTO likeAlbumDTO2 = new LikeAlbumDTO();
        assertThat(likeAlbumDTO1).isNotEqualTo(likeAlbumDTO2);
        likeAlbumDTO2.setId(likeAlbumDTO1.getId());
        assertThat(likeAlbumDTO1).isEqualTo(likeAlbumDTO2);
        likeAlbumDTO2.setId(2L);
        assertThat(likeAlbumDTO1).isNotEqualTo(likeAlbumDTO2);
        likeAlbumDTO1.setId(null);
        assertThat(likeAlbumDTO1).isNotEqualTo(likeAlbumDTO2);
    }
}
