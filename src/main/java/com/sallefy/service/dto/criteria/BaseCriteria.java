package com.sallefy.service.dto.criteria;

public abstract class BaseCriteria {

    private final Integer size;

    public BaseCriteria(Integer size) {
        this.size = size;
    }

    public Integer getSize() {
        return size;
    }

}
