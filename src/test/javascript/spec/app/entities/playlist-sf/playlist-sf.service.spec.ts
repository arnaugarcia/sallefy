/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { PlaylistSfService } from 'app/entities/playlist-sf/playlist-sf.service';
import { IPlaylistSf, PlaylistSf } from 'app/shared/model/playlist-sf.model';

describe('Service Tests', () => {
  describe('PlaylistSf Service', () => {
    let injector: TestBed;
    let service: PlaylistSfService;
    let httpMock: HttpTestingController;
    let elemDefault: IPlaylistSf;
    let expectedResult;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(PlaylistSfService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new PlaylistSf(0, 'AAAAAAA', false, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', false, 0, 0, 0);
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign({}, elemDefault);
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a PlaylistSf', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
        service
          .create(new PlaylistSf(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a PlaylistSf', async () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            collaborative: true,
            reference: 'BBBBBB',
            description: 'BBBBBB',
            primaryColor: 'BBBBBB',
            publicAccessible: true,
            numberSongs: 1,
            followers: 1,
            rating: 1
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of PlaylistSf', async () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            collaborative: true,
            reference: 'BBBBBB',
            description: 'BBBBBB',
            primaryColor: 'BBBBBB',
            publicAccessible: true,
            numberSongs: 1,
            followers: 1,
            rating: 1
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
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

      it('should delete a PlaylistSf', async () => {
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
