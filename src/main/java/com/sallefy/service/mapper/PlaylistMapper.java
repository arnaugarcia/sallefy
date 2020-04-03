package com.sallefy.service.mapper;

import com.sallefy.domain.FollowPlaylist;
import com.sallefy.domain.Playlist;
import com.sallefy.security.SecurityUtils;
import com.sallefy.service.dto.PlaylistDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.Optional;
import java.util.Set;

/**
 * Mapper for the entity {@link Playlist} and its DTO {@link PlaylistDTO}.o
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, TrackMapper.class, })
public interface PlaylistMapper extends EntityMapper<PlaylistDTO, Playlist> {

    @Mapping(source = "followers", target = "followed")
    @Mapping(source = "followers", target = "followers")
    @Mapping(source = "user", target = "owner")
    PlaylistDTO toDto(Playlist playlist);

    @Mapping(target = "followers", ignore = true)
    @Mapping(target = "created", ignore = true)
    @Mapping(target = "primaryColor", ignore = true)
    @Mapping(target = "rating", ignore = true)
    @Mapping(target = "numberSongs", ignore = true)
    @Mapping(target = "collaborative", ignore = true)
    @Mapping(source = "owner", target = "user")
    @Mapping(target = "removeTrack", ignore = true)
    Playlist toEntity(PlaylistDTO playlistDTO);

    default Boolean map(Set<FollowPlaylist> followPlaylists) {
        final Optional<String> currentUserLogin = SecurityUtils.getCurrentUserLogin();
        if (!currentUserLogin.isPresent()) {
            return false;
        }

        return followPlaylists.stream()
            .anyMatch(
                likeTrack -> likeTrack
                    .getUser()
                    .getLogin()
                    .equals(currentUserLogin.get())
            );
    }

    default Integer mapFollowers(Set<FollowPlaylist> followPlaylists) {
        return followPlaylists.size();
    }

    default Playlist fromId(Long id) {
        if (id == null) {
            return null;
        }
        Playlist playlist = new Playlist();
        playlist.setId(id);
        return playlist;
    }
}
