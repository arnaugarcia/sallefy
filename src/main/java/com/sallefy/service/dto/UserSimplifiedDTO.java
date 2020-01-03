package com.sallefy.service.dto;

import com.sallefy.domain.User;
import io.swagger.annotations.ApiModel;

/**
 * A DTO representing a user.
 */
@ApiModel(value = "User", description = "A DTO with a simplification version of the user. This object is mostly used when the user is a child of a parent entity")
public class UserSimplifiedDTO {

    private Long id;

    private String login;

    private String firstName;

    private String lastName;

    private String email;

    private String imageUrl;

    private String langKey;

    public UserSimplifiedDTO() {
        // Empty constructor needed for Jackson.
    }

    public UserSimplifiedDTO(User user) {
        this.id = user.getId();
        this.login = user.getLogin();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.email = user.getEmail();
        this.imageUrl = user.getImageUrl();
        this.langKey = user.getLangKey();
    }

    public UserSimplifiedDTO(Long id,
                             String login,
                             String firstName,
                             String lastName,
                             String email,
                             String imageUrl,
                             String langKey) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.imageUrl = imageUrl;
        this.login = login;
        this.langKey = langKey;
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

    public String getLangKey() {
        return langKey;
    }

    public void setLangKey(String langKey) {
        this.langKey = langKey;
    }

    @Override
    public String toString() {
        return "UserDTO{" +
            "id=" + id +
            ", login='" + login + '\'' +
            ", firstName='" + firstName + '\'' +
            ", lastName='" + lastName + '\'' +
            ", email='" + email + '\'' +
            ", imageUrl='" + imageUrl + '\'' +
            ", langKey='" + langKey + '\'' +
            '}';
    }
}
