package com.fon.is.fpis.byproductdisposal.service.impl;

import com.fon.is.fpis.byproductdisposal.dto.request.ByproductRequestDto;
import com.fon.is.fpis.byproductdisposal.dto.response.ByproductResponseDto;
import com.fon.is.fpis.byproductdisposal.exception.EntityAlreadyExistsException;
import com.fon.is.fpis.byproductdisposal.exception.EntityNotFoundException;
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
        final Byproduct byproduct = repository.findById(id).orElseThrow(()->new EntityNotFoundException("Nusproizvod", id));
        return mapper.mapToDto(byproduct);
    }

    @Override
    public ByproductResponseDto save(ByproductRequestDto byproductRequestDto) {
        if(repository.existsByName(byproductRequestDto.getName()))
            throw new EntityAlreadyExistsException("Nusproizvod");
        final Byproduct byproductToSave = mapper.map(byproductRequestDto);
        final Byproduct byproduct = repository.save(byproductToSave);
        return mapper.mapToDto(byproduct);
    }

    @Override
    public ByproductResponseDto update(Long id, ByproductRequestDto byproductRequestDto) {
        final Byproduct byproductToUpdate = repository.findById(id).orElseThrow(()->new EntityNotFoundException("Nusproizvod", byproductRequestDto.getId()));
        if(repository.existsByName(byproductRequestDto.getName()) && !byproductRequestDto.getName().equals(byproductToUpdate.getName()))
            throw new EntityAlreadyExistsException("Nusproizvod");
        mapper.updateByproduct(byproductRequestDto, byproductToUpdate);
        final Byproduct byproduct = repository.save(byproductToUpdate);
        return mapper.mapToDto(byproduct);
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }

}
