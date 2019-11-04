package com.sallefy.service.impl;

import com.sallefy.domain.Playlist;
import com.sallefy.domain.User;
import com.sallefy.repository.search.PlaylistSearchRepository;
import com.sallefy.repository.search.UserSearchRepository;
import com.sallefy.service.SearchService;
import com.sallefy.service.dto.SearchDTO;
import com.sallefy.service.dto.UserSimplifyedDTO;
import com.sallefy.service.mapper.PlaylistMapper;
import org.elasticsearch.index.query.QueryStringQueryBuilder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static java.util.stream.Collectors.toList;

@Service
public class SearchServiceImpl implements SearchService {

    private final UserSearchRepository userSearchRepository;

    private final PlaylistSearchRepository playlistSearchRepository;
    private final PlaylistMapper playlistMapper;

    public SearchServiceImpl(UserSearchRepository userSearchRepository,
                             PlaylistSearchRepository playlistSearchRepository,
                             PlaylistMapper playlistMapper) {
        this.userSearchRepository = userSearchRepository;
        this.playlistSearchRepository = playlistSearchRepository;
        this.playlistMapper = playlistMapper;
    }

    @Override
    public SearchDTO search(QueryStringQueryBuilder query) {
        final Iterable<User> usersIterator = userSearchRepository.search(query);
        final Iterable<Playlist> playlists = playlistSearchRepository.search(query);

        List<Playlist> playlistList = new ArrayList<>();
        playlists.forEach(playlistList::add);

        List<User> users = new ArrayList<>();
        usersIterator.forEach(users::add);

        SearchDTO searchDTO = new SearchDTO();

        searchDTO.setPlaylists(playlistMapper.toDto(playlistList));
        searchDTO.setUsers(users.stream()
            .map(UserSimplifyedDTO::new)
            .collect(toList()));

        return searchDTO;
    }
}
