package com.sallefy.service.impl;

import com.sallefy.domain.FollowPlaylist;
import com.sallefy.domain.FollowUser;
import com.sallefy.domain.User;
import com.sallefy.repository.FollowPlaylistRepository;
import com.sallefy.repository.FollowUserRepository;
import com.sallefy.repository.PlaylistRepository;
import com.sallefy.service.FollowService;
import com.sallefy.service.UserService;
import com.sallefy.service.dto.FollowDTO;
import com.sallefy.service.dto.UserDTO;
import com.sallefy.service.exception.BadFollowerException;
import com.sallefy.service.exception.PlaylistNotFoundException;
import com.sallefy.service.exception.UserNotFoundException;
import com.sallefy.service.mapper.PlaylistMapper;
import com.sallefy.service.mapper.UserMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FollowServiceImpl implements FollowService {

    private final UserService userService;

    private final PlaylistRepository playlistRepository;

    private final PlaylistMapper playlistMapper;

    private final FollowPlaylistRepository followPlaylistRepository;

    private final FollowUserRepository followUserRepository;
    private final UserMapper userMapper;

    public FollowServiceImpl(UserService userService,
                             PlaylistRepository playlistRepository,
                             PlaylistMapper playlistMapper,
                             FollowPlaylistRepository followPlaylistRepository,
                             FollowUserRepository followUserRepository,
                             UserMapper userMapper) {
        this.userService = userService;
        this.playlistRepository = playlistRepository;
        this.playlistMapper = playlistMapper;
        this.followPlaylistRepository = followPlaylistRepository;
        this.followUserRepository = followUserRepository;
        this.userMapper = userMapper;
    }

    @Override
    public FollowDTO toggleFollowPlaylist(Long playlistId) {
        final User currentUser = userService.getUserWithAuthorities();

        checkIfPlaylistExists(playlistId);

        final Optional<FollowPlaylist> followedPlaylist = followPlaylistRepository.findByPlaylistAndCurrentUser(playlistId);

        FollowDTO followDTO = new FollowDTO();


        if (followedPlaylist.isPresent()) {
            followPlaylistRepository.delete(followedPlaylist.get());
            followDTO.setFollowed(false);
        } else {
            FollowPlaylist followPlaylist = new FollowPlaylist();
            followPlaylist.setUser(currentUser);
            followPlaylist.setPlaylist(playlistMapper.fromId(playlistId));
            followPlaylistRepository.save(followPlaylist);
            followDTO.setFollowed(true);
        }


        return followDTO;
    }

    @Override
    public FollowDTO toggleFollowUser(String login) {
        final User currentUser = userService.getUserWithAuthorities();

        User userToFollow = userService.getUserWithAuthoritiesByLogin(login)
            .orElseThrow(UserNotFoundException::new);

        checkIfFollowUserIsTheCurrentUser(currentUser, userToFollow);

        FollowDTO followDTO = new FollowDTO();

        final Optional<FollowUser> followedUser = followUserRepository.findIfFollowedUserIsFollowedByCurrentUser(login);

        if (followedUser.isPresent()) {
            followUserRepository.delete(followedUser.get());
            followDTO.setFollowed(false);
        } else {
            FollowUser followUser = new FollowUser();
            followUser.setUser(currentUser);
            followUser.setFollowed(userToFollow);
            followUserRepository.save(followUser);
            followDTO.setFollowed(true);
        }

        return followDTO;
    }

    private void checkIfFollowUserIsTheCurrentUser(User currentUser, User userToFollow) {
        if (currentUser.getLogin().equals(userToFollow.getLogin())) {
            throw new BadFollowerException();
        }
    }

    @Override
    public void deleteFollowersByPlaylist(Long playlistId) {
        checkIfPlaylistExists(playlistId);
        followPlaylistRepository.deleteByPlaylistId(playlistId);
    }

    @Override
    @Transactional
    public List<UserDTO> findFollowersOfCurrentUser() {
        final User currentUser = userService.getUserWithAuthorities();

        return followUserRepository.findFollowersByCurrentUser()
            .stream()
            .map(userMapper::userToUserDTO)
            .collect(Collectors.toList());

    }

    private void checkIfPlaylistExists(Long playlistId) {
        playlistRepository.findById(playlistId)
            .orElseThrow(PlaylistNotFoundException::new);
    }

}
