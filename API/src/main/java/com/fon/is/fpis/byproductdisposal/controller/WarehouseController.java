package com.fon.is.fpis.byproductdisposal.controller;

import com.fon.is.fpis.byproductdisposal.dto.response.WarehouseResponseDto;
import com.fon.is.fpis.byproductdisposal.service.WarehouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@CrossOrigin
@RestController
@RequestMapping(path = "warehouse")
public class WarehouseController {

    private final WarehouseService service;

    @Autowired
    public WarehouseController(WarehouseService service) {
        this.service = service;
    }


    @GetMapping(produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<List<WarehouseResponseDto>> getAll() {
        List<WarehouseResponseDto> result = service.getAll();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping(path = "{id}", produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<WarehouseResponseDto> getById(@PathVariable final Long id) {
        WarehouseResponseDto result = service.get(id);
        return new ResponseEntity(result, HttpStatus.OK);
    }
}
