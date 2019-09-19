package com.sallefy.service.impl;

import com.sallefy.repository.LikeAlbumRepository;
import com.sallefy.repository.LikeTrackRepository;
import com.sallefy.security.SecurityUtils;
import com.sallefy.service.LikeService;
import com.sallefy.service.dto.LikeTrackDTO;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LikeServiceImpl implements LikeService {

    private final LikeTrackRepository likeTrackRepository;

    private final LikeAlbumRepository likeAlbumRepository;

    public LikeServiceImpl(LikeTrackRepository likeTrackRepository, LikeAlbumRepository likeAlbumRepository) {
        this.likeTrackRepository = likeTrackRepository;
        this.likeAlbumRepository = likeAlbumRepository;
    }

    @Override
    public Optional<LikeTrackDTO> toggleLikeTrack(Long trackId) {
        String login = SecurityUtils.getCurrentUserLogin().get();
        System.out.println(login);
        return Optional.empty();
    }

}
