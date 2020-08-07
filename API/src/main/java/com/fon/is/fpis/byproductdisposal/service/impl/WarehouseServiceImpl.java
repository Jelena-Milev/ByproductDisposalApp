package com.fon.is.fpis.byproductdisposal.service.impl;

import com.fon.is.fpis.byproductdisposal.dto.response.WarehouseResponseDto;
import com.fon.is.fpis.byproductdisposal.mapper.WarehouseMapper;
import com.fon.is.fpis.byproductdisposal.model.Warehouse;
import com.fon.is.fpis.byproductdisposal.repository.WarehouseRepository;
import com.fon.is.fpis.byproductdisposal.service.WarehouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WarehouseServiceImpl implements WarehouseService {

    private final WarehouseRepository repository;
    private final WarehouseMapper mapper;

    @Autowired
    public WarehouseServiceImpl(WarehouseRepository repository, WarehouseMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    public List<WarehouseResponseDto> getAll() {
        List<Warehouse> warehouses = repository.findAll();
        return mapper.mapToDtos(warehouses);
    }

    @Override
    public WarehouseResponseDto get(Long id) {
        Warehouse warehouse = repository.findById(id).get();
        return mapper.mapToDto(warehouse);
    }
}
