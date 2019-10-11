package com.sallefy.service;

import com.sallefy.service.dto.LocationDTO;

import javax.servlet.http.HttpServletRequest;

/**
 * Service for searching location using a servlet request
 */
public interface LocationService {

    LocationDTO locate(HttpServletRequest servletRequest);
}
