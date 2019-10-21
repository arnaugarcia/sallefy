package com.sallefy.domain.queries;

public class UserQuery {

    public static final String USER_DATA_QUERY_NAME = "UserDataMapping";
    public static final String USER_DATA_QUERY = "select u.*, (select count(id) from follow_user where follow_user.followed_id = u.id) as followers, (select count(id) from follow_user where follow_user.user_id = u.id) as following, (select count(id) from playlist where playlist.user_id = u.id) as playlists, (select count(id) from track where track.user_id = u.id) as tracks from jhi_user u where u.login = ?1";

}
