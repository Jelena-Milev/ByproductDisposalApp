package com.fon.is.fpis.byproductdisposal.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class MeasurementUnitDto {
    private Long id;
    private String name;
    private String abbreviation;
}
