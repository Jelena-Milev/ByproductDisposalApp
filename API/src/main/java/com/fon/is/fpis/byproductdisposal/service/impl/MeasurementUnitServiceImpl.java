package com.fon.is.fpis.byproductdisposal.service.impl;

import com.fon.is.fpis.byproductdisposal.dto.response.MeasurementUnitResponseDto;
import com.fon.is.fpis.byproductdisposal.exception.EntityNotFoundException;
import com.fon.is.fpis.byproductdisposal.mapper.MeasurementUnitMapper;
import com.fon.is.fpis.byproductdisposal.model.MeasurementUnit;
import com.fon.is.fpis.byproductdisposal.repository.MeasurementUnitRepository;
import com.fon.is.fpis.byproductdisposal.service.MeasurementUnitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MeasurementUnitServiceImpl implements MeasurementUnitService {

    private final MeasurementUnitRepository repository;
    private final MeasurementUnitMapper mapper;

    @Autowired
    public MeasurementUnitServiceImpl(MeasurementUnitRepository repository, MeasurementUnitMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    public List<MeasurementUnitResponseDto> getAll() {
        List<MeasurementUnit> measurementUnits = repository.findAll();
        return mapper.mapToDtos(measurementUnits);
    }

    @Override
    public MeasurementUnitResponseDto get(Long id) {
        final MeasurementUnit measurementUnit = repository.findById(id).orElseThrow(()->new EntityNotFoundException("Merna jedinica", id));
        return mapper.mapToDto(measurementUnit);
    }
}
