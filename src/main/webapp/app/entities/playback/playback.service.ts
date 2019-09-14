import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

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

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(playback: IPlayback): IPlayback {
    const copy: IPlayback = Object.assign({}, playback, {
      date: playback.date != null && playback.date.isValid() ? playback.date.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.date = res.body.date != null ? moment(res.body.date) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((playback: IPlayback) => {
        playback.date = playback.date != null ? moment(playback.date) : null;
      });
    }
    return res;
  }
}
