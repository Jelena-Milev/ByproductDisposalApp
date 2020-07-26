package com.fon.is.fpis.byproductdisposal.mapper;

import com.fon.is.fpis.byproductdisposal.dto.MeasurementUnitDto;
import com.fon.is.fpis.byproductdisposal.model.MeasurementUnit;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MeasurementUnitMapper {

    MeasurementUnitDto mapToDto(MeasurementUnit measurementUnit);
}
