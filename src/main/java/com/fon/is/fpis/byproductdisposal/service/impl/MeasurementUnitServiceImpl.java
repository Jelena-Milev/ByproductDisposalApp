package com.fon.is.fpis.byproductdisposal.service.impl;

import com.fon.is.fpis.byproductdisposal.dto.MeasurementUnitDto;
import com.fon.is.fpis.byproductdisposal.mapper.MeasurementUnitMapper;
import com.fon.is.fpis.byproductdisposal.model.MeasurementUnit;
import com.fon.is.fpis.byproductdisposal.repository.MeasurementUnitRepository;
import com.fon.is.fpis.byproductdisposal.service.MeasurementUnitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
    public List<MeasurementUnitDto> getAll() {
        List<MeasurementUnit> measurementUnits = repository.findAll();
        List<MeasurementUnitDto> measurementUnitDtos = new ArrayList<>(measurementUnits.size());
        measurementUnits.forEach(unit -> measurementUnitDtos.add(mapper.mapToDto(unit)));
        return measurementUnitDtos;
    }
}
