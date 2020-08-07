package com.fon.is.fpis.byproductdisposal.service;

import com.fon.is.fpis.byproductdisposal.dto.response.MeasurementUnitResponseDto;
import com.fon.is.fpis.byproductdisposal.model.MeasurementUnit;

import java.util.List;

public interface MeasurementUnitService {
    List<MeasurementUnitResponseDto> getAll();

    MeasurementUnitResponseDto get(Long id);
}
