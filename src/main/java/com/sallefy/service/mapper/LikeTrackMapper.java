package com.sallefy.service.mapper;

import com.sallefy.domain.LikeTrack;
import com.sallefy.service.dto.LikeDTO;
import org.mapstruct.Mapper;

/**
 * Mapper for the entity {@link LikeTrack} and its DTO {@link LikeDTO}.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, TrackMapper.class})
public interface LikeTrackMapper extends EntityMapper<LikeDTO, LikeTrack> {

    LikeDTO toDto(LikeTrack likeTrack);

}
