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
public class ByproductResponseDto {

    private Long id;
    private String name;
    private BigDecimal quantity;
    private BigDecimal weightPerUM;
    private WarehouseDto warehouse;
    private MeasurementUnitDto measurementUnit;
}
