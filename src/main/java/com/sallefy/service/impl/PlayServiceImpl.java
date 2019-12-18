package com.sallefy.service.impl;

import com.sallefy.domain.Playback;
import com.sallefy.domain.Track;
import com.sallefy.domain.User;
import com.sallefy.domain.enumeration.AgentType;
import com.sallefy.repository.PlaybackRepository;
import com.sallefy.repository.TrackRepository;
import com.sallefy.service.PlayService;
import com.sallefy.service.UserService;
import com.sallefy.service.dto.LatLongDTO;
import com.sallefy.service.exception.TrackNotFoundException;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

import static com.sallefy.domain.enumeration.AgentType.*;
import static org.springframework.util.StringUtils.hasText;

@Service
public class PlayServiceImpl implements PlayService {

    private final PlaybackRepository playbackRepository;

    private final TrackRepository trackRepository;

    private final UserService userService;

    private final String USER_AGENT_HEADER_KEY = "user-agent";

    public PlayServiceImpl(PlaybackRepository playbackRepository,
                           TrackRepository trackRepository,
                           UserService userService) {
        this.playbackRepository = playbackRepository;
        this.trackRepository = trackRepository;
        this.userService = userService;
    }

    @Override
    public void playTrack(HttpServletRequest request, LatLongDTO latLong, Long trackId) {
        final User currentUser = userService.getUserWithAuthorities();

        Track track = findTrackById(trackId);

        Playback playback = new Playback();
        playback.setUser(currentUser);
        playback.setTrack(track);
        playback.setLatitude(latLong.getLatitude());
        playback.setLongitude(latLong.getLongitude());
        playback.setAgent(getAgent(request));
        playback.setIp(request.getRemoteAddr());

        playbackRepository.save(playback);
    }

    private AgentType getAgent(HttpServletRequest request) {
        return transformAgentType(request.getHeader(USER_AGENT_HEADER_KEY));
    }

    private Track findTrackById(Long id) {
        return trackRepository.findById(id)
            .orElseThrow(TrackNotFoundException::new);
    }

    private AgentType transformAgentType(String value) {

        if (!hasText(value)) {
            return OTHER;
        }

        if (value.contains("Mobile")) {
            return MOBILE;
        } else {
            return WEB;
        }
    }

}
