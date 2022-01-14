package com.orange.enov.service;

import static org.junit.jupiter.api.Assertions.*;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.orange.enov.domain.Etape;
import com.orange.enov.domain.EtapeOrder;
import com.orange.enov.domain.Parcours;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

class ParcoursServiceTest {

    private final Logger log = LoggerFactory.getLogger(ParcoursServiceTest.class);

    @Test
    void instanciateParcoursByOffre() {}

    @Test
    void buildOrderedEtapes() throws IOException {
        ParcoursService parcoursService = new ParcoursService();
        Parcours parcours = new Parcours();
        parcours.setId("121");
        parcours.setName("test");
        parcours.setLabel("parcours de test");
        parcours.setOffreId("BVC");
        ObjectMapper mapper = new ObjectMapper();
        final List<EtapeOrder> etapeOrders = mapper.readValue(
            new File("src/test/resources/data/etape-orders.json"),
            new TypeReference<List<EtapeOrder>>() {}
        );

        log.info("etapes init");
        etapeOrders.forEach(etape -> log.info("{}", etape));

        final List<EtapeOrder> asproeTotoEtapeOrders = etapeOrders
            .stream()
            .filter(etapeOrder -> etapeOrder.getParcoursDefinition().getName().equals("asproe-toto"))
            .sorted(Comparator.comparing(EtapeOrder::getTransitionOrder))
            .collect(Collectors.toList());
        final List<EtapeOrder> asproeEtapeOrders = etapeOrders
            .stream()
            .filter(etapeOrder -> etapeOrder.getParcoursDefinition().getName().equals("asproe"))
            .sorted(Comparator.comparing(EtapeOrder::getTransitionOrder))
            .collect(Collectors.toList());
        final List<EtapeOrder> coreEtapeOrders = etapeOrders
            .stream()
            .filter(etapeOrder -> etapeOrder.getParcoursDefinition().getName().equals("core"))
            .sorted(Comparator.comparing(EtapeOrder::getTransitionOrder))
            .collect(Collectors.toList());

        List<EtapeOrder> etapeOrderCoreToChild = new ArrayList<>();
        etapeOrderCoreToChild.addAll(coreEtapeOrders);
        etapeOrderCoreToChild.addAll(asproeEtapeOrders);
        etapeOrderCoreToChild.addAll(asproeTotoEtapeOrders);

        log.info("etapes sorted");
        etapeOrderCoreToChild.forEach(etape -> log.info("{}", etape));

        final List<Etape> etapes = parcoursService.buildOrderedEtapes(parcours, etapeOrderCoreToChild);

        log.info("etapes ordonnees");
        etapes.forEach(etape -> log.info("{}", etape));
    }
}
