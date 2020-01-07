package com.sallefy.service.mapper;

import com.sallefy.domain.LikeAlbum;
import com.sallefy.service.dto.LikeAlbumDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * Mapper for the entity {@link LikeAlbum} and its DTO {@link LikeAlbumDTO}.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, AlbumMapper.class})
public interface LikeAlbumMapper extends EntityMapper<LikeAlbumDTO, LikeAlbum> {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "user.login", target = "userLogin")
    @Mapping(source = "album.id", target = "albumId")
    @Mapping(source = "album.title", target = "albumTitle")
    LikeAlbumDTO toDto(LikeAlbum likeAlbum);

    @Mapping(source = "userId", target = "user")
    @Mapping(source = "albumId", target = "album")
    LikeAlbum toEntity(LikeAlbumDTO likeAlbumDTO);

    default LikeAlbum fromId(Long id) {
        if (id == null) {
            return null;
        }
        LikeAlbum likeAlbum = new LikeAlbum();
        likeAlbum.setId(id);
        return likeAlbum;
    }
}
