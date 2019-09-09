package com.sallefy.service.mapper;

import com.sallefy.domain.*;
import com.sallefy.service.dto.ImageDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Image} and its DTO {@link ImageDTO}.
 */
@Mapper(componentModel = "spring", uses = {AlbumMapper.class, ArtistMapper.class, PlaylistMapper.class, TrackMapper.class})
public interface ImageMapper extends EntityMapper<ImageDTO, Image> {

    @Mapping(source = "album.id", target = "albumId")
    @Mapping(source = "album.title", target = "albumTitle")
    @Mapping(source = "artist.id", target = "artistId")
    @Mapping(source = "artist.name", target = "artistName")
    @Mapping(source = "playlist.id", target = "playlistId")
    @Mapping(source = "playlist.name", target = "playlistName")
    @Mapping(source = "track.id", target = "trackId")
    @Mapping(source = "track.name", target = "trackName")
    ImageDTO toDto(Image image);

    @Mapping(source = "albumId", target = "album")
    @Mapping(source = "artistId", target = "artist")
    @Mapping(source = "playlistId", target = "playlist")
    @Mapping(source = "trackId", target = "track")
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
