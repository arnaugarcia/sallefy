package com.sallefy.service.mapper;

import com.sallefy.domain.*;
import com.sallefy.service.dto.LikeUserDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link LikeUser} and its DTO {@link LikeUserDTO}.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface LikeUserMapper extends EntityMapper<LikeUserDTO, LikeUser> {

    @Mapping(source = "likedUser.id", target = "likedUserId")
    @Mapping(source = "likedUser.login", target = "likedUserLogin")
    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "user.login", target = "userLogin")
    LikeUserDTO toDto(LikeUser likeUser);

    @Mapping(source = "likedUserId", target = "likedUser")
    @Mapping(source = "userId", target = "user")
    LikeUser toEntity(LikeUserDTO likeUserDTO);

    default LikeUser fromId(Long id) {
        if (id == null) {
            return null;
        }
        LikeUser likeUser = new LikeUser();
        likeUser.setId(id);
        return likeUser;
    }
}
