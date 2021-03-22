package no.itera.assignment.utils;

import java.util.Collections;
import java.util.List;

public class Envelope<T> {
    public static <T> Envelope<T> of(T result) {
        return new Envelope<>(result, null);
    }

    public static <T> Envelope<T> error(String reason) {
        return new Envelope<>(null, Collections.singletonList(new Error(reason)));
    }

    private final T result;
    private final List<Error> errors;

    private Envelope(T result, List<Error> errors) {
        this.result = result;
        this.errors = errors;
    }

    public T getResult() {
        return result;
    }

    public List<Error> getErrors() {
        return errors;
    }
}
