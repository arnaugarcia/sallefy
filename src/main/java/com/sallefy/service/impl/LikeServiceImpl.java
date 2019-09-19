package com.sallefy.service.impl;

import com.sallefy.repository.LikeTrackRepository;
import com.sallefy.security.SecurityUtils;
import com.sallefy.service.LikeService;
import com.sallefy.service.dto.LikeTrackDTO;
import com.sallefy.web.rest.errors.BadRequestAlertException;
import io.undertow.util.BadRequestException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LikeServiceImpl implements LikeService {

    private final LikeTrackRepository likeTrackRepository;

    public LikeServiceImpl(LikeTrackRepository likeTrackRepository) {
        this.likeTrackRepository = likeTrackRepository;
    }

    @Override
    public Optional<LikeTrackDTO> toggleLikeTrack(Long trackId) throws BadRequestException {
        String login = SecurityUtils.getCurrentUserLogin().orElseThrow(BadRequestException::new);
        System.out.println(login);
        return Optional.empty();
    }

}
