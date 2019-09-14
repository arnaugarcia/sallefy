package com.sallefy.service.mapper;

import com.sallefy.domain.*;
import com.sallefy.service.dto.PlaybackDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Playback} and its DTO {@link PlaybackDTO}.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, TrackMapper.class})
public interface PlaybackMapper extends EntityMapper<PlaybackDTO, Playback> {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "user.login", target = "userLogin")
    @Mapping(source = "track.id", target = "trackId")
    @Mapping(source = "track.name", target = "trackName")
    PlaybackDTO toDto(Playback playback);

    @Mapping(source = "userId", target = "user")
    @Mapping(source = "trackId", target = "track")
    Playback toEntity(PlaybackDTO playbackDTO);

    default Playback fromId(Long id) {
        if (id == null) {
            return null;
        }
        Playback playback = new Playback();
        playback.setId(id);
        return playback;
    }
}
