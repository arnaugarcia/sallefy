package com.sallefy.web.rest;

import com.sallefy.service.LikeUserService;
import com.sallefy.web.rest.errors.BadRequestAlertException;
import com.sallefy.service.dto.LikeUserDTO;

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
 * REST controller for managing {@link com.sallefy.domain.LikeUser}.
 */
@RestController
@RequestMapping("/api")
public class LikeUserResource {

    private final Logger log = LoggerFactory.getLogger(LikeUserResource.class);

    private static final String ENTITY_NAME = "likeUser";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LikeUserService likeUserService;

    public LikeUserResource(LikeUserService likeUserService) {
        this.likeUserService = likeUserService;
    }

    /**
     * {@code POST  /like-users} : Create a new likeUser.
     *
     * @param likeUserDTO the likeUserDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new likeUserDTO, or with status {@code 400 (Bad Request)} if the likeUser has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/like-users")
    public ResponseEntity<LikeUserDTO> createLikeUser(@RequestBody LikeUserDTO likeUserDTO) throws URISyntaxException {
        log.debug("REST request to save LikeUser : {}", likeUserDTO);
        if (likeUserDTO.getId() != null) {
            throw new BadRequestAlertException("A new likeUser cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LikeUserDTO result = likeUserService.save(likeUserDTO);
        return ResponseEntity.created(new URI("/api/like-users/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /like-users} : Updates an existing likeUser.
     *
     * @param likeUserDTO the likeUserDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated likeUserDTO,
     * or with status {@code 400 (Bad Request)} if the likeUserDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the likeUserDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/like-users")
    public ResponseEntity<LikeUserDTO> updateLikeUser(@RequestBody LikeUserDTO likeUserDTO) throws URISyntaxException {
        log.debug("REST request to update LikeUser : {}", likeUserDTO);
        if (likeUserDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        LikeUserDTO result = likeUserService.save(likeUserDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, likeUserDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /like-users} : get all the likeUsers.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of likeUsers in body.
     */
    @GetMapping("/like-users")
    public List<LikeUserDTO> getAllLikeUsers() {
        log.debug("REST request to get all LikeUsers");
        return likeUserService.findAll();
    }

    /**
     * {@code GET  /like-users/:id} : get the "id" likeUser.
     *
     * @param id the id of the likeUserDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the likeUserDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/like-users/{id}")
    public ResponseEntity<LikeUserDTO> getLikeUser(@PathVariable Long id) {
        log.debug("REST request to get LikeUser : {}", id);
        Optional<LikeUserDTO> likeUserDTO = likeUserService.findOne(id);
        return ResponseUtil.wrapOrNotFound(likeUserDTO);
    }

    /**
     * {@code DELETE  /like-users/:id} : delete the "id" likeUser.
     *
     * @param id the id of the likeUserDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/like-users/{id}")
    public ResponseEntity<Void> deleteLikeUser(@PathVariable Long id) {
        log.debug("REST request to delete LikeUser : {}", id);
        likeUserService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
