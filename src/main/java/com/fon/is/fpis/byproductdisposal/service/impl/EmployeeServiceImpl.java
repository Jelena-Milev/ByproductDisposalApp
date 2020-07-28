package com.fon.is.fpis.byproductdisposal.service.impl;

import com.fon.is.fpis.byproductdisposal.dto.response.EmployeeResponseDto;
import com.fon.is.fpis.byproductdisposal.mapper.EmployeeMapper;
import com.fon.is.fpis.byproductdisposal.model.Employee;
import com.fon.is.fpis.byproductdisposal.repository.EmployeeRepository;
import com.fon.is.fpis.byproductdisposal.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository repository;
    private final EmployeeMapper mapper;

    @Autowired
    public EmployeeServiceImpl(EmployeeRepository repository, EmployeeMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    public List<EmployeeResponseDto> getAll() {
        final List<Employee> employees = repository.findAll();
        return mapper.mapToDtos(employees);
    }
}
