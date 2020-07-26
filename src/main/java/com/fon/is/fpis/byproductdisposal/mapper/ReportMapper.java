package com.fon.is.fpis.byproductdisposal.mapper;

import com.fon.is.fpis.byproductdisposal.dto.ReportDto;
import com.fon.is.fpis.byproductdisposal.dto.ReportInfoDto;
import com.fon.is.fpis.byproductdisposal.model.Report;

public interface ReportMapper {

    Report mapToEntity(ReportDto dto);

    ReportInfoDto mapToDto(Report savedReport);
}
