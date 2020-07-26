package com.fon.is.fpis.byproductdisposal.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class ByproductDto {

    private Long id;
    private String name;
    private BigDecimal weightPerUM;
    private Long measurementUnitId;
    private Long warehouseId;
    private BigDecimal quantity;

}
