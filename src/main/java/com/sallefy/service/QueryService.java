package com.sallefy.service;

import com.sallefy.service.dto.criteria.BaseCriteria;

import java.util.List;

public interface QueryService<D, C extends BaseCriteria> {

    List<D> findByCriteria(C criteria);

}
