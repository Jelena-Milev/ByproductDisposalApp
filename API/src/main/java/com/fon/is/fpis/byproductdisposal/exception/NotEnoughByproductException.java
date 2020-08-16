package com.fon.is.fpis.byproductdisposal.exception;

import java.math.BigDecimal;

public class NotEnoughByproductException extends RuntimeException {
    public NotEnoughByproductException(String byproduct, BigDecimal quantity) {

        super(byproduct + ": kolicina za odlaganje moze biti maksimalno " + quantity);
    }
}
