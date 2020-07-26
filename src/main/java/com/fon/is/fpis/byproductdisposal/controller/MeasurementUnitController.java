package com.fon.is.fpis.byproductdisposal.controller;

import static org.springframework.http.MediaType.*;
import com.fon.is.fpis.byproductdisposal.dto.MeasurementUnitDto;
import com.fon.is.fpis.byproductdisposal.service.MeasurementUnitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "measurement-unit")
public class MeasurementUnitController {

    private final MeasurementUnitService service;

    @Autowired
    public MeasurementUnitController(MeasurementUnitService service) {
        this.service = service;
    }

    @GetMapping(produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<List<MeasurementUnitDto>> getAll(){
        List<MeasurementUnitDto> result = service.getAll();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
