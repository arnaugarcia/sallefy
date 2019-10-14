import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { PlaylistService } from 'app/entities/playlist/playlist.service';
import { IPlaylist, Playlist } from 'app/shared/model/playlist.model';

describe('Service Tests', () => {
  describe('Playlist Service', () => {
    let injector: TestBed;
    let service: PlaylistService;
    let httpMock: HttpTestingController;
    let elemDefault: IPlaylist;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(PlaylistService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Playlist(0, 'AAAAAAA', false, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', false, 0, 0, 0, currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            created: currentDate.format(DATE_FORMAT)
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

      it('should create a Playlist', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            created: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            created: currentDate
          },
          returnedFromService
        );
        service
          .create(new Playlist(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a Playlist', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            collaborative: true,
            description: 'BBBBBB',
            primaryColor: 'BBBBBB',
            cover: 'BBBBBB',
            thumbnail: 'BBBBBB',
            publicAccessible: true,
            numberSongs: 1,
            followers: 1,
            rating: 1,
            created: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            created: currentDate
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

      it('should return a list of Playlist', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            collaborative: true,
            description: 'BBBBBB',
            primaryColor: 'BBBBBB',
            cover: 'BBBBBB',
            thumbnail: 'BBBBBB',
            publicAccessible: true,
            numberSongs: 1,
            followers: 1,
            rating: 1,
            created: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            created: currentDate
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

      it('should delete a Playlist', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

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
