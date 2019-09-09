package com.sallefy.service.mapper;

import com.sallefy.domain.*;
import com.sallefy.service.dto.AlbumDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Album} and its DTO {@link AlbumDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface AlbumMapper extends EntityMapper<AlbumDTO, Album> {


    @Mapping(target = "artists", ignore = true)
    @Mapping(target = "removeArtist", ignore = true)
    @Mapping(target = "images", ignore = true)
    @Mapping(target = "removeImages", ignore = true)
    Album toEntity(AlbumDTO albumDTO);

    default Album fromId(Long id) {
        if (id == null) {
            return null;
        }
        Album album = new Album();
        album.setId(id);
        return album;
    }
}
