package com.fon.is.fpis.byproductdisposal.dto.request;

import lombok.*;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.math.BigDecimal;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class ItemRequestDto {
    @NotNull(message = "Id nusproizvoda mora biti unet")
    @Positive(message = "Id nusproizvoda mora biti validan id")
    private Long byproductId;
    @NotNull(message = "Količina za odlaganje mora biti uneta")
    @Positive(message = "Količina za odlaganje mora biti veća od 0")
    private BigDecimal quantityForDisposal;
}
