package com.sallefy.service.impl;

import com.sallefy.repository.UserRepository;
import com.sallefy.repository.search.PlaylistSearchRepository;
import com.sallefy.repository.search.TrackSearchRepository;
import com.sallefy.repository.search.UserSearchRepository;
import com.sallefy.service.ElasticsearchIndexService;
import com.sallefy.service.PlaylistService;
import com.sallefy.service.TrackService;
import com.sallefy.service.dto.UserSimplifiedDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static com.sallefy.config.Constants.ANONYMOUS_USER;

@Service
public class ElasticsearchIndexServiceImpl implements ElasticsearchIndexService {

    private UserSearchRepository userSearchRepository;

    private UserRepository userRepository;

    private PlaylistSearchRepository playlistSearchRepository;

    private PlaylistService playlistService;

    private TrackSearchRepository trackSearchRepository;

    private TrackService trackService;

    private final Logger log = LoggerFactory.getLogger(ElasticsearchIndexServiceImpl.class);

    public ElasticsearchIndexServiceImpl(UserSearchRepository userSearchRepository,
                                         UserRepository userRepository,
                                         PlaylistSearchRepository playlistSearchRepository,
                                         PlaylistService playlistService,
                                         TrackSearchRepository trackSearchRepository,
                                         TrackService trackService) {
        this.userSearchRepository = userSearchRepository;
        this.userRepository = userRepository;
        this.playlistSearchRepository = playlistSearchRepository;
        this.playlistService = playlistService;
        this.trackSearchRepository = trackSearchRepository;
        this.trackService = trackService;
    }

    @Override
    public void reindexAll() {
        log.info("Reindexing all documents");
        reindexTracks();
        reindexPlaylists();
        reindexUsers();
        log.info("Finished reindexing all documents");
    }

    private void reindexTracks() {
        log.info("Reindexing all tracks");
        trackSearchRepository.deleteAll();
        trackSearchRepository.saveAll(trackService.findAll());
        log.info("Finished reindexing all tracks");
    }

    private void reindexPlaylists() {
        log.info("Reindexing all playlists");
        playlistSearchRepository.deleteAll();
        playlistSearchRepository.saveAll(playlistService.findAll());
        log.info("Finished reindexing all playlists");
    }

    private void reindexUsers() {
        log.info("Reindexing all users");
        userSearchRepository.deleteAll();
        final List<UserSimplifiedDTO> users = userRepository.findAllByLoginNot(ANONYMOUS_USER)
            .stream()
            .map(user -> new UserSimplifiedDTO())
            .collect(Collectors.toList());
        userSearchRepository.saveAll(users);
        log.info("Finished reindexing all users");
    }
}
