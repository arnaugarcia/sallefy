package com.sallefy.domain;

import com.sallefy.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class GenreTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Genre.class);
        Genre genre1 = new Genre();
        genre1.setId(1L);
        Genre genre2 = new Genre();
        genre2.setId(genre1.getId());
        assertThat(genre1).isEqualTo(genre2);
        genre2.setId(2L);
        assertThat(genre1).isNotEqualTo(genre2);
        genre1.setId(null);
        assertThat(genre1).isNotEqualTo(genre2);
    }
}
