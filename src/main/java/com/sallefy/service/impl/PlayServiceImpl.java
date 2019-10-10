package com.sallefy.service.impl;

import com.sallefy.domain.Playback;
import com.sallefy.domain.Track;
import com.sallefy.domain.User;
import com.sallefy.repository.PlaybackRepository;
import com.sallefy.repository.TrackRepository;
import com.sallefy.service.LocationService;
import com.sallefy.service.PlayService;
import com.sallefy.service.UserService;
import com.sallefy.service.exception.TrackNotFoundException;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

@Service
public class PlayServiceImpl implements PlayService {

    private final PlaybackRepository playbackRepository;

    private final TrackRepository trackRepository;

    private final UserService userService;

    private final LocationService locationService;

    public PlayServiceImpl(PlaybackRepository playbackRepository,
                           TrackRepository trackRepository,
                           UserService userService,
                           LocationService locationService) {
        this.playbackRepository = playbackRepository;
        this.trackRepository = trackRepository;
        this.userService = userService;
        this.locationService = locationService;
    }

    @Override
    public void playTrack(HttpServletRequest requestContext, Long id) {
        final User currentUser = userService.getUserWithAuthorities();

        Track track = findTrackById(id);

        Playback playback = new Playback();
        playback.setUser(currentUser);
        playback.setTrack(track);



        playbackRepository.save(playback);
    }

    private Track findTrackById(Long id) {
        return trackRepository.findById(id)
            .orElseThrow(TrackNotFoundException::new);
    }

}
