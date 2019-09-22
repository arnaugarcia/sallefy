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

    private final LikeAlbumRepository likeAlbumRepository;

    private final AlbumService albumService;

    private final TrackMapper trackMapper;

    private final AlbumMapper albumMapper;

    private final TrackService trackService;

    private final UserService userService;

    public LikeServiceImpl(LikeTrackRepository likeTrackRepository,
                           LikeAlbumRepository likeAlbumRepository,
                           AlbumService albumService,
                           TrackMapper trackMapper,
                           AlbumMapper albumMapper,
                           TrackService trackService,
                           UserService userService) {
        this.likeTrackRepository = likeTrackRepository;
        this.likeAlbumRepository = likeAlbumRepository;
        this.albumService = albumService;
        this.trackMapper = trackMapper;
        this.albumMapper = albumMapper;
        this.trackService = trackService;
        this.userService = userService;
    }

    @Override
    public LikeDTO toggleLikeTrack(Long trackId) {
        final User user = findCurrentUser();

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

    @Override
    public LikeDTO toggleLikeAlbum(Long albumId) {
        final User user = findCurrentUser();

        albumService.findOne(albumId);

        final LikeDTO likeDTO = new LikeDTO();

        final Optional<LikeAlbum> userLikeAlbum = likeAlbumRepository.findAlbumByUserIsCurrentUser(albumMapper.fromId(albumId));

        if (userLikeAlbum.isPresent()) {
            likeAlbumRepository.delete(userLikeAlbum.get());
            likeDTO.setLiked(false);
        } else {
            LikeAlbum likeAlbum = new LikeAlbum();
            likeAlbum.setAlbum(albumMapper.fromId(albumId));
            likeAlbum.setUser(user);
            likeAlbum.setLiked(true);
            likeAlbumRepository.save(likeAlbum);
            likeDTO.setLiked(true);
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
