package com.sallefy.service.impl;

import com.sallefy.service.LocationService;
import com.sallefy.service.dto.LocationDTO;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;

import static org.springframework.web.util.UriComponentsBuilder.fromHttpUrl;

@Service
public class LocationServiceImpl implements LocationService {

    private final String API_KEY_KEY = "apiKey";
    private final String API_FIELDS_KEY = "fields";
    private final String API_IP_KEY = "ip";

    private final RestTemplate restTemplate;

    public LocationServiceImpl(RestTemplateBuilder restTemplateBuilder) {
        this.restTemplate = restTemplateBuilder.build();
    }

    @Override
    public LocationDTO locate(HttpServletRequest request) {

        UriComponentsBuilder builder = fromHttpUrl("https://api.ipgeolocation.io/ipgeo")
            .queryParam(API_KEY_KEY, "1d807da75e0e4f179bad51a4204100f5")
            .queryParam(API_IP_KEY, request.getRemoteAddr())
            .queryParam(API_FIELDS_KEY, "latitude,longitude");

        return restTemplate.getForObject(builder.toUriString(), LocationDTO.class);
    }

}
