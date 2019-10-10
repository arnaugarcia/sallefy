package com.sallefy.service.impl;

import com.sallefy.service.LocationService;
import com.sallefy.service.dto.LocationDTO;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@Service
public class LocationServiceImpl implements LocationService {

    private final String API_KEY_KEY = "apiKey";
    private final String API_FIELDS_KEY = "fields";
    private final String API_IP_KEY = "ip";

    private final RestTemplate restTemplate;

    public LocationServiceImpl(RestTemplateBuilder builder) {
        this.restTemplate = builder
            .rootUri("https://api.ipgeolocation.io/")
            .build();
    }

    @Override
    public LocationDTO locate(HttpServletRequest request) {
        Map<String, String> vars = new HashMap<>();

        vars.put(API_KEY_KEY, "");
        vars.put(API_IP_KEY, request.getRemoteAddr());
        vars.put(API_FIELDS_KEY, "latitude,longitude");

        return restTemplate.getForObject("ipgeo", LocationDTO.class, vars);
    }

}
