package com.sallefy.service.impl;

import com.sallefy.service.AlbumService;
import com.sallefy.domain.Album;
import com.sallefy.repository.AlbumRepository;
import com.sallefy.service.dto.AlbumDTO;
import com.sallefy.service.exception.AlbumNotFoundException;
import com.sallefy.service.mapper.AlbumMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Album}.
 */
@Service
@Transactional
public class AlbumServiceImpl implements AlbumService {

    private final Logger log = LoggerFactory.getLogger(AlbumServiceImpl.class);

    private final AlbumRepository albumRepository;

    private final AlbumMapper albumMapper;

    public AlbumServiceImpl(AlbumRepository albumRepository, AlbumMapper albumMapper) {
        this.albumRepository = albumRepository;
        this.albumMapper = albumMapper;
    }

    /**
     * Save a album.
     *
     * @param albumDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public AlbumDTO save(AlbumDTO albumDTO) {
        log.debug("Request to save Album : {}", albumDTO);
        Album album = albumMapper.toEntity(albumDTO);
        album = albumRepository.save(album);
        return albumMapper.toDto(album);
    }

    /**
     * Get all the albums.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<AlbumDTO> findAll() {
        log.debug("Request to get all Albums");
        return albumRepository.findAllWithEagerRelationships().stream()
            .map(albumMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get all the albums with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<AlbumDTO> findAllWithEagerRelationships(Pageable pageable) {
        return albumRepository.findAllWithEagerRelationships(pageable).map(albumMapper::toDto);
    }


    /**
     * Get one album by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public AlbumDTO findOne(Long id) {
        log.debug("Request to get Album : {}", id);
        return albumRepository.findOneWithEagerRelationships(id)
            .map(albumMapper::toDto)
            .orElseThrow(AlbumNotFoundException::new);
    }

    /**
     * Delete the album by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Album : {}", id);
        albumRepository.deleteById(id);
    }
}
