package com.fon.is.fpis.byproductdisposal.service.impl;

import com.fon.is.fpis.byproductdisposal.dto.ByproductRequestDto;
import com.fon.is.fpis.byproductdisposal.dto.ByproductResponseDto;
import com.fon.is.fpis.byproductdisposal.mapper.ByproductMapper;
import com.fon.is.fpis.byproductdisposal.model.Byproduct;
import com.fon.is.fpis.byproductdisposal.repository.ByproductRepository;
import com.fon.is.fpis.byproductdisposal.service.ByproductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ByproductServiceImpl implements ByproductService {

    private final ByproductRepository repository;
    private final ByproductMapper mapper;

    @Autowired
    public ByproductServiceImpl(ByproductRepository repository, ByproductMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }


    @Override
    public List<ByproductResponseDto> getAll() {
        List<Byproduct> byproducts = repository.findAll();
        return mapper.mapToDtos(byproducts);
    }

    @Override
    public ByproductResponseDto get(Long id) {
        final Byproduct byproduct = repository.findById(id).get();
        return mapper.mapToDto(byproduct);
    }

    @Override
    public ByproductResponseDto save(ByproductRequestDto byproductRequestDto) {
        final Byproduct byproductToSave = mapper.map(byproductRequestDto);
        final Byproduct byproduct = repository.save(byproductToSave);
        return mapper.mapToDto(byproduct);
    }

    @Override
    public ByproductResponseDto update(Long id, ByproductRequestDto byproductRequestDto) {
        final Byproduct byproductToUpdate = repository.findById(id).get();
        mapper.updateByproduct(byproductRequestDto, byproductToUpdate);
        final Byproduct byproduct = repository.save(byproductToUpdate);
        return mapper.mapToDto(byproduct);
    }

}
