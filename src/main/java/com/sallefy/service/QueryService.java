package com.sallefy.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.io.Serializable;

public interface QueryService<D, C extends Serializable> {

    Page<D> findByCriteria(C criteria, Pageable pageable);

}
