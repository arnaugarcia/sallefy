package com.sallefy.service.dto;

import com.sallefy.service.dto.constraints.CloudinaryHost;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A DTO for the {@link com.sallefy.domain.Track} entity.
 */
@Document(indexName = "track-dto")
public class TrackDTO implements Serializable {

    @Field(type = FieldType.Keyword)
    private Long id;

    @NotNull
    private String name;

    @NotNull
    @CloudinaryHost
    private String url;

    private String thumbnail;

    private ZonedDateTime released;

    @Min(0)
    @Max(1000)
    private Integer duration;

    private String color;

    private UserSimplifiedDTO owner;

    private Set<GenreDTO> genres = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }

    public ZonedDateTime getReleased() {
        return released;
    }

    public void setReleased(ZonedDateTime released) {
        this.released = released;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Set<GenreDTO> getGenres() {
        return genres;
    }

    public void setGenres(Set<GenreDTO> genres) {
        this.genres = genres;
    }

    public UserSimplifiedDTO getOwner() {
        return owner;
    }

    public void setOwner(UserSimplifiedDTO owner) {
        this.owner = owner;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TrackDTO trackDTO = (TrackDTO) o;
        if (trackDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), trackDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TrackDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", url='" + getUrl() + "'" +
            ", thumbnail='" + getThumbnail() + "'" +
            ", released='" + getReleased() + "'" +
            ", duration=" + getDuration() +
            ", color='" + getColor() + "'" +
            "}";
    }
}
