package com.sallefy.service.impl;

import com.sallefy.domain.LikeAlbum;
import com.sallefy.domain.LikeTrack;
import com.sallefy.domain.Track;
import com.sallefy.domain.User;
import com.sallefy.repository.LikeAlbumRepository;
import com.sallefy.repository.LikeTrackRepository;
import com.sallefy.service.AlbumService;
import com.sallefy.service.LikeService;
import com.sallefy.service.TrackService;
import com.sallefy.service.UserService;
import com.sallefy.service.dto.LikeDTO;
import com.sallefy.service.dto.TrackDTO;
import com.sallefy.service.mapper.AlbumMapper;
import com.sallefy.service.mapper.TrackMapper;
import com.sallefy.web.rest.errors.UserNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LikeServiceImpl implements LikeService {

    private final LikeTrackRepository likeTrackRepository;

    private final TrackMapper trackMapper;

    private final TrackService trackService;

    private final UserService userService;

    public LikeServiceImpl(LikeTrackRepository likeTrackRepository,
                           TrackMapper trackMapper,
                           TrackService trackService,
                           UserService userService) {
        this.likeTrackRepository = likeTrackRepository;
        this.trackMapper = trackMapper;
        this.trackService = trackService;
        this.userService = userService;
    }

    @Override
    public LikeDTO toggleLikeTrack(Long trackId) {
        final User user = userService.getUserWithAuthorities();

        findTrackById(trackId);

        final Optional<LikeTrack> userLikeTrack = likeTrackRepository.findTrackByUserIsCurrentUser(createTrackFromId(trackId));

        final LikeDTO likeDTO = new LikeDTO();

        if (userLikeTrack.isPresent()) {
            likeTrackRepository.delete(userLikeTrack.get());
            likeDTO.setLiked(false);
        } else {
            LikeTrack likeTrack = new LikeTrack();
            likeTrack.setTrack(createTrackFromId(trackId));
            likeTrack.setUser(user);
            likeTrack.setLiked(true);
            likeTrackRepository.save(likeTrack);
            likeDTO.setLiked(true);
        }

        return likeDTO;
    }


    private void findTrackById(Long trackId) {
        trackService.findOne(trackId);
    }

    private Track createTrackFromId(Long trackId) {
        return trackMapper.fromId(trackId);
    }

}
