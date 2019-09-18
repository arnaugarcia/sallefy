package com.sallefy.service.impl;

import com.sallefy.repository.LikeTrackRepository;
import com.sallefy.service.LikeService;
import com.sallefy.service.dto.LikeTrackDTO;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LikeServiceImpl implements LikeService {

    private final LikeTrackRepository likeTrackRepository;

    public LikeServiceImpl(LikeTrackRepository likeTrackRepository) {
        this.likeTrackRepository = likeTrackRepository;
    }

    @Override
    public Optional<LikeTrackDTO> toggleLikeTrack(Long trackId) {
        return Optional.empty();
    }
}
