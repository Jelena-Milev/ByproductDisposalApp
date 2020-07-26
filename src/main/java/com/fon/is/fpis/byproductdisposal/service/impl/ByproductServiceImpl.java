package com.fon.is.fpis.byproductdisposal.service.impl;

import com.fon.is.fpis.byproductdisposal.dto.ByproductDto;
import com.fon.is.fpis.byproductdisposal.dto.ByproductInfoDto;
import com.fon.is.fpis.byproductdisposal.mapper.ByproductMapper;
import com.fon.is.fpis.byproductdisposal.model.Byproduct;
import com.fon.is.fpis.byproductdisposal.model.MeasurementUnit;
import com.fon.is.fpis.byproductdisposal.model.Warehouse;
import com.fon.is.fpis.byproductdisposal.repository.ByproductRepository;
import com.fon.is.fpis.byproductdisposal.repository.MeasurementUnitRepository;
import com.fon.is.fpis.byproductdisposal.repository.WarehouseRepository;
import com.fon.is.fpis.byproductdisposal.service.ByproductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ByproductServiceImpl implements ByproductService {

    private final ByproductRepository repository;
    private final MeasurementUnitRepository measurementUnitRepository;
    private final WarehouseRepository warehouseRepository;
    private final ByproductMapper mapper;

    @Autowired
    public ByproductServiceImpl(ByproductRepository repository, MeasurementUnitRepository measurementUnitRepository, WarehouseRepository warehouseRepository, ByproductMapper mapper) {
        this.repository = repository;
        this.measurementUnitRepository = measurementUnitRepository;
        this.warehouseRepository = warehouseRepository;
        this.mapper = mapper;
    }


    @Override
    public List<ByproductInfoDto> getAll() {
        List<Byproduct> byproducts = repository.findAll();
        List<ByproductInfoDto> byproductInfoDtos = new ArrayList<>(byproducts.size());
        byproducts.forEach(byproduct -> byproductInfoDtos.add(mapper.mapToDto(byproduct)));
        return byproductInfoDtos;
    }

    @Override
    public ByproductInfoDto get(Long id) {
        final Byproduct byproduct = repository.findById(id).get();
        return mapper.mapToDto(byproduct);
    }

    @Override
    public ByproductInfoDto save(ByproductDto byproductDto) {
        final Byproduct byproductToSave = mapper.map(byproductDto);
        final MeasurementUnit measurementUnit = measurementUnitRepository.findById(byproductDto.getMeasurementUnitId()).get();
        byproductToSave.setMeasurementUnit(measurementUnit);
        final Byproduct byproduct = repository.save(byproductToSave);
        return mapper.mapToDto(byproduct);
    }

    @Override
    public ByproductInfoDto update(Long id, ByproductDto byproductDto) {
        final Byproduct byproductToUpdate = repository.findById(id).get();
        byproductToUpdate.setName(byproductDto.getName());
        byproductToUpdate.setQuantity(byproductDto.getQuantity());
        byproductToUpdate.setWeightPerUM(byproductDto.getWeightPerUM());
        final MeasurementUnit measurementUnit = measurementUnitRepository.findById(byproductDto.getMeasurementUnitId()).get();
        final Warehouse warehouse = warehouseRepository.findById(byproductDto.getWarehouseId()).get();
        byproductToUpdate.setMeasurementUnit(measurementUnit);
        byproductToUpdate.setWarehouse(warehouse);
        final Byproduct byproduct = repository.save(byproductToUpdate);
        return mapper.mapToDto(byproduct);
    }

}
