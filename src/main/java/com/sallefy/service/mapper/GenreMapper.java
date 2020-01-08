package com.sallefy.service.mapper;

import com.sallefy.domain.Genre;
import com.sallefy.service.dto.GenreDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * Mapper for the entity {@link Genre} and its DTO {@link GenreDTO}.
 */
@Mapper(componentModel = "spring")
public interface GenreMapper extends EntityMapper<GenreDTO, Genre> {

    @Mapping(target = "popularity", ignore = true)
    @Mapping(target = "tracks", ignore = true)
    @Mapping(target = "removeTrack", ignore = true)
    Genre toEntity(GenreDTO genreDTO);

    GenreDTO toDto(Genre genre);

    default Genre fromId(Long id) {
        if (id == null) {
            return null;
        }
        Genre genre = new Genre();
        genre.setId(id);
        return genre;
    }
}
