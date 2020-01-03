package com.sallefy.service.dto;

import com.sallefy.service.dto.constraints.Latitude;
import com.sallefy.service.dto.constraints.Longitude;
import io.swagger.annotations.ApiModel;

@ApiModel(value = "LatLong", description = "A DTO to representing a coordinate")
public class LatLongDTO {

    @Latitude
    private Double latitude;

    @Longitude
    private Double longitude;

    public LatLongDTO() {
    }

    public LatLongDTO(Double latitude, Double longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    @Override
    public String toString() {
        return "LatLongDTO{" +
            "latitude=" + latitude +
            ", longitude=" + longitude +
            '}';
    }
}
