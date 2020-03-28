package com.sallefy.service.mapper;

import com.sallefy.domain.Track;
import com.sallefy.service.dto.TrackDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * Mapper for the entity {@link Track} and its DTO {@link TrackDTO}.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, GenreMapper.class})
public interface TrackMapper extends EntityMapper<TrackDTO, Track> {

    @Mapping(source = "user", target = "owner")
    TrackDTO toDto(Track track);

    @Mapping(target = "user", source = "owner")
    @Mapping(target = "rating", ignore = true)
    @Mapping(target = "popularity", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "removeGenre", ignore = true)
    Track toEntity(TrackDTO trackDTO);

    default Track fromId(Long id) {
        if (id == null) {
            return null;
        }
        Track track = new Track();
        track.setId(id);
        return track;
    }
}
