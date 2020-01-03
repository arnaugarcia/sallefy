package com.sallefy.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.sallefy.web.rest.TestUtil;

public class GenreDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(GenreDTO.class);
        GenreDTO genreDTO1 = new GenreDTO();
        genreDTO1.setId(1L);
        GenreDTO genreDTO2 = new GenreDTO();
        assertThat(genreDTO1).isNotEqualTo(genreDTO2);
        genreDTO2.setId(genreDTO1.getId());
        assertThat(genreDTO1).isEqualTo(genreDTO2);
        genreDTO2.setId(2L);
        assertThat(genreDTO1).isNotEqualTo(genreDTO2);
        genreDTO1.setId(null);
        assertThat(genreDTO1).isNotEqualTo(genreDTO2);
    }
}
