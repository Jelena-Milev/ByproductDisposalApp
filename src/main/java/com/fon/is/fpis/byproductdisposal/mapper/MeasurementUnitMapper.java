package com.fon.is.fpis.byproductdisposal.mapper;

import com.fon.is.fpis.byproductdisposal.dto.response.MeasurementUnitResponseDto;
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

    public MeasurementUnit mapToEntity(Long measurementUnitId){
        return repository.findById(measurementUnitId).get();
    }

    public abstract List<MeasurementUnitResponseDto> mapToDtos(List<MeasurementUnit> measurementUnits);
}
