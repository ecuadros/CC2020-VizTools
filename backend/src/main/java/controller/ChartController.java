package controller;

import service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import dto.model.*;

@RestController
@RequestMapping("/chart")
@CrossOrigin(origins = "*")
public class ChartController {

    @Autowired
    private WeightService weightService;

    @Autowired
    private UWeightService uWeightService;

    @GetMapping("/program/{programId}")
    public ResponseEntity<?> readByProgram(@PathVariable Long programId) {
        return new ResponseEntity<>(weightService.createChart(programId), HttpStatus.OK);
    }

    @PutMapping("/program/{id}")
    public ResponseEntity<?> updateWeight(
            @PathVariable Long id,
            @RequestBody WeightDto input) {
        return new ResponseEntity<>(weightService.update(input, id), HttpStatus.OK);
    }

    @GetMapping("/uprogram/{uprogramId}")
    public ResponseEntity<?> readByUProgram(@PathVariable Long uprogramId) {
        return new ResponseEntity<>(uWeightService.createChart(uprogramId), HttpStatus.OK);
    }

    @PutMapping("/uprogram/{id}")
    public ResponseEntity<?> updateUWeight(
            @PathVariable Long id,
            @RequestBody UWeightDto input) {
        return new ResponseEntity<>(uWeightService.update(input, id), HttpStatus.OK);
    }

}
