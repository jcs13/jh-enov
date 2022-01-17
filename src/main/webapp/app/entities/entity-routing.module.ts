import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'parcours',
        data: { pageTitle: 'Parcours' },
        loadChildren: () => import('./parcours/parcours.module').then(m => m.ParcoursModule),
      },
      {
        path: 'offre',
        data: { pageTitle: 'Offres' },
        loadChildren: () => import('./offre/offre.module').then(m => m.OffreModule),
      },
      {
        path: 'etape',
        data: { pageTitle: 'Etapes' },
        loadChildren: () => import('./etape/etape.module').then(m => m.EtapeModule),
      },
      {
        path: 'bloc',
        data: { pageTitle: 'Blocs' },
        loadChildren: () => import('./bloc/bloc.module').then(m => m.BlocModule),
      },
      {
        path: 'business-unit',
        data: { pageTitle: 'BusinessUnits' },
        loadChildren: () => import('./business-unit/business-unit.module').then(m => m.BusinessUnitModule),
      },
      {
        path: 'offre-parcours-composition',
        data: { pageTitle: 'OffreParcoursCompositions' },
        loadChildren: () =>
          import('./offre-parcours-composition/offre-parcours-composition.module').then(m => m.OffreParcoursCompositionModule),
      },
      {
        path: 'parcours-definition',
        data: { pageTitle: 'ParcoursDefinitions' },
        loadChildren: () => import('./parcours-definition/parcours-definition.module').then(m => m.ParcoursDefinitionModule),
      },
      {
        path: 'etape-definition',
        data: { pageTitle: 'EtapeDefinitions' },
        loadChildren: () => import('./etape-definition/etape-definition.module').then(m => m.EtapeDefinitionModule),
      },
      {
        path: 'etape-order',
        data: { pageTitle: 'EtapeOrders' },
        loadChildren: () => import('./etape-order/etape-order.module').then(m => m.EtapeOrderModule),
      },
      {
        path: 'bloc-definition',
        data: { pageTitle: 'BlocDefinitions' },
        loadChildren: () => import('./bloc-definition/bloc-definition.module').then(m => m.BlocDefinitionModule),
      },
      {
        path: 'element',
        data: { pageTitle: 'Elements' },
        loadChildren: () => import('./element/element.module').then(m => m.ElementModule),
      },
      {
        path: 'bloc-order',
        data: { pageTitle: 'BlocOrders' },
        loadChildren: () => import('./bloc-order/bloc-order.module').then(m => m.BlocOrderModule),
      },
      {
        path: 'simulation',
        data: { pageTitle: 'Simulations' },
        loadChildren: () => import('./simulation/simulation.module').then(m => m.SimulationModule),
      },
      {
        path: 'parcours-composition',
        data: { pageTitle: 'ParcoursCompositions' },
        loadChildren: () => import('./parcours-composition/parcours-composition.module').then(m => m.ParcoursCompositionModule),
      },
      {
        path: 'etape-transition',
        data: { pageTitle: 'EtapeTransitions' },
        loadChildren: () => import('./etape-transition/etape-transition.module').then(m => m.EtapeTransitionModule),
      },
      {
        path: 'bloc-transition',
        data: { pageTitle: 'BlocTransitions' },
        loadChildren: () => import('./bloc-transition/bloc-transition.module').then(m => m.BlocTransitionModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
