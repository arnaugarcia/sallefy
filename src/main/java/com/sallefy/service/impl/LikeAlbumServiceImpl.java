package com.sallefy.service.impl;

import com.sallefy.service.LikeAlbumService;
import com.sallefy.domain.LikeAlbum;
import com.sallefy.repository.LikeAlbumRepository;
import com.sallefy.service.dto.LikeAlbumDTO;
import com.sallefy.service.mapper.LikeAlbumMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link LikeAlbum}.
 */
@Service
@Transactional
public class LikeAlbumServiceImpl implements LikeAlbumService {

    private final Logger log = LoggerFactory.getLogger(LikeAlbumServiceImpl.class);

    private final LikeAlbumRepository likeAlbumRepository;

    private final LikeAlbumMapper likeAlbumMapper;

    public LikeAlbumServiceImpl(LikeAlbumRepository likeAlbumRepository, LikeAlbumMapper likeAlbumMapper) {
        this.likeAlbumRepository = likeAlbumRepository;
        this.likeAlbumMapper = likeAlbumMapper;
    }

    /**
     * Save a likeAlbum.
     *
     * @param likeAlbumDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public LikeAlbumDTO save(LikeAlbumDTO likeAlbumDTO) {
        log.debug("Request to save LikeAlbum : {}", likeAlbumDTO);
        LikeAlbum likeAlbum = likeAlbumMapper.toEntity(likeAlbumDTO);
        likeAlbum = likeAlbumRepository.save(likeAlbum);
        return likeAlbumMapper.toDto(likeAlbum);
    }

    /**
     * Get all the likeAlbums.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<LikeAlbumDTO> findAll() {
        log.debug("Request to get all LikeAlbums");
        return likeAlbumRepository.findAll().stream()
            .map(likeAlbumMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one likeAlbum by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<LikeAlbumDTO> findOne(Long id) {
        log.debug("Request to get LikeAlbum : {}", id);
        return likeAlbumRepository.findById(id)
            .map(likeAlbumMapper::toDto);
    }

    /**
     * Delete the likeAlbum by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete LikeAlbum : {}", id);
        likeAlbumRepository.deleteById(id);
    }
}
