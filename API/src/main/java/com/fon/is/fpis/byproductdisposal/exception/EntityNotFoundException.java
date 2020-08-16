package com.fon.is.fpis.byproductdisposal.exception;

public class EntityNotFoundException extends RuntimeException {

    public EntityNotFoundException(String entityName, Long id) {
        super(entityName + " sa id-em: " + id + " ne postoji");
    }
}
