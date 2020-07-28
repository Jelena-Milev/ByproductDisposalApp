package com.fon.is.fpis.byproductdisposal.mapper;

import com.fon.is.fpis.byproductdisposal.dto.MeasurementUnitDto;
import com.fon.is.fpis.byproductdisposal.model.MeasurementUnit;
import com.fon.is.fpis.byproductdisposal.repository.MeasurementUnitRepository;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(componentModel = "spring")
public abstract class MeasurementUnitMapper {

    @Autowired
    protected MeasurementUnitRepository repository;

    public abstract MeasurementUnitDto mapToDto(MeasurementUnit measurementUnit);

    public MeasurementUnit mapToEntity(Long measurementUnitId){
        return repository.findById(measurementUnitId).get();
    }
}
