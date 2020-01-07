package com.sallefy.domain;

import com.sallefy.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class LikeAlbumTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LikeAlbum.class);
        LikeAlbum likeAlbum1 = new LikeAlbum();
        likeAlbum1.setId(1L);
        LikeAlbum likeAlbum2 = new LikeAlbum();
        likeAlbum2.setId(likeAlbum1.getId());
        assertThat(likeAlbum1).isEqualTo(likeAlbum2);
        likeAlbum2.setId(2L);
        assertThat(likeAlbum1).isNotEqualTo(likeAlbum2);
        likeAlbum1.setId(null);
        assertThat(likeAlbum1).isNotEqualTo(likeAlbum2);
    }
}
