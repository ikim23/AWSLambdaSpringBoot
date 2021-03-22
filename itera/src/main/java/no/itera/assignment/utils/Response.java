package no.itera.assignment.utils;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class Response<T> extends ResponseEntity<Envelope<T>> {
    Response(Envelope<T> body, HttpStatus status) {
        super(body, status);
    }
}
