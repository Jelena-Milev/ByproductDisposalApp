package com.fon.is.fpis.byproductdisposal.mapper;

import com.fon.is.fpis.byproductdisposal.dto.response.EmployeeResponseDto;
import com.fon.is.fpis.byproductdisposal.model.Employee;
import com.fon.is.fpis.byproductdisposal.repository.EmployeeRepository;
import org.mapstruct.Mapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Mapper(componentModel = "spring")
public abstract class EmployeeMapper {

    @Autowired
    protected EmployeeRepository repository;

    public abstract EmployeeResponseDto mapToDto(Employee employee);

    public Employee mapToEntity(Long employeeId){
        if(employeeId == null){
            return null;
        }
        return repository.findById(employeeId).get();
    }

    public abstract List<EmployeeResponseDto> mapToDtos(List<Employee> employees);
}
