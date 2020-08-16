package com.fon.is.fpis.byproductdisposal.repository;

import com.fon.is.fpis.byproductdisposal.model.Report;
import com.fon.is.fpis.byproductdisposal.model.ReportItem;
import com.fon.is.fpis.byproductdisposal.model.Warehouse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface ReportRepository extends JpaRepository<Report, Long> {

    @Query("select report.id from Report report")
    List<Long> getIds();

    boolean existsByDateAndWarehouseAndUtilizationRate(LocalDate date, Warehouse warehouse, BigDecimal utilizationRate);
}
