package com.sallefy.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

import javax.validation.constraints.NotBlank;

/**
 * Properties specific to Sallefy.
 * <p>
 * Properties are configured in the {@code application.yml} file.
 * See {@link io.github.jhipster.config.JHipsterProperties} for a good example.
 */
@ConfigurationProperties(prefix = "application", ignoreUnknownFields = false)
public class ApplicationProperties {

    public final Services services = new Services();

    public Services getServices() {
        return services;
    }

    public static class Services {

        public final GeoLocation geoLocation = new GeoLocation();

        public GeoLocation getGeoLocation() {
            return geoLocation;
        }

        public static class GeoLocation {

            @NotBlank
            private String host = "https://api.ipgeolocation.io/ipgeo";

            @NotBlank
            private String apiKey;

            private String params = "latitude,longitude";

            public String getHost() {
                return host;
            }

            public void setHost(String host) {
                this.host = host;
            }

            public String getApiKey() {
                return apiKey;
            }

            public void setApiKey(String apiKey) {
                this.apiKey = apiKey;
            }

            public String getParams() {
                return params;
            }

            public void setParams(String params) {
                this.params = params;
            }
        }

    }
}
