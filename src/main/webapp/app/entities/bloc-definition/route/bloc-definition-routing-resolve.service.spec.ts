import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IBlocDefinition, BlocDefinition } from '../bloc-definition.model';
import { BlocDefinitionService } from '../service/bloc-definition.service';

import { BlocDefinitionRoutingResolveService } from './bloc-definition-routing-resolve.service';

describe('BlocDefinition routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: BlocDefinitionRoutingResolveService;
  let service: BlocDefinitionService;
  let resultBlocDefinition: IBlocDefinition | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    routingResolveService = TestBed.inject(BlocDefinitionRoutingResolveService);
    service = TestBed.inject(BlocDefinitionService);
    resultBlocDefinition = undefined;
  });

  describe('resolve', () => {
    it('should return IBlocDefinition returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultBlocDefinition = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultBlocDefinition).toEqual({ id: 'ABC' });
    });

    it('should return new IBlocDefinition if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultBlocDefinition = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultBlocDefinition).toEqual(new BlocDefinition());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as BlocDefinition })));
      mockActivatedRouteSnapshot.params = { id: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultBlocDefinition = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultBlocDefinition).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
