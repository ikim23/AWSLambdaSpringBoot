package no.itera.assignment.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;

import javax.servlet.http.HttpServletRequest;

@ControllerAdvice
public class GlobalExceptionHandler {
    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @org.springframework.web.bind.annotation.ExceptionHandler(Exception.class)
    protected ResponseEntity<Envelope<Void>> handle(Exception ex, HttpServletRequest request) {
        log.error(ex.getMessage(), ex);

        return new Response<>(Envelope.error(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
