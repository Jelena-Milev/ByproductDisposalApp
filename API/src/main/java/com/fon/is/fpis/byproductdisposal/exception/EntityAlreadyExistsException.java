package com.fon.is.fpis.byproductdisposal.exception;

public class EntityAlreadyExistsException extends RuntimeException {

    public EntityAlreadyExistsException(String entityName) {

        super(entityName + " vec postoji");
    }
}
