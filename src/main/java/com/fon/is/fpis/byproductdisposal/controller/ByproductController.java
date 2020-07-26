package com.fon.is.fpis.byproductdisposal.controller;

import com.fon.is.fpis.byproductdisposal.dto.ByproductInfoDto;
import com.fon.is.fpis.byproductdisposal.dto.ByproductDto;
import com.fon.is.fpis.byproductdisposal.service.ByproductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.MediaType.*;

import java.util.List;

@RestController
@RequestMapping(path = "byproduct")
public class ByproductController {

    private final ByproductService service;

    @Autowired
    public ByproductController(ByproductService service) {
        this.service = service;
    }

    @GetMapping(produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<List<ByproductInfoDto>> getAll() {
        List<ByproductInfoDto> result = service.getAll();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping(path = "{id}", produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<ByproductInfoDto> get(@PathVariable final Long id) {
        ByproductInfoDto result = service.get(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping(produces = APPLICATION_JSON_VALUE, consumes = APPLICATION_JSON_VALUE)
    public ResponseEntity<ByproductInfoDto> save(@RequestBody ByproductDto byproductDto) {
        ByproductInfoDto result = service.save(byproductDto);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @PatchMapping(path = "{id}", produces = APPLICATION_JSON_VALUE, consumes = APPLICATION_JSON_VALUE)
    public ResponseEntity<ByproductInfoDto> update(@PathVariable final Long id, @RequestBody final ByproductDto byproductDto) {
        ByproductInfoDto result = service.update(id, byproductDto);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
