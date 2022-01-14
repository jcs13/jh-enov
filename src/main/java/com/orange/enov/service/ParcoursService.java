package com.orange.enov.service;

import com.orange.enov.domain.*;
import com.orange.enov.repository.EtapeOrderRepository;
import com.orange.enov.repository.OffreParcoursCompositionRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

@Service
public class ParcoursService {

    private final Logger log = LoggerFactory.getLogger(ParcoursService.class);

    @Autowired
    private OffreParcoursCompositionRepository offreParcoursCompositionRepository;

    @Autowired
    private EtapeOrderRepository etapeOrderRepository;

    public Parcours instanciateParcoursByOffre(String offerName) {
        log.debug("START instanciateParcoursByOffre");
        log.debug("offerName={}", offerName);

        Parcours parcours = Parcours.builder().build();

        OffreParcoursComposition opcFilter = new OffreParcoursComposition();
        opcFilter.setOffre(Offre.builder().name(offerName).build());
        final List<OffreParcoursComposition> parcoursCompositionsFromOffre = offreParcoursCompositionRepository.findAll(
            Example.of(opcFilter)
        );

        final OffreParcoursComposition parcoursComposition = parcoursCompositionsFromOffre.get(0);
        final ParcoursDefinition parcoursParent = parcoursComposition.getParcoursParent();
        final ParcoursDefinition parcoursChild = parcoursComposition.getParcoursChild();
        final Set<EtapeDefinition> parentEtapeDefinitions = parcoursParent.getEtapeDefinitions();
        EtapeOrder etapeOrderParentFilter = new EtapeOrder();
        etapeOrderParentFilter.setParcoursDefinition(parcoursParent);
        final List<EtapeOrder> etapeOrders = etapeOrderRepository.findAll(Example.of(etapeOrderParentFilter));

        List<Etape> etapes = buildOrderedEtapes(parcours, etapeOrders);

        parentEtapeDefinitions.forEach(etapeDefinition -> {});
        final Set<EtapeDefinition> childEtapeDefinitions = parcoursChild.getEtapeDefinitions();

        log.debug("parcoursCompositionsFromOffre={}", parcoursCompositionsFromOffre);

        log.debug("STOP instanciateParcoursByOffre");
        return parcours;
    }

    public List<Etape> buildOrderedEtapes(Parcours parcours, List<EtapeOrder> etapeOrders) {
        List<Etape> etapes = new ArrayList<>();
        etapeOrders.forEach(etapeOrder -> {
            final EtapeDefinition etapeDefCurrent = etapeOrder.getCurrent();
            final EtapeDefinition etapeDefNext = etapeOrder.getNext();

            final Etape etapeCurrent = buildEtapeFromDefinition(parcours, etapeDefCurrent);
            final Etape etapeNext = buildEtapeFromDefinition(parcours, etapeDefNext);

            if (etapes.isEmpty()) {
                etapes.add(etapeCurrent);
                etapes.add(etapeNext);
            } else if (etapes.contains(etapeCurrent)) {
                final int idxCurrent = etapes.indexOf(etapeCurrent);
                etapes.add(idxCurrent + 1, etapeNext);
            } else if (etapes.contains(etapeNext)) {
                final int idxNext = etapes.indexOf(etapeNext);
                etapes.add(idxNext > 0 ? idxNext - 1 : 0, etapeCurrent);
            }
        });
        return etapes;
    }

    private Etape buildEtapeFromDefinition(Parcours parcours, EtapeDefinition currentEtapeDef) {
        Etape etapeStart = new Etape();
        etapeStart.setId(currentEtapeDef.getId());
        etapeStart.setName(currentEtapeDef.getName());
        etapeStart.setLabel(currentEtapeDef.getLabel());
        etapeStart.setParcours(parcours);
        return etapeStart;
    }
}
