package com.sallefy.service.impl;

import com.sallefy.repository.search.PlaylistSearchRepository;
import com.sallefy.repository.search.TrackSearchRepository;
import com.sallefy.repository.search.UserSearchRepository;
import com.sallefy.service.SearchService;
import com.sallefy.service.dto.PlaylistDTO;
import com.sallefy.service.dto.SearchDTO;
import com.sallefy.service.dto.TrackDTO;
import com.sallefy.service.dto.UserSimplifiedDTO;
import org.elasticsearch.index.query.QueryStringQueryBuilder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SearchServiceImpl implements SearchService {

    private final UserSearchRepository userSearchRepository;

    private final PlaylistSearchRepository playlistSearchRepository;

    private final TrackSearchRepository trackSearchRepository;

    public SearchServiceImpl(UserSearchRepository userSearchRepository,
                             PlaylistSearchRepository playlistSearchRepository,
                             TrackSearchRepository trackSearchRepository) {
        this.userSearchRepository = userSearchRepository;
        this.playlistSearchRepository = playlistSearchRepository;
        this.trackSearchRepository = trackSearchRepository;
    }

    @Override
    public SearchDTO search(QueryStringQueryBuilder query) {
        SearchDTO searchDTO = new SearchDTO();

        searchDTO.setPlaylists(findAndTransformPlaylistsBy(query));
        searchDTO.setUsers(findAndTransformUsersBy(query));
        searchDTO.setTracks(findAndTransformTracksBy(query));

        return searchDTO;
    }

    private List<TrackDTO> findAndTransformTracksBy(QueryStringQueryBuilder query) {
        List<TrackDTO> tracks = new ArrayList<>();

        trackSearchRepository.search(query)
            .spliterator()
            .forEachRemaining(tracks::add);

        return tracks;
    }

    private List<UserSimplifiedDTO> findAndTransformUsersBy(QueryStringQueryBuilder query) {
        List<UserSimplifiedDTO> users = new ArrayList<>();

        userSearchRepository.search(query)
            .spliterator()
            .forEachRemaining(users::add);

        return users;
    }

    private List<PlaylistDTO> findAndTransformPlaylistsBy(QueryStringQueryBuilder query) {
        List<PlaylistDTO> playlists = new ArrayList<>();

        playlistSearchRepository.search(query)
            .spliterator()
            .forEachRemaining(playlists::add);

        return playlists;
    }
}
