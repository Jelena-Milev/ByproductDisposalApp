package com.fon.is.fpis.byproductdisposal.dto.request;

import lombok.*;

import javax.validation.Valid;
import javax.validation.constraints.Max;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class ReportRequestDto {
    @NotNull(message = "Datum mora biti unet")
    private LocalDate date;
    @NotNull(message = "Procenat iskorišćenosti mora biti unet")
    @Positive(message = "Procenat iskorišćenosti mora biti veći od 0")
    @Max(value = 100, message = "Procenat iskorišćenosti mora biti maksimalno 100")
    private BigDecimal utilizationRate;
    private String note;
    @NotNull(message = "Id skladišta biti unet")
    private Long warehouseId;
    @NotNull(message = "Id zaposlenog biti unet")
    private Long employeeId;
    @NotNull(message = "Stavke izveštaja moraju biti unete")
    @NotEmpty(message = "Izveštaj mora imati barem jednu stavku")
    private List<@Valid ItemRequestDto> items;
}
