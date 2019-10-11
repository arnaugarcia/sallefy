package com.sallefy.config.restTemplate;

import com.sallefy.service.exception.ExternalClientError;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.client.ResponseErrorHandler;

import java.io.IOException;

import static org.springframework.http.HttpStatus.Series.CLIENT_ERROR;
import static org.springframework.http.HttpStatus.Series.SERVER_ERROR;

@Component
public class RestTemplateResponseErrorHandler implements ResponseErrorHandler {

    @Override
    public boolean hasError(ClientHttpResponse response) throws IOException {
        return (isClientError(response) || isServerError(response));
    }

    @Override
    public void handleError(ClientHttpResponse response) {
        throw new ExternalClientError();
    }


    private boolean isServerError(ClientHttpResponse httpResponse) throws IOException {
        return httpResponse.getStatusCode().series() == SERVER_ERROR;
    }

    private boolean isClientError(ClientHttpResponse httpResponse) throws IOException {
        return httpResponse.getStatusCode().series() == CLIENT_ERROR;
    }
}
