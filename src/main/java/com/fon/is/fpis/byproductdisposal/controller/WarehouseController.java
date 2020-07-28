package com.fon.is.fpis.byproductdisposal.controller;

import com.fon.is.fpis.byproductdisposal.dto.WarehouseDto;
import com.fon.is.fpis.byproductdisposal.service.WarehouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping(path = "warehouse")
public class WarehouseController {

    private final WarehouseService service;

    @Autowired
    public WarehouseController(WarehouseService service) {
        this.service = service;
    }


    @GetMapping(produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<List<WarehouseDto>> getAll() {
        List<WarehouseDto> result = service.getAll();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
