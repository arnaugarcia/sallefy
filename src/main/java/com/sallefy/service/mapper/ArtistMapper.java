package com.sallefy.service.mapper;

import com.sallefy.domain.*;
import com.sallefy.service.dto.ArtistDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Artist} and its DTO {@link ArtistDTO}.
 */
@Mapper(componentModel = "spring", uses = {AlbumMapper.class})
public interface ArtistMapper extends EntityMapper<ArtistDTO, Artist> {

    @Mapping(source = "album.id", target = "albumId")
    @Mapping(source = "album.title", target = "albumTitle")
    ArtistDTO toDto(Artist artist);

    @Mapping(target = "images", ignore = true)
    @Mapping(target = "removeImages", ignore = true)
    @Mapping(source = "albumId", target = "album")
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
