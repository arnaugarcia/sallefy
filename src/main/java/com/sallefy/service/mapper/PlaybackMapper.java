package com.sallefy.service.mapper;

import com.sallefy.domain.Playback;
import com.sallefy.service.dto.PlaybackDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {UserMapper.class, TrackMapper.class})
public interface PlaybackMapper extends EntityMapper<PlaybackDTO, Playback> {
}
