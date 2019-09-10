package com.sallefy.service.mapper;

import com.sallefy.domain.*;
import com.sallefy.service.dto.LikeTrackDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link LikeTrack} and its DTO {@link LikeTrackDTO}.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, TrackMapper.class})
public interface LikeTrackMapper extends EntityMapper<LikeTrackDTO, LikeTrack> {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "user.login", target = "userLogin")
    @Mapping(source = "track.id", target = "trackId")
    @Mapping(source = "track.name", target = "trackName")
    LikeTrackDTO toDto(LikeTrack likeTrack);

    @Mapping(source = "userId", target = "user")
    @Mapping(source = "trackId", target = "track")
    LikeTrack toEntity(LikeTrackDTO likeTrackDTO);

    default LikeTrack fromId(Long id) {
        if (id == null) {
            return null;
        }
        LikeTrack likeTrack = new LikeTrack();
        likeTrack.setId(id);
        return likeTrack;
    }
}
