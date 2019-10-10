package com.sallefy.service.impl;

import com.sallefy.service.LocationService;
import com.sallefy.service.dto.LocationDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;

@Service
public class LocationServiceImpl implements LocationService {

    private final RestTemplate restTemplate;

    public LocationServiceImpl() {
        this.restTemplate = new RestTemplate();
    }

    @Override
    public LocationDTO locate(HttpServletRequest servletRequest) {
        return restTemplate.getForObject("https://api.ipgeolocation.io/ipgeo?apiKey=1d807da75e0e4f179bad51a4204100f5&ip=8.8.8.8&fields=latitude,longitude", LocationDTO.class);
    }

}
