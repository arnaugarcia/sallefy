package com.sallefy.service.impl;

import com.sallefy.domain.Playlist;
import com.sallefy.domain.Track;
import com.sallefy.repository.PlaybackRepository;
import com.sallefy.repository.PlaylistRepository;
import com.sallefy.repository.TrackRepository;
import com.sallefy.repository.UserRepository;
import com.sallefy.service.FollowService;
import com.sallefy.service.UserDeleteService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserDeleteServiceImpl implements UserDeleteService {

    private final UserRepository userRepository;

    private final TrackRepository trackRepository;

    private final PlaylistRepository playlistRepository;

    private final PlaybackRepository playbackRepository;

    private final FollowService followService;

    public UserDeleteServiceImpl(UserRepository userRepository,
                                 TrackRepository trackRepository,
                                 PlaylistRepository playlistRepository,
                                 PlaybackRepository playbackRepository,
                                 FollowService followService) {
        this.userRepository = userRepository;
        this.trackRepository = trackRepository;
        this.playlistRepository = playlistRepository;
        this.playbackRepository = playbackRepository;
        this.followService = followService;
    }

    @Transactional
    @Override
    public void removeUser(String login) {
        userRepository.findOneByLogin(login).ifPresent(user -> {
            trackRepository.findAllByUserLogin(login)
                .forEach(this::removeTrackInAnotherPlaylist);
            followService.deleteAllFollowingsByLogin(login);
            playbackRepository.deleteAllByUserLogin(login);
            userRepository.delete(user);
        });
    }

    public void removeTrackInAnotherPlaylist(Track track) {
        final List<Playlist> playlistsWithTrack = playlistRepository.findByTracksContains(track);
        playlistsWithTrack.forEach(playlist -> removeTrackOfPlaylist(playlist, track));
    }

    public void removeTrackOfPlaylist(Playlist playlist, Track track) {
        playlist.getTracks().remove(track);
        playlistRepository.save(playlist);
    }

}
