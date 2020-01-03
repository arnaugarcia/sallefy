package com.sallefy.service.dto.builder;

import com.sallefy.service.dto.LatLongDTO;

public class LatLongDTOBuilder {
    private Double latitude;
    private Double longitude;

    public static LatLongDTOBuilder aLatLongDTO() {
        return new LatLongDTOBuilder();
    }

    public LatLongDTOBuilder withLatitude(Double latitude) {
        this.latitude = latitude;
        return this;
    }

    public LatLongDTOBuilder withLongitude(Double longitude) {
        this.longitude = longitude;
        return this;
    }

    public LatLongDTO build() {
        return new LatLongDTO(latitude, longitude);
    }
}
