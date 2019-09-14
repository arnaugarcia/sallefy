package com.sallefy.service.impl;

import com.sallefy.service.FollowUserService;
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
public class FollowUserServiceImpl implements FollowUserService {

    private final Logger log = LoggerFactory.getLogger(FollowUserServiceImpl.class);

    private final FollowUserRepository followUserRepository;

    private final FollowUserMapper followUserMapper;

    public FollowUserServiceImpl(FollowUserRepository followUserRepository, FollowUserMapper followUserMapper) {
        this.followUserRepository = followUserRepository;
        this.followUserMapper = followUserMapper;
    }

    /**
     * Save a followUser.
     *
     * @param followUserDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
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
    @Override
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
    @Override
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
    @Override
    public void delete(Long id) {
        log.debug("Request to delete FollowUser : {}", id);
        followUserRepository.deleteById(id);
    }
}
