package com.sallefy.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link PlaylistSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class PlaylistSearchRepositoryMockConfiguration {

    @MockBean
    private PlaylistSearchRepository mockPlaylistSearchRepository;

}
