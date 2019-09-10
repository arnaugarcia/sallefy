package com.sallefy.service.mapper;

import com.sallefy.domain.*;
import com.sallefy.service.dto.ImageDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Image} and its DTO {@link ImageDTO}.
 */
@Mapper(componentModel = "spring", uses = {TrackMapper.class, PlaylistMapper.class, ArtistMapper.class, AlbumMapper.class})
public interface ImageMapper extends EntityMapper<ImageDTO, Image> {

    @Mapping(source = "track.id", target = "trackId")
    @Mapping(source = "playlist.id", target = "playlistId")
    @Mapping(source = "artist.id", target = "artistId")
    @Mapping(source = "album.id", target = "albumId")
    ImageDTO toDto(Image image);

    @Mapping(source = "trackId", target = "track")
    @Mapping(source = "playlistId", target = "playlist")
    @Mapping(source = "artistId", target = "artist")
    @Mapping(source = "albumId", target = "album")
    Image toEntity(ImageDTO imageDTO);

    default Image fromId(Long id) {
        if (id == null) {
            return null;
        }
        Image image = new Image();
        image.setId(id);
        return image;
    }
}
