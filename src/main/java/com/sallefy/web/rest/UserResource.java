package com.sallefy.web.rest;

import com.sallefy.config.Constants;
import com.sallefy.domain.User;
import com.sallefy.repository.UserRepository;
import com.sallefy.security.AuthoritiesConstants;
import com.sallefy.service.FollowService;
import com.sallefy.service.PlaylistService;
import com.sallefy.service.UserDeleteService;
import com.sallefy.service.UserService;
import com.sallefy.service.dto.FollowDTO;
import com.sallefy.service.dto.PlaylistDTO;
import com.sallefy.service.dto.TrackDTO;
import com.sallefy.service.dto.UserDTO;
import com.sallefy.service.dto.criteria.UserCriteriaDTO;
import com.sallefy.service.dto.criteria.UserTrackCriteriaDTO;
import com.sallefy.service.impl.TrackQueryService;
import com.sallefy.service.impl.UserQueryService;
import com.sallefy.web.rest.errors.BadRequestAlertException;
import com.sallefy.web.rest.errors.EmailAlreadyUsedException;
import com.sallefy.web.rest.errors.LoginAlreadyUsedException;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import static io.github.jhipster.web.util.ResponseUtil.wrapOrNotFound;
import static org.springframework.http.ResponseEntity.ok;

/**
 * REST controller for managing users.
 * <p>
 * This class accesses the {@link User} entity, and needs to fetch its collection of authorities.
 * <p>
 * For a normal use-case, it would be better to have an eager relationship between User and Authority,
 * and send everything to the client side: there would be no View Model and DTO, a lot less code, and an outer-join
 * which would be good for performance.
 * <p>
 * We use a View Model and a DTO for 3 reasons:
 * <ul>
 * <li>We want to keep a lazy association between the user and the authorities, because people will
 * quite often do relationships with the user, and we don't want them to get the authorities all
 * the time for nothing (for performance reasons). This is the #1 goal: we should not impact our users'
 * application because of this use-case.</li>
 * <li> Not having an outer join causes n+1 requests to the database. This is not a real issue as
 * we have by default a second-level cache. This means on the first HTTP call we do the n+1 requests,
 * but then all authorities come from the cache, so in fact it's much better than doing an outer join
 * (which will get lots of data from the database, for each HTTP call).</li>
 * <li> As this manages users, for security reasons, we'd rather have a DTO layer.</li>
 * </ul>
 * <p>
 * Another option would be to have a specific JPA entity graph to handle this case.
 */
@RestController
@RequestMapping("/api")
public class UserResource {

    private final Logger log = LoggerFactory.getLogger(UserResource.class);

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UserService userService;

    private final UserRepository userRepository;

    private final FollowService followService;

    private final PlaylistService playlistService;

    private final TrackQueryService trackQueryService;

    private final UserQueryService userQueryService;

    private final UserDeleteService userDeleteService;

