package no.itera.assignment.utils;

import org.springframework.http.HttpStatus;

public abstract class BaseController {
    public <T> Response<T> ok(T result) {
        return new Response<>(Envelope.of(result), HttpStatus.OK);
    }

    public <T> Response<T> notFound(String error) {
        return new Response<>(Envelope.error(error), HttpStatus.NOT_FOUND);
    }
}
