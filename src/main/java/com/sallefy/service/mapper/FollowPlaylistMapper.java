package com.sallefy.service.mapper;

import com.sallefy.domain.*;
import com.sallefy.service.dto.FollowPlaylistDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link FollowPlaylist} and its DTO {@link FollowPlaylistDTO}.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, PlaylistMapper.class})
public interface FollowPlaylistMapper extends EntityMapper<FollowPlaylistDTO, FollowPlaylist> {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "user.login", target = "userLogin")
    @Mapping(source = "playlist.id", target = "playlistId")
    @Mapping(source = "playlist.name", target = "playlistName")
    FollowPlaylistDTO toDto(FollowPlaylist followPlaylist);

    @Mapping(source = "userId", target = "user")
    @Mapping(source = "playlistId", target = "playlist")
    FollowPlaylist toEntity(FollowPlaylistDTO followPlaylistDTO);

    default FollowPlaylist fromId(Long id) {
        if (id == null) {
            return null;
        }
        FollowPlaylist followPlaylist = new FollowPlaylist();
        followPlaylist.setId(id);
        return followPlaylist;
    }
}
