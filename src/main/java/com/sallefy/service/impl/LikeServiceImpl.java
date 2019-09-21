package com.sallefy.service.impl;

import com.sallefy.domain.LikeTrack;
import com.sallefy.domain.Track;
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
import com.sallefy.service.mapper.UserMapper;
import com.sallefy.web.rest.errors.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

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

        findTrackById(trackId);

        final Optional<LikeTrack> isTrackLikedByUser = likeTrackRepository.findTrackByUserIsCurrentUser(createTrackFromId(trackId));

        final LikeDTO likeDTO = new LikeDTO();

        if (isTrackLikedByUser.isPresent()) {
            likeTrackRepository.delete(isTrackLikedByUser.get());
            likeDTO.setLiked(false);
        } else {
            LikeTrack likeTrack = new LikeTrack();
            likeTrack.setTrack(createTrackFromId(trackId));
            likeTrack.setUser(user);
            likeTrack.setLiked(true);
            likeTrackRepository.save(likeTrack);
        }

        return likeDTO;
    }

    private TrackDTO findTrackById(Long trackId) {
        return trackService.findOne(trackId);
    }

    private Track createTrackFromId(Long trackId) {
        return trackMapper.fromId(trackId);
    }

    private User findCurrentUser() {
        return userService.getUserWithAuthorities()
            .orElseThrow(UserNotFoundException::new);
    }

}
