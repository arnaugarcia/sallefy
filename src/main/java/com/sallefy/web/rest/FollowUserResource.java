package com.sallefy.web.rest;

import com.sallefy.service.FollowUserService;
import com.sallefy.web.rest.errors.BadRequestAlertException;
import com.sallefy.service.dto.FollowUserDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.sallefy.domain.FollowUser}.
 */
@RestController
@RequestMapping("/api")
public class FollowUserResource {

    private final Logger log = LoggerFactory.getLogger(FollowUserResource.class);

    private static final String ENTITY_NAME = "followUser";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FollowUserService followUserService;

    public FollowUserResource(FollowUserService followUserService) {
        this.followUserService = followUserService;
    }

    /**
     * {@code POST  /follow-users} : Create a new followUser.
     *
     * @param followUserDTO the followUserDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new followUserDTO, or with status {@code 400 (Bad Request)} if the followUser has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/follow-users")
    public ResponseEntity<FollowUserDTO> createFollowUser(@RequestBody FollowUserDTO followUserDTO) throws URISyntaxException {
        log.debug("REST request to save FollowUser : {}", followUserDTO);
        if (followUserDTO.getId() != null) {
            throw new BadRequestAlertException("A new followUser cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FollowUserDTO result = followUserService.save(followUserDTO);
        return ResponseEntity.created(new URI("/api/follow-users/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /follow-users} : Updates an existing followUser.
     *
     * @param followUserDTO the followUserDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated followUserDTO,
     * or with status {@code 400 (Bad Request)} if the followUserDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the followUserDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/follow-users")
    public ResponseEntity<FollowUserDTO> updateFollowUser(@RequestBody FollowUserDTO followUserDTO) throws URISyntaxException {
        log.debug("REST request to update FollowUser : {}", followUserDTO);
        if (followUserDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FollowUserDTO result = followUserService.save(followUserDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, followUserDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /follow-users} : get all the followUsers.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of followUsers in body.
     */
    @GetMapping("/follow-users")
    public List<FollowUserDTO> getAllFollowUsers() {
        log.debug("REST request to get all FollowUsers");
        return followUserService.findAll();
    }

    /**
     * {@code GET  /follow-users/:id} : get the "id" followUser.
     *
     * @param id the id of the followUserDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the followUserDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/follow-users/{id}")
    public ResponseEntity<FollowUserDTO> getFollowUser(@PathVariable Long id) {
        log.debug("REST request to get FollowUser : {}", id);
        Optional<FollowUserDTO> followUserDTO = followUserService.findOne(id);
        return ResponseUtil.wrapOrNotFound(followUserDTO);
    }

    /**
     * {@code DELETE  /follow-users/:id} : delete the "id" followUser.
     *
     * @param id the id of the followUserDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/follow-users/{id}")
    public ResponseEntity<Void> deleteFollowUser(@PathVariable Long id) {
        log.debug("REST request to delete FollowUser : {}", id);
        followUserService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
