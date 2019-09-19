package com.sallefy.service.impl;

import com.sallefy.domain.LikeTrack;
import com.sallefy.domain.User;
import com.sallefy.repository.LikeAlbumRepository;
import com.sallefy.repository.LikeTrackRepository;
import com.sallefy.service.LikeService;
import com.sallefy.service.TrackService;
import com.sallefy.service.UserService;
import com.sallefy.service.dto.LikeDTO;
import com.sallefy.service.dto.TrackDTO;
import com.sallefy.service.mapper.LikeTrackMapper;
import com.sallefy.service.mapper.TrackMapper;
import com.sallefy.web.rest.errors.UserNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class LikeServiceImpl implements LikeService {

    private final LikeTrackRepository likeTrackRepository;

    private final LikeAlbumRepository likeAlbumRepository;

    private final LikeTrackMapper likeTrackMapper;

    private final TrackMapper trackMapper;

    private final TrackService trackService;

    private final UserService userService;

    public LikeServiceImpl(LikeTrackRepository likeTrackRepository,
                           LikeAlbumRepository likeAlbumRepository,
                           LikeTrackMapper likeTrackMapper,
                           TrackMapper trackMapper,
                           TrackService trackService,
                           UserService userService) {
        this.likeTrackRepository = likeTrackRepository;
        this.likeAlbumRepository = likeAlbumRepository;
        this.likeTrackMapper = likeTrackMapper;
        this.trackMapper = trackMapper;
        this.trackService = trackService;
        this.userService = userService;
    }

    @Override
    public LikeDTO toggleLikeTrack(Long trackId) {
        final User user = findCurrentUser();

        final TrackDTO trackDTO = trackService.findOne(trackId);

        final LikeTrack likeTrack = new LikeTrack();

        likeTrack.setTrack(trackMapper.toEntity(trackDTO));
        likeTrack.setUser(user);
        likeTrack.setLiked(true);

        return saveAndTransform(likeTrack);
    }

    private LikeDTO saveAndTransform(LikeTrack likeTrack) {
        likeTrackRepository.save(likeTrack);
        return likeTrackMapper.toDto(likeTrack);
    }

    private User findCurrentUser() {
        return userService.getUserWithAuthorities()
            .orElseThrow(UserNotFoundException::new);
    }

}
