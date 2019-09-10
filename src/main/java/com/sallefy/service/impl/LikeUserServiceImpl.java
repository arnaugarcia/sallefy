package com.sallefy.service.impl;

import com.sallefy.service.LikeUserService;
import com.sallefy.domain.LikeUser;
import com.sallefy.repository.LikeUserRepository;
import com.sallefy.service.dto.LikeUserDTO;
import com.sallefy.service.mapper.LikeUserMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link LikeUser}.
 */
@Service
@Transactional
public class LikeUserServiceImpl implements LikeUserService {

    private final Logger log = LoggerFactory.getLogger(LikeUserServiceImpl.class);

    private final LikeUserRepository likeUserRepository;

    private final LikeUserMapper likeUserMapper;

    public LikeUserServiceImpl(LikeUserRepository likeUserRepository, LikeUserMapper likeUserMapper) {
        this.likeUserRepository = likeUserRepository;
        this.likeUserMapper = likeUserMapper;
    }

    /**
     * Save a likeUser.
     *
     * @param likeUserDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public LikeUserDTO save(LikeUserDTO likeUserDTO) {
        log.debug("Request to save LikeUser : {}", likeUserDTO);
        LikeUser likeUser = likeUserMapper.toEntity(likeUserDTO);
        likeUser = likeUserRepository.save(likeUser);
        return likeUserMapper.toDto(likeUser);
    }

    /**
     * Get all the likeUsers.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<LikeUserDTO> findAll() {
        log.debug("Request to get all LikeUsers");
        return likeUserRepository.findAll().stream()
            .map(likeUserMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one likeUser by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<LikeUserDTO> findOne(Long id) {
        log.debug("Request to get LikeUser : {}", id);
        return likeUserRepository.findById(id)
            .map(likeUserMapper::toDto);
    }

    /**
     * Delete the likeUser by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete LikeUser : {}", id);
        likeUserRepository.deleteById(id);
    }
}
