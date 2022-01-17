import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { BlocOrderService } from '../service/bloc-order.service';
import { IBlocOrder, BlocOrder } from '../bloc-order.model';
import { IEtapeDefinition } from 'app/entities/etape-definition/etape-definition.model';
import { EtapeDefinitionService } from 'app/entities/etape-definition/service/etape-definition.service';
import { IBlocDefinition } from 'app/entities/bloc-definition/bloc-definition.model';
import { BlocDefinitionService } from 'app/entities/bloc-definition/service/bloc-definition.service';

import { BlocOrderUpdateComponent } from './bloc-order-update.component';

describe('BlocOrder Management Update Component', () => {
  let comp: BlocOrderUpdateComponent;
  let fixture: ComponentFixture<BlocOrderUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let blocOrderService: BlocOrderService;
  let etapeDefinitionService: EtapeDefinitionService;
  let blocDefinitionService: BlocDefinitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [BlocOrderUpdateComponent],
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
      .overrideTemplate(BlocOrderUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(BlocOrderUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    blocOrderService = TestBed.inject(BlocOrderService);
    etapeDefinitionService = TestBed.inject(EtapeDefinitionService);
    blocDefinitionService = TestBed.inject(BlocDefinitionService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call etapeDefinition query and add missing value', () => {
      const blocOrder: IBlocOrder = { id: 456 };
      const etapeDefinition: IEtapeDefinition = { id: 84691 };
      blocOrder.etapeDefinition = etapeDefinition;

      const etapeDefinitionCollection: IEtapeDefinition[] = [{ id: 98306 }];
      jest.spyOn(etapeDefinitionService, 'query').mockReturnValue(of(new HttpResponse({ body: etapeDefinitionCollection })));
      const expectedCollection: IEtapeDefinition[] = [etapeDefinition, ...etapeDefinitionCollection];
      jest.spyOn(etapeDefinitionService, 'addEtapeDefinitionToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ blocOrder });
      comp.ngOnInit();

      expect(etapeDefinitionService.query).toHaveBeenCalled();
      expect(etapeDefinitionService.addEtapeDefinitionToCollectionIfMissing).toHaveBeenCalledWith(
        etapeDefinitionCollection,
        etapeDefinition
      );
      expect(comp.etapeDefinitionsCollection).toEqual(expectedCollection);
    });

    it('Should call current query and add missing value', () => {
      const blocOrder: IBlocOrder = { id: 456 };
      const current: IBlocDefinition = { id: 37992 };
      blocOrder.current = current;

      const currentCollection: IBlocDefinition[] = [{ id: 48833 }];
      jest.spyOn(blocDefinitionService, 'query').mockReturnValue(of(new HttpResponse({ body: currentCollection })));
      const expectedCollection: IBlocDefinition[] = [current, ...currentCollection];
      jest.spyOn(blocDefinitionService, 'addBlocDefinitionToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ blocOrder });
      comp.ngOnInit();

      expect(blocDefinitionService.query).toHaveBeenCalled();
      expect(blocDefinitionService.addBlocDefinitionToCollectionIfMissing).toHaveBeenCalledWith(currentCollection, current);
      expect(comp.currentsCollection).toEqual(expectedCollection);
    });

    it('Should call next query and add missing value', () => {
      const blocOrder: IBlocOrder = { id: 456 };
      const next: IBlocDefinition = { id: 11842 };
      blocOrder.next = next;

      const nextCollection: IBlocDefinition[] = [{ id: 64961 }];
      jest.spyOn(blocDefinitionService, 'query').mockReturnValue(of(new HttpResponse({ body: nextCollection })));
      const expectedCollection: IBlocDefinition[] = [next, ...nextCollection];
      jest.spyOn(blocDefinitionService, 'addBlocDefinitionToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ blocOrder });
      comp.ngOnInit();

      expect(blocDefinitionService.query).toHaveBeenCalled();
      expect(blocDefinitionService.addBlocDefinitionToCollectionIfMissing).toHaveBeenCalledWith(nextCollection, next);
      expect(comp.nextsCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const blocOrder: IBlocOrder = { id: 456 };
      const etapeDefinition: IEtapeDefinition = { id: 66350 };
      blocOrder.etapeDefinition = etapeDefinition;
      const current: IBlocDefinition = { id: 54878 };
      blocOrder.current = current;
      const next: IBlocDefinition = { id: 90221 };
      blocOrder.next = next;

      activatedRoute.data = of({ blocOrder });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(blocOrder));
      expect(comp.etapeDefinitionsCollection).toContain(etapeDefinition);
      expect(comp.currentsCollection).toContain(current);
      expect(comp.nextsCollection).toContain(next);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<BlocOrder>>();
      const blocOrder = { id: 123 };
      jest.spyOn(blocOrderService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ blocOrder });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: blocOrder }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(blocOrderService.update).toHaveBeenCalledWith(blocOrder);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<BlocOrder>>();
      const blocOrder = new BlocOrder();
      jest.spyOn(blocOrderService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ blocOrder });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: blocOrder }));
      saveSubject.complete();

      // THEN
      expect(blocOrderService.create).toHaveBeenCalledWith(blocOrder);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<BlocOrder>>();
      const blocOrder = { id: 123 };
      jest.spyOn(blocOrderService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ blocOrder });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(blocOrderService.update).toHaveBeenCalledWith(blocOrder);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackEtapeDefinitionById', () => {
      it('Should return tracked EtapeDefinition primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackEtapeDefinitionById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackBlocDefinitionById', () => {
      it('Should return tracked BlocDefinition primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackBlocDefinitionById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
