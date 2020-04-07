package com.sallefy.service.mapper;

import com.sallefy.domain.LikeTrack;
import com.sallefy.domain.Playback;
import com.sallefy.domain.Track;
import com.sallefy.security.SecurityUtils;
import com.sallefy.service.dto.TrackDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.Optional;
import java.util.Set;

/**
 * Mapper for the entity {@link Track} and its DTO {@link TrackDTO}.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, GenreMapper.class})
public interface TrackMapper extends EntityMapper<TrackDTO, Track> {

    @Mapping(source = "playbacks", target = "plays")
    @Mapping(source = "likeTracks", target = "likes")
    @Mapping(source = "likeTracks", target = "liked")
    @Mapping(source = "user", target = "owner")
    TrackDTO toDto(Track track);

    @Mapping(target = "removePlayback", ignore = true)
    @Mapping(target = "removeLikeTrack", ignore = true)
    @Mapping(target = "playbacks", ignore = true)
    @Mapping(target = "likeTracks", ignore = true)
    @Mapping(target = "user", source = "owner")
    @Mapping(target = "rating", ignore = true)
    @Mapping(target = "popularity", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "removeGenre", ignore = true)
    Track toEntity(TrackDTO trackDTO);

    default Boolean mapLike(Set<LikeTrack> likeTracks) {

        final Optional<String> currentUserLogin = SecurityUtils.getCurrentUserLogin();
        if (!currentUserLogin.isPresent()) {
            return false;
        }

        return likeTracks.stream()
            .anyMatch(
                likeTrack -> likeTrack
                    .getUser()
                    .getLogin()
                    .equals(currentUserLogin.get())
            );
    }

    default Integer mapPlaybacks(Set<Playback> playbacks) {
        return playbacks.size();
    }

    default Integer mapLikes(Set<LikeTrack> likeTrackSet) {
        return likeTrackSet.size();
    }

    default Track fromId(Long id) {
        if (id == null) {
            return null;
        }
        Track track = new Track();
        track.setId(id);
        return track;
    }
}
