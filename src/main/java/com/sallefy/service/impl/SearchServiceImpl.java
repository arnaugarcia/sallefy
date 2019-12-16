package com.sallefy.service.impl;

import com.sallefy.repository.search.PlaylistSearchRepository;
import com.sallefy.repository.search.TrackSearchRepository;
import com.sallefy.repository.search.UserSearchRepository;
import com.sallefy.service.SearchService;
import com.sallefy.service.dto.PlaylistDTO;
import com.sallefy.service.dto.SearchDTO;
import com.sallefy.service.dto.TrackDTO;
import com.sallefy.service.dto.UserSimplifiedDTO;
import com.sallefy.service.mapper.PlaylistMapper;
import com.sallefy.service.mapper.TrackMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

import static java.util.stream.Collectors.toList;

@Service
public class SearchServiceImpl implements SearchService {

    private final PlaylistSearchRepository playlistSearchRepository;

    private final TrackSearchRepository trackSearchRepository;

    private final TrackMapper trackMapper;

    private final PlaylistMapper playlistMapper;

    public SearchServiceImpl(
                             PlaylistSearchRepository playlistSearchRepository,
                             TrackSearchRepository trackSearchRepository,
                             TrackMapper trackMapper,
                             PlaylistMapper playlistMapper) {
        this.playlistSearchRepository = playlistSearchRepository;
        this.trackSearchRepository = trackSearchRepository;
        this.trackMapper = trackMapper;
        this.playlistMapper = playlistMapper;
    }

    @Transactional
    @Override
    public SearchDTO search(String keyword) {
        SearchDTO searchDTO = new SearchDTO();

        searchDTO.setPlaylists(findAndTransformPlaylistsBy(keyword));
        searchDTO.setUsers(findAndTransformUsersBy(keyword));
        searchDTO.setTracks(findAndTransformTracksBy(keyword));

        return searchDTO;
    }

    private List<TrackDTO> findAndTransformTracksBy(String query) {
        return trackSearchRepository.search(query)
            .stream()
            .map(trackMapper::toDto)
            .collect(toList());
    }

    private List<UserSimplifiedDTO> findAndTransformUsersBy(String keyword) {
        List<UserSimplifiedDTO> users = new ArrayList<>();

        /*userSearchRepository.search(keyword)
            .spliterator()
            .forEachRemaining(users::add);*/

        return users;
    }

    private List<PlaylistDTO> findAndTransformPlaylistsBy(String keyword) {
        return playlistSearchRepository.search(keyword)
            .stream()
            .map(playlistMapper::toDto)
            .collect(toList());
    }
}
