import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { EtapeOrderService } from '../service/etape-order.service';
import { IEtapeOrder, EtapeOrder } from '../etape-order.model';
import { IParcoursDefinition } from 'app/entities/parcours-definition/parcours-definition.model';
import { ParcoursDefinitionService } from 'app/entities/parcours-definition/service/parcours-definition.service';
import { IEtapeDefinition } from 'app/entities/etape-definition/etape-definition.model';
import { EtapeDefinitionService } from 'app/entities/etape-definition/service/etape-definition.service';

import { EtapeOrderUpdateComponent } from './etape-order-update.component';

describe('EtapeOrder Management Update Component', () => {
  let comp: EtapeOrderUpdateComponent;
  let fixture: ComponentFixture<EtapeOrderUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let etapeOrderService: EtapeOrderService;
  let parcoursDefinitionService: ParcoursDefinitionService;
  let etapeDefinitionService: EtapeDefinitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [EtapeOrderUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(EtapeOrderUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EtapeOrderUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    etapeOrderService = TestBed.inject(EtapeOrderService);
    parcoursDefinitionService = TestBed.inject(ParcoursDefinitionService);
    etapeDefinitionService = TestBed.inject(EtapeDefinitionService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call parcoursDefinition query and add missing value', () => {
      const etapeOrder: IEtapeOrder = { id: 456 };
      const parcoursDefinition: IParcoursDefinition = { id: 59376 };
      etapeOrder.parcoursDefinition = parcoursDefinition;

      const parcoursDefinitionCollection: IParcoursDefinition[] = [{ id: 95708 }];
      jest.spyOn(parcoursDefinitionService, 'query').mockReturnValue(of(new HttpResponse({ body: parcoursDefinitionCollection })));
      const expectedCollection: IParcoursDefinition[] = [parcoursDefinition, ...parcoursDefinitionCollection];
      jest.spyOn(parcoursDefinitionService, 'addParcoursDefinitionToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ etapeOrder });
      comp.ngOnInit();

      expect(parcoursDefinitionService.query).toHaveBeenCalled();
      expect(parcoursDefinitionService.addParcoursDefinitionToCollectionIfMissing).toHaveBeenCalledWith(
        parcoursDefinitionCollection,
        parcoursDefinition
      );
      expect(comp.parcoursDefinitionsCollection).toEqual(expectedCollection);
    });

    it('Should call current query and add missing value', () => {
      const etapeOrder: IEtapeOrder = { id: 456 };
      const current: IEtapeDefinition = { id: 82182 };
      etapeOrder.current = current;

      const currentCollection: IEtapeDefinition[] = [{ id: 95966 }];
      jest.spyOn(etapeDefinitionService, 'query').mockReturnValue(of(new HttpResponse({ body: currentCollection })));
      const expectedCollection: IEtapeDefinition[] = [current, ...currentCollection];
      jest.spyOn(etapeDefinitionService, 'addEtapeDefinitionToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ etapeOrder });
      comp.ngOnInit();

      expect(etapeDefinitionService.query).toHaveBeenCalled();
      expect(etapeDefinitionService.addEtapeDefinitionToCollectionIfMissing).toHaveBeenCalledWith(currentCollection, current);
      expect(comp.currentsCollection).toEqual(expectedCollection);
    });

    it('Should call next query and add missing value', () => {
      const etapeOrder: IEtapeOrder = { id: 456 };
      const next: IEtapeDefinition = { id: 54136 };
      etapeOrder.next = next;

      const nextCollection: IEtapeDefinition[] = [{ id: 98364 }];
      jest.spyOn(etapeDefinitionService, 'query').mockReturnValue(of(new HttpResponse({ body: nextCollection })));
      const expectedCollection: IEtapeDefinition[] = [next, ...nextCollection];
      jest.spyOn(etapeDefinitionService, 'addEtapeDefinitionToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ etapeOrder });
      comp.ngOnInit();

      expect(etapeDefinitionService.query).toHaveBeenCalled();
      expect(etapeDefinitionService.addEtapeDefinitionToCollectionIfMissing).toHaveBeenCalledWith(nextCollection, next);
      expect(comp.nextsCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const etapeOrder: IEtapeOrder = { id: 456 };
      const parcoursDefinition: IParcoursDefinition = { id: 65544 };
      etapeOrder.parcoursDefinition = parcoursDefinition;
      const current: IEtapeDefinition = { id: 13630 };
      etapeOrder.current = current;
      const next: IEtapeDefinition = { id: 91974 };
      etapeOrder.next = next;

      activatedRoute.data = of({ etapeOrder });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(etapeOrder));
      expect(comp.parcoursDefinitionsCollection).toContain(parcoursDefinition);
      expect(comp.currentsCollection).toContain(current);
      expect(comp.nextsCollection).toContain(next);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<EtapeOrder>>();
      const etapeOrder = { id: 123 };
      jest.spyOn(etapeOrderService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ etapeOrder });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: etapeOrder }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(etapeOrderService.update).toHaveBeenCalledWith(etapeOrder);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<EtapeOrder>>();
      const etapeOrder = new EtapeOrder();
      jest.spyOn(etapeOrderService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ etapeOrder });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: etapeOrder }));
      saveSubject.complete();

      // THEN
      expect(etapeOrderService.create).toHaveBeenCalledWith(etapeOrder);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<EtapeOrder>>();
      const etapeOrder = { id: 123 };
      jest.spyOn(etapeOrderService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ etapeOrder });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(etapeOrderService.update).toHaveBeenCalledWith(etapeOrder);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackParcoursDefinitionById', () => {
      it('Should return tracked ParcoursDefinition primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackParcoursDefinitionById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackEtapeDefinitionById', () => {
      it('Should return tracked EtapeDefinition primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackEtapeDefinitionById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
