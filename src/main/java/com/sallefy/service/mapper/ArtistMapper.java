package com.sallefy.service.mapper;

import com.sallefy.domain.*;
import com.sallefy.service.dto.ArtistDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Artist} and its DTO {@link ArtistDTO}.
 */
@Mapper(componentModel = "spring", uses = {GenreMapper.class})
public interface ArtistMapper extends EntityMapper<ArtistDTO, Artist> {


    @Mapping(target = "images", ignore = true)
    @Mapping(target = "removeImages", ignore = true)
    @Mapping(target = "removeGenre", ignore = true)
    Artist toEntity(ArtistDTO artistDTO);

    default Artist fromId(Long id) {
        if (id == null) {
            return null;
        }
        Artist artist = new Artist();
        artist.setId(id);
        return artist;
    }
}
