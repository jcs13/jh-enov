package com.orange.enov.web.rest;

import com.orange.enov.domain.Etape;
import com.orange.enov.domain.Parcours;
import com.orange.enov.domain.ParcoursInstanceRequest;
import com.orange.enov.service.ParcoursService;
import com.orange.enov.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Set;
import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tech.jhipster.web.util.HeaderUtil;

@RestController
@RequestMapping("/api")
public class ParcoursInstanceController {

    private final Logger log = LoggerFactory.getLogger(ParcoursInstanceController.class);

    @Autowired
    private ParcoursService parcoursService;

    @PostMapping("/parcours/instanciate")
    public ResponseEntity<Parcours> instanciateParcours(@Valid @RequestBody ParcoursInstanceRequest instanceRequest)
        throws URISyntaxException {
        log.debug("REST request to instanciate Parcours : {}", instanceRequest);

        Parcours result = parcoursService.instanciateParcoursByOffre(instanceRequest.getOfferName());

        return ResponseEntity
            .created(new URI("/api/parcours/" + result.getId()))
            //            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId()))
            .body(result);
    }
}
