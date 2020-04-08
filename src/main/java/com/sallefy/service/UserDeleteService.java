package com.sallefy.service;

public interface UserDeleteService {

    /**
     * Method to delete a user and all his data
     * @param login the username of the user
     */
    void removeUser(String login);
}
