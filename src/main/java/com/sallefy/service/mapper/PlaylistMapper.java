package com.sallefy.service.mapper;

import com.sallefy.domain.*;
import com.sallefy.service.dto.PlaylistDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Playlist} and its DTO {@link PlaylistDTO}.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, TrackMapper.class})
public interface PlaylistMapper extends EntityMapper<PlaylistDTO, Playlist> {

    @Mapping(source = "user", target = "owner")
    PlaylistDTO toDto(Playlist playlist);

    @Mapping(source = "owner", target = "user")
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
