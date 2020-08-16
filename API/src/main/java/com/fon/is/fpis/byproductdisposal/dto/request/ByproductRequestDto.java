package com.fon.is.fpis.byproductdisposal.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.math.BigDecimal;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class ByproductRequestDto {
    private Long id;
    @NotBlank(message = "Naziv nusproizvoda ne sme biti prazan string")
    private String name;
    @Positive(message = "Količina mora biti veća od 0")
    private BigDecimal quantity;
    @NotNull(message = "Težina po jedinici mere mora biti uneta")
    @Positive(message = "Težina po jedinici mere mora biti veća od 0")
    private BigDecimal weightPerUM;
    private Long warehouseId;
    @NotNull(message = "Id merne jedinice mora biti unet")
    @Positive(message = "Id merne jedinice mora biti validan id")
    private Long measurementUnitId;

}
