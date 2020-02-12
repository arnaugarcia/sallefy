package com.sallefy.service.mapper;

import com.sallefy.domain.Playback;
import com.sallefy.service.dto.PlaybackDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {UserMapper.class, TrackMapper.class})
public interface PlaybackMapper extends EntityMapper<PlaybackDTO, Playback> {

    @Mapping(target = "time", source = "date")
    @Mapping(target = "client", source = "agent")
    PlaybackDTO toDto(Playback entity);
}
