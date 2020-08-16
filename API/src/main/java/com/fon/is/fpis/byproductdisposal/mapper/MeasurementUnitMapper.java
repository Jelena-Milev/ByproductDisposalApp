package com.fon.is.fpis.byproductdisposal.mapper;

import com.fon.is.fpis.byproductdisposal.dto.response.MeasurementUnitResponseDto;
import com.fon.is.fpis.byproductdisposal.exception.EntityNotFoundException;
import com.fon.is.fpis.byproductdisposal.model.MeasurementUnit;
import com.fon.is.fpis.byproductdisposal.repository.MeasurementUnitRepository;
import org.mapstruct.Mapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Mapper(componentModel = "spring")
public abstract class MeasurementUnitMapper {

    @Autowired
    protected MeasurementUnitRepository repository;

    public abstract MeasurementUnitResponseDto mapToDto(MeasurementUnit measurementUnit);

    public MeasurementUnit mapToEntity(Long measurementUnitId) {
        if (measurementUnitId == null)
            return null;
        return repository.findById(measurementUnitId).orElseThrow(() -> new EntityNotFoundException("Merna jedinica", measurementUnitId));

    }

    public abstract List<MeasurementUnitResponseDto> mapToDtos(List<MeasurementUnit> measurementUnits);
}
