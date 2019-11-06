package com.sallefy.service.impl;

import com.sallefy.domain.Playlist;
import com.sallefy.domain.Track;
import com.sallefy.domain.User;
import com.sallefy.repository.search.PlaylistSearchRepository;
import com.sallefy.repository.search.TrackSearchRepository;
import com.sallefy.repository.search.UserSearchRepository;
import com.sallefy.service.SearchService;
import com.sallefy.service.dto.PlaylistDTO;
import com.sallefy.service.dto.SearchDTO;
import com.sallefy.service.dto.TrackDTO;
import com.sallefy.service.dto.UserSimplifyedDTO;
import com.sallefy.service.mapper.PlaylistMapper;
import com.sallefy.service.mapper.TrackMapper;
import org.elasticsearch.index.query.QueryStringQueryBuilder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static java.util.stream.Collectors.toList;

@Service
public class SearchServiceImpl implements SearchService {

    private final UserSearchRepository userSearchRepository;

    private final PlaylistSearchRepository playlistSearchRepository;

    private final TrackSearchRepository trackSearchRepository;

    private final PlaylistMapper playlistMapper;

    private final TrackMapper trackMapper;

    public SearchServiceImpl(UserSearchRepository userSearchRepository,
                             PlaylistSearchRepository playlistSearchRepository,
                             TrackSearchRepository trackSearchRepository,
                             PlaylistMapper playlistMapper,
                             TrackMapper trackMapper) {
        this.userSearchRepository = userSearchRepository;
        this.playlistSearchRepository = playlistSearchRepository;
        this.trackSearchRepository = trackSearchRepository;
        this.playlistMapper = playlistMapper;
        this.trackMapper = trackMapper;
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
        List<Track> tracks = new ArrayList<>();

        trackSearchRepository.findAll()
            .spliterator()
            .forEachRemaining(tracks::add);

        return tracks.stream()
            .map(trackMapper::toDto)
            .collect(toList());
    }

    private List<UserSimplifyedDTO> findAndTransformUsersBy(QueryStringQueryBuilder query) {
        List<User> users = new ArrayList<>();

        userSearchRepository.search(query)
            .spliterator()
            .forEachRemaining(users::add);

        return users.stream()
            .map(UserSimplifyedDTO::new)
            .collect(toList());
    }

    private List<PlaylistDTO> findAndTransformPlaylistsBy(QueryStringQueryBuilder query) {
        List<Playlist> playlists = new ArrayList<>();

        playlistSearchRepository.search(query)
            .spliterator()
            .forEachRemaining(playlists::add);

        return playlists.stream()
            .map(playlistMapper::toDto)
            .collect(toList());
    }
}
