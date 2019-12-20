package com.sallefy.service.impl;

import com.sallefy.repository.PlaybackRepository;
import com.sallefy.service.MarkerService;
import com.sallefy.service.dto.MarkerDTO;
import com.sallefy.service.dto.criteria.MarkerCriteriaDTO;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MarkerServiceImpl implements MarkerService {

    private PlaybackRepository playbackRepository;

    public MarkerServiceImpl(PlaybackRepository playbackRepository) {
        this.playbackRepository = playbackRepository;
    }

    @Override
    public List<MarkerDTO> findByCriteria(MarkerCriteriaDTO criteria) {
        return new ArrayList<>();
    }
}
