import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPlayback } from 'app/shared/model/playback.model';

type EntityResponseType = HttpResponse<IPlayback>;
type EntityArrayResponseType = HttpResponse<IPlayback[]>;

@Injectable({ providedIn: 'root' })
export class PlaybackService {
  public resourceUrl = SERVER_API_URL + 'api/playbacks';

  constructor(protected http: HttpClient) {}

  create(playback: IPlayback): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(playback);
    return this.http
      .post<IPlayback>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(playback: IPlayback): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(playback);
    return this.http
      .put<IPlayback>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPlayback>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPlayback[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(playback: IPlayback): IPlayback {
    const copy: IPlayback = Object.assign({}, playback, {
      date: playback.date && playback.date.isValid() ? playback.date.toJSON() : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.date = res.body.date ? moment(res.body.date) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((playback: IPlayback) => {
        playback.date = playback.date ? moment(playback.date) : undefined;
      });
    }
    return res;
  }
}
