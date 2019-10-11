package com.sallefy.service.dto;

import java.io.Serializable;

public class LocationDTO implements Serializable {

    private Double latitude;
    private Double longitude;
    private String ip;
    private String client;

    public LocationDTO() {
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

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public String getClient() {
        return client;
    }

    public void setClient(String client) {
        this.client = client;
    }

    @Override
    public String toString() {
        return "LocationDTO{" +
            "latitude=" + latitude +
            ", longitude=" + longitude +
            ", ip='" + ip + '\'' +
            ", client='" + client + '\'' +
            '}';
    }
}
