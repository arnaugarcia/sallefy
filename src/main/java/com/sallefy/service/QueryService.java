package com.sallefy.service;

import org.springframework.data.domain.Pageable;

import java.io.Serializable;
import java.util.List;

public interface QueryService<D, C extends Serializable> {

    List<D> findByCriteria(C criteria, Pageable pageable);

}
