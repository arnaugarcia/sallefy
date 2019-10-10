package com.sallefy.service.impl;

import com.sallefy.domain.Playback;
import com.sallefy.domain.User;
import com.sallefy.repository.PlaybackRepository;
import com.sallefy.service.PlayService;
import com.sallefy.service.TrackService;
import com.sallefy.service.UserService;
import com.sallefy.service.mapper.TrackMapper;
import org.springframework.stereotype.Service;

@Service
public class PlayServiceImpl implements PlayService {

    private final PlaybackRepository playbackRepository;
    private final TrackMapper trackMapper;

    private final TrackService trackService;
    private final UserService userService;

    public PlayServiceImpl(PlaybackRepository playbackRepository,
                           TrackMapper trackMapper,
                           TrackService trackService,
                           UserService userService) {
        this.playbackRepository = playbackRepository;
        this.trackMapper = trackMapper;
        this.trackService = trackService;
        this.userService = userService;
    }

    @Override
    public void playTrack(Long id) {
        final User currentUser = userService.getUserWithAuthorities();

        checkIfTrackExists(id);

        Playback playback = new Playback();
        playback.setTrack(trackMapper.fromId(id));
        playback.setUser(currentUser);

        playbackRepository.save(playback);
    }

    private void checkIfTrackExists(Long id) {
        trackService.findOne(id);
    }
}
