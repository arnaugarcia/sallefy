package com.sallefy.service.impl;

import com.sallefy.domain.FollowPlaylist;
import com.sallefy.domain.User;
import com.sallefy.repository.FollowPlaylistRepository;
import com.sallefy.repository.PlaylistRepository;
import com.sallefy.service.FollowService;
import com.sallefy.service.UserService;
import com.sallefy.service.dto.FollowDTO;
import com.sallefy.service.exception.PlaylistNotFound;
import com.sallefy.service.mapper.PlaylistMapper;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class FollowServiceImpl implements FollowService {

    private final UserService userService;

    private final PlaylistRepository playlistRepository;

    private final PlaylistMapper playlistMapper;

    private final FollowPlaylistRepository followPlaylistRepository;

    public FollowServiceImpl(UserService userService,
                             PlaylistRepository playlistRepository,
                             PlaylistMapper playlistMapper,
                             FollowPlaylistRepository followPlaylistRepository) {
        this.userService = userService;
        this.playlistRepository = playlistRepository;
        this.playlistMapper = playlistMapper;
        this.followPlaylistRepository = followPlaylistRepository;
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
    public void deleteFollowersByPlaylist(Long playlistId) {
        checkIfPlaylistExists(playlistId);
        followPlaylistRepository.deleteByPlaylistId(playlistId);
    }

    private void checkIfPlaylistExists(Long playlistId) {
        playlistRepository.findById(playlistId)
            .orElseThrow(PlaylistNotFound::new);
    }

}
