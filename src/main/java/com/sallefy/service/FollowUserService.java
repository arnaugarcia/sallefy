package com.sallefy.service;

import com.sallefy.domain.FollowUser;
import com.sallefy.repository.FollowUserRepository;
import com.sallefy.service.dto.FollowUserDTO;
import com.sallefy.service.mapper.FollowUserMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link FollowUser}.
 */
@Service
@Transactional
public class FollowUserService {

    private final Logger log = LoggerFactory.getLogger(FollowUserService.class);

    private final FollowUserRepository followUserRepository;

    private final FollowUserMapper followUserMapper;

    public FollowUserService(FollowUserRepository followUserRepository, FollowUserMapper followUserMapper) {
        this.followUserRepository = followUserRepository;
        this.followUserMapper = followUserMapper;
    }

    /**
     * Save a followUser.
     *
     * @param followUserDTO the entity to save.
     * @return the persisted entity.
     */
    public FollowUserDTO save(FollowUserDTO followUserDTO) {
        log.debug("Request to save FollowUser : {}", followUserDTO);
        FollowUser followUser = followUserMapper.toEntity(followUserDTO);
        followUser = followUserRepository.save(followUser);
        return followUserMapper.toDto(followUser);
    }

    /**
     * Get all the followUsers.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<FollowUserDTO> findAll() {
        log.debug("Request to get all FollowUsers");
        return followUserRepository.findAll().stream()
            .map(followUserMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one followUser by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<FollowUserDTO> findOne(Long id) {
        log.debug("Request to get FollowUser : {}", id);
        return followUserRepository.findById(id)
            .map(followUserMapper::toDto);
    }

    /**
     * Delete the followUser by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete FollowUser : {}", id);
        followUserRepository.deleteById(id);
    }
}
