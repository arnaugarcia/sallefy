package com.sallefy.service.dto;

import java.time.Instant;
import java.util.Set;

/**
 * A DTO representing a user, with his authorities.
 */
public class AccountDTO {

    private Long id;

    private String login;

    private String firstName;

    private String lastName;

    private String email;

    private String imageUrl;

    private boolean activated = false;

    private Long followers;

    private Long following;

    private Long playlists;

    private Long tracks;

    private String langKey;

    private String createdBy;

    private Instant createdDate;

    private String lastModifiedBy;

    private Instant lastModifiedDate;

    private Set<String> authorities;

    public AccountDTO() {
        // Empty constructor needed for Jackson.
    }

    public AccountDTO(
        Long id,
        String login,
        String firstName,
        String lastName,
        String email,
        String imageUrl,
        Boolean activated,
        Long followers,
        Long following,
        Long playlists,
        Long tracks,
        String langKey,
        String createBy,
        Instant createdDate,
        String lastModifiedBy,
        Instant lastModifiedDate
    ) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.imageUrl = imageUrl;
        this.activated = activated;
        this.login = login;
        this.followers = followers;
        this.following = following;
        this.playlists = playlists;
        this.tracks = tracks;
        this.langKey = langKey;
        this.createdBy = createBy;
        this.createdDate = createdDate;
        this.lastModifiedBy = lastModifiedBy;
        this.lastModifiedDate = lastModifiedDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public boolean isActivated() {
        return activated;
    }

    public void setActivated(boolean activated) {
        this.activated = activated;
    }

    public String getLangKey() {
        return langKey;
    }

    public void setLangKey(String langKey) {
        this.langKey = langKey;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Instant getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Instant createdDate) {
        this.createdDate = createdDate;
    }

    public String getLastModifiedBy() {
        return lastModifiedBy;
    }

    public void setLastModifiedBy(String lastModifiedBy) {
        this.lastModifiedBy = lastModifiedBy;
    }

    public Instant getLastModifiedDate() {
        return lastModifiedDate;
    }

    public void setLastModifiedDate(Instant lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }

    public Set<String> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(Set<String> authorities) {
        this.authorities = authorities;
    }

    public Long getFollowers() {
        return followers;
    }

    public void setFollowers(Long followers) {
        this.followers = followers;
    }

    public Long getFollowing() {
        return following;
    }

    public void setFollowing(Long following) {
        this.following = following;
    }

    public Long getPlaylists() {
        return playlists;
    }

    public void setPlaylists(Long playlists) {
        this.playlists = playlists;
    }

    public Long getTracks() {
        return tracks;
    }

    public void setTracks(Long tracks) {
        this.tracks = tracks;
    }

    @Override
    public String toString() {
        return "AccountDTO{" +
            "id=" + id +
            ", login='" + login + '\'' +
            ", firstName='" + firstName + '\'' +
            ", lastName='" + lastName + '\'' +
            ", email='" + email + '\'' +
            ", imageUrl='" + imageUrl + '\'' +
            ", activated=" + activated +
            ", followers=" + followers +
            ", following=" + following +
            ", playlists=" + playlists +
            ", tracks=" + tracks +
            ", langKey='" + langKey + '\'' +
            ", createdBy='" + createdBy + '\'' +
            ", createdDate=" + createdDate +
            ", lastModifiedBy='" + lastModifiedBy + '\'' +
            ", lastModifiedDate=" + lastModifiedDate +
            ", authorities=" + authorities +
            '}';
    }
}
