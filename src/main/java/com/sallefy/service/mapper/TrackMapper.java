package com.sallefy.service.mapper;

import com.sallefy.domain.*;
import com.sallefy.service.dto.TrackDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Track} and its DTO {@link TrackDTO}.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, GenreMapper.class})
public interface TrackMapper extends EntityMapper<TrackDTO, Track> {

    @Mapping(source = "user", target = "owner")
    TrackDTO toDto(Track track);

    @Mapping(target = "user", ignore = true)
    @Mapping(target = "rating", ignore = true)
    @Mapping(target = "popularity", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "removeGenre", ignore = true)
    @Mapping(target = "playbacks", ignore = true)
    @Mapping(target = "removePlayback", ignore = true)
    @Mapping(target = "likeTracks", ignore = true)
    @Mapping(target = "removeLikeTrack", ignore = true)
    @Mapping(target = "playlists", ignore = true)
    @Mapping(target = "removePlaylist", ignore = true)
    @Mapping(target = "albums", ignore = true)
    @Mapping(target = "removeAlbum", ignore = true)
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
