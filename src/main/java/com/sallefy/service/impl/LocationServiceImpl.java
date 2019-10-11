package com.sallefy.service.impl;

import com.sallefy.config.ApplicationProperties;
import com.sallefy.config.ApplicationProperties.Services.GeoLocation;
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

    private final ApplicationProperties applicationProperties;

    public LocationServiceImpl(RestTemplateBuilder restTemplateBuilder, ApplicationProperties applicationProperties) {
        this.restTemplate = restTemplateBuilder.build();
        this.applicationProperties = applicationProperties;
    }

    @Override
    public LocationDTO locate(HttpServletRequest request) {

        UriComponentsBuilder builder = buildUriParams(request);

        return restTemplate.getForObject(builder.toUriString(), LocationDTO.class);
    }

    private UriComponentsBuilder buildUriParams(HttpServletRequest request) {
        final GeoLocation geolocationProperties = applicationProperties.services.geoLocation;
        
        return fromHttpUrl(geolocationProperties.getHost())
            .queryParam(API_KEY_KEY, geolocationProperties.getApiKey())
            .queryParam(API_IP_KEY, request.getRemoteAddr())
            .queryParam(API_FIELDS_KEY, geolocationProperties.getParams());
    }

}
