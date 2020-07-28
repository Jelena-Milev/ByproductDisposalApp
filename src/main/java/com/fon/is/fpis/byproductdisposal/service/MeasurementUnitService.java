package com.fon.is.fpis.byproductdisposal.service;

import com.fon.is.fpis.byproductdisposal.dto.response.MeasurementUnitResponseDto;

import java.util.List;

public interface MeasurementUnitService {
    List<MeasurementUnitResponseDto> getAll();
}
