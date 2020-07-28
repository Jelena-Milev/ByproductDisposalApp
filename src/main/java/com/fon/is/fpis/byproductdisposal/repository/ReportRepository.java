package com.fon.is.fpis.byproductdisposal.repository;

import com.fon.is.fpis.byproductdisposal.model.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReportRepository extends JpaRepository<Report, Long> {

    @Query("select report.id from Report report")
    List<String> getIds();
}
