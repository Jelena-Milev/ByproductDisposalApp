package com.fon.is.fpis.byproductdisposal.repository;

import com.fon.is.fpis.byproductdisposal.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}
