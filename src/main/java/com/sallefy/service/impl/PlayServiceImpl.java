package com.sallefy.service.impl;

import com.sallefy.domain.Playback;
import com.sallefy.domain.Track;
import com.sallefy.domain.User;
import com.sallefy.domain.enumeration.AgentType;
import com.sallefy.repository.PlaybackRepository;
import com.sallefy.repository.TrackRepository;
import com.sallefy.service.LocationService;
import com.sallefy.service.PlayService;
import com.sallefy.service.UserService;
import com.sallefy.service.dto.LocationDTO;
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

    private final LocationService locationService;

    private final String USER_AGENT_HEADER_KEY = "user-agent";

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
    public void playTrack(HttpServletRequest request, Long id) {
        final User currentUser = userService.getUserWithAuthorities();

        Track track = findTrackById(id);

        final LocationDTO locationDTO = locationService.locate(request);

        Playback playback = new Playback();
        playback.setUser(currentUser);
        playback.setTrack(track);
        playback.setLatitude(locationDTO.getLatitude());
        playback.setLongitude(locationDTO.getLongitude());
        playback.setAgent(transformAgentType(request.getHeader(USER_AGENT_HEADER_KEY)));
        playback.setIp(locationDTO.getIp());

        playbackRepository.save(playback);
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