    public UserResource(UserService userService,
                        UserRepository userRepository,
                        FollowService followService,
                        PlaylistService playlistService,
                        TrackQueryService trackQueryService,
                        UserQueryService userQueryService,
                        UserDeleteService userDeleteService) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.followService = followService;
        this.playlistService = playlistService;
        this.trackQueryService = trackQueryService;
        this.userQueryService = userQueryService;
        this.userDeleteService = userDeleteService;
    }

    /**
     * {@code POST  /users}  : Creates a new user.
     * <p>
     * Creates a new user if the login and email are not already used, and sends an
     * mail with an activation link.
     * The user needs to be activated on creation.
     *
     * @param userDTO the user to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new user, or with status {@code 400 (Bad Request)} if the login or email is already in use.
     * @throws URISyntaxException       if the Location URI syntax is incorrect.
     * @throws BadRequestAlertException {@code 400 (Bad Request)} if the login or email is already in use.
     */
    @PostMapping("/users")
    @PreAuthorize("hasRole(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<UserDTO> createUser(@Valid @RequestBody UserDTO userDTO) throws URISyntaxException {
        log.debug("REST request to save User : {}", userDTO);

        if (userDTO.getId() != null) {
            throw new BadRequestAlertException("A new user cannot already have an ID", "userManagement", "idexists");
            // Lowercase the user login before comparing with database
        } else if (userRepository.findOneByLogin(userDTO.getLogin().toLowerCase()).isPresent()) {
            throw new LoginAlreadyUsedException();
        } else if (userRepository.findOneByEmailIgnoreCase(userDTO.getEmail()).isPresent()) {
            throw new EmailAlreadyUsedException();
        } else {
            UserDTO newUser = userService.createUser(userDTO);
            return ResponseEntity.created(new URI("/api/users/" + newUser.getLogin()))
                .headers(HeaderUtil.createAlert(applicationName, "userManagement.created", newUser.getLogin()))
                .body(newUser);
        }
    }

    /**
     * {@code PUT /users} : Updates an existing User.
     *
     * @param userDTO the user to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated user.
     * @throws EmailAlreadyUsedException {@code 400 (Bad Request)} if the email is already in use.
     * @throws LoginAlreadyUsedException {@code 400 (Bad Request)} if the login is already in use.
     */
    @PutMapping("/users")
    @PreAuthorize("hasRole(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<UserDTO> updateUser(@Valid @RequestBody UserDTO userDTO) {
        log.debug("REST request to update User : {}", userDTO);
        Optional<User> existingUser = userRepository.findOneByEmailIgnoreCase(userDTO.getEmail());
        if (existingUser.isPresent() && (!existingUser.get().getId().equals(userDTO.getId()))) {
            throw new EmailAlreadyUsedException();
        }
        existingUser = userRepository.findOneByLogin(userDTO.getLogin().toLowerCase());
        if (existingUser.isPresent() && (!existingUser.get().getId().equals(userDTO.getId()))) {
            throw new LoginAlreadyUsedException();
        }
        Optional<UserDTO> updatedUser = userService.updateUser(userDTO);

        return wrapOrNotFound(updatedUser,
            HeaderUtil.createAlert(applicationName, "userManagement.updated", userDTO.getLogin()));
    }

    /**
     * {@code GET /users} : get all users.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body all users.
     */
    @GetMapping("/users")
    public ResponseEntity<List<UserDTO>> getAllUsers(UserCriteriaDTO criteria, Pageable pageable) {
        final Page<UserDTO> page = userQueryService.findByCriteria(criteria, pageable);

        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ok().headers(headers).body(page.getContent());
    }

    /**
     * Gets a list of all roles.
     *
     * @return a string list of all roles.
     */
    @GetMapping("/users/authorities")
    @PreAuthorize("hasRole(\"" + AuthoritiesConstants.ADMIN + "\")")
    public List<String> getAuthorities() {
        return userService.getAuthorities();
    }

    /**
     * {@code GET /users/:login} : get the "login" user.
     *
     * @param login the login of the user to find.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the "login" user, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/users/{login:" + Constants.LOGIN_REGEX + "}")
    public ResponseEntity<UserDTO> getUser(@PathVariable String login) {
        log.debug("REST request to get User : {}", login);
        return wrapOrNotFound(
            userService.getUserWithAuthoritiesByLogin(login)
                .map(UserDTO::new));
    }

    /**
     * {@code GET /users/:login/tracks} : get the tracks of the desired user.
     *
     * @param login the login of the user to find.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tracks of the desired user, or with status {@code 404 (Not Found)}.
     */
    @ApiOperation(
        value = "Shows user tracks by login",
        notes = "Shows all the tracks of user given the login"
    )
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "Successful operation")
    })
    @GetMapping("/users/{login:" + Constants.LOGIN_REGEX + "}/tracks")
    public ResponseEntity<List<TrackDTO>> getTracksOfUser(@PathVariable String login, UserTrackCriteriaDTO criteria, Pageable pageable) {
        log.debug("REST request to get {} user tracks", login);
        final Page<TrackDTO> page = trackQueryService.findByCriteria(criteria, login, pageable);

        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET /users/:login/playlists} : get the playlists of the desired user.
     *
     * @param login the login of the user to find.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the playlists of the desired user, or with status {@code 404 (Not Found)}.
     */
    @ApiOperation(
        value = "Shows user playlists by login",
        notes = "Only shows public accessible playlists. If the current user has ADMIN role it shows all the playlists of the user"
    )
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "Successful operation")
    })
    @GetMapping("/users/{login:" + Constants.LOGIN_REGEX + "}/playlists")
    public ResponseEntity<List<PlaylistDTO>> getPlaylistsOfUser(@PathVariable String login) {
        log.debug("REST request to get {} user playlists", login);
        List<PlaylistDTO> playlists = playlistService.findAllByUserLogin(login);
        return ok(playlists);
    }

    /**
     * {@code PUT /users/:login/follow} : follow the desired user.
     *
     * @param login the login of the user to find.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the followDTO, or with status {@code 404 (Not Found)}.
     */
    @ApiOperation(
        value = "Follow the desired user",
        notes = "This method is a toggle. It means that if you need to 'unfollow' make the same request and the result will be false."
    )
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "Successful operation"),
        @ApiResponse(code = 400, message = "User makes a bad request"),
        @ApiResponse(code = 404, message = "User not found"),
    })
    @PutMapping("/users/{login:" + Constants.LOGIN_REGEX + "}/follow")
    public ResponseEntity<FollowDTO> toggleFollowUser(@PathVariable String login) {
        log.debug("REST request to follow the user {}", login);
        FollowDTO followDTO = followService.toggleFollowUser(login);
        return ok(followDTO);
    }

    /**
     * {@code GET /users/:login/follow} : Check if the current user follows the user.
     *
     * @param login the login of the user to find.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the followDTO, or with status {@code 404 (Not Found)}.
     */
    @ApiOperation(
        value = "Check if following",
        notes = "Checks if the current user follows the user"
    )
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "Successful operation"),
        @ApiResponse(code = 400, message = "User makes a bad request"),
        @ApiResponse(code = 404, message = "User not found")
    })
    @GetMapping("/users/{login:" + Constants.LOGIN_REGEX + "}/follow")
    public ResponseEntity<FollowDTO> checkFollowUser(@PathVariable String login) {
        log.debug("REST request to check if current user follows the user {}", login);
        FollowDTO followDTO = followService.checkCurrentUserFollowUser(login);
        return ok(followDTO);
    }

    /**
     * {@code GET /users/:login/followers} : get the "followers" user.
     *
     * @param login the login of the user to find.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the "login" user, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/users/{login:" + Constants.LOGIN_REGEX + "}/followers")
    public ResponseEntity<List<UserDTO>> getFollowersByLogin(@PathVariable String login) {
        log.debug("REST request to get followers of the User : {}", login);
        return ok(followService.findFollowersByLogin(login));
    }

    /**
     * {@code GET /users/:login/following} : get the "following" users that is following.
     *
     * @param login the login of the user to find.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the "login" user, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/users/{login:" + Constants.LOGIN_REGEX + "}/following")
    public ResponseEntity<List<UserDTO>> getFollowingsByLogin(@PathVariable String login) {
        log.debug("REST request to get following of the User : {}", login);
        return ok(followService.findFollowingsByLogin(login));
    }


    /**
     * {@code DELETE /users/:login} : delete the "login" User.
     *
     * @param login the login of the user to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/users/{login:" + Constants.LOGIN_REGEX + "}")
    @PreAuthorize("hasRole(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<Void> deleteUser(@PathVariable String login) {
        log.debug("REST request to delete User: {}", login);
        userDeleteService.removeUser(login);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createAlert(applicationName, "userManagement.deleted", login))
            .build();
    }

}
