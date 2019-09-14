package com.sallefy.service.mapper;

import com.sallefy.domain.*;
import com.sallefy.service.dto.GenreDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Genre} and its DTO {@link GenreDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface GenreMapper extends EntityMapper<GenreDTO, Genre> {


    @Mapping(target = "tracks", ignore = true)
    @Mapping(target = "removeTrack", ignore = true)
    Genre toEntity(GenreDTO genreDTO);

    default Genre fromId(Long id) {
        if (id == null) {
            return null;
        }
        Genre genre = new Genre();
        genre.setId(id);
        return genre;
    }
}
