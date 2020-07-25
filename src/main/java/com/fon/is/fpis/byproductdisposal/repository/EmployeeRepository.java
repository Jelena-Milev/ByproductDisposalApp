package com.fon.is.fpis.byproductdisposal.repository;

import com.fon.is.fpis.byproductdisposal.model.Employee;
import org.springframework.data.repository.CrudRepository;

public interface EmployeeRepository extends CrudRepository<Employee, Long> {
}
