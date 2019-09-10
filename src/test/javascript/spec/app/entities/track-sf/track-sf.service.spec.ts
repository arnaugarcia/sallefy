/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { TrackSfService } from 'app/entities/track-sf/track-sf.service';
import { ITrackSf, TrackSf } from 'app/shared/model/track-sf.model';

describe('Service Tests', () => {
  describe('TrackSf Service', () => {
    let injector: TestBed;
    let service: TrackSfService;
    let httpMock: HttpTestingController;
    let elemDefault: ITrackSf;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(TrackSfService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new TrackSf(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', currentDate, 0, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            createdAt: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a TrackSf', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            createdAt: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            createdAt: currentDate
          },
          returnedFromService
        );
        service
          .create(new TrackSf(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a TrackSf', async () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            rating: 'BBBBBB',
            url: 'BBBBBB',
            popularity: 'BBBBBB',
            thumbnail: 'BBBBBB',
            createdAt: currentDate.format(DATE_TIME_FORMAT),
            duration: 1,
            primaryColor: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            createdAt: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of TrackSf', async () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            rating: 'BBBBBB',
            url: 'BBBBBB',
            popularity: 'BBBBBB',
            thumbnail: 'BBBBBB',
            createdAt: currentDate.format(DATE_TIME_FORMAT),
            duration: 1,
            primaryColor: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            createdAt: currentDate
          },
          returnedFromService
        );
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a TrackSf', async () => {
        const rxPromise = service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
