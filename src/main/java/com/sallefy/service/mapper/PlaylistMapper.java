package com.sallefy.service.mapper;

import com.sallefy.domain.*;
import com.sallefy.service.dto.PlaylistDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Playlist} and its DTO {@link PlaylistDTO}.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface PlaylistMapper extends EntityMapper<PlaylistDTO, Playlist> {

    @Mapping(source = "owner.id", target = "ownerId")
    @Mapping(source = "owner.login", target = "ownerLogin")
    PlaylistDTO toDto(Playlist playlist);

    @Mapping(target = "images", ignore = true)
    @Mapping(target = "removeImages", ignore = true)
    @Mapping(source = "ownerId", target = "owner")
    @Mapping(target = "tracks", ignore = true)
    @Mapping(target = "removeTrack", ignore = true)
    Playlist toEntity(PlaylistDTO playlistDTO);

    default Playlist fromId(Long id) {
        if (id == null) {
            return null;
        }
        Playlist playlist = new Playlist();
        playlist.setId(id);
        return playlist;
    }
}
