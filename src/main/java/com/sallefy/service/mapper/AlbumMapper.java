package com.sallefy.service.mapper;

import com.sallefy.domain.*;
import com.sallefy.service.dto.AlbumDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Album} and its DTO {@link AlbumDTO}.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, TrackMapper.class})
public interface AlbumMapper extends EntityMapper<AlbumDTO, Album> {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "user.login", target = "userLogin")
    AlbumDTO toDto(Album album);

    @Mapping(target = "likeAlbums", ignore = true)
    @Mapping(target = "removeLikeAlbum", ignore = true)
    @Mapping(source = "userId", target = "user")
    @Mapping(target = "removeTrack", ignore = true)
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
