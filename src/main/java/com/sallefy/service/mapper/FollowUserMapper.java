package com.sallefy.service.mapper;

import com.sallefy.domain.*;
import com.sallefy.service.dto.FollowUserDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link FollowUser} and its DTO {@link FollowUserDTO}.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface FollowUserMapper extends EntityMapper<FollowUserDTO, FollowUser> {

    @Mapping(source = "followed.id", target = "followedId")
    @Mapping(source = "followed.login", target = "followedLogin")
    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "user.login", target = "userLogin")
    FollowUserDTO toDto(FollowUser followUser);

    @Mapping(source = "followedId", target = "followed")
    @Mapping(source = "userId", target = "user")
    FollowUser toEntity(FollowUserDTO followUserDTO);

    default FollowUser fromId(Long id) {
        if (id == null) {
            return null;
        }
        FollowUser followUser = new FollowUser();
        followUser.setId(id);
        return followUser;
    }
}
