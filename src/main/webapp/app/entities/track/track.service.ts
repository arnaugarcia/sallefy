import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITrack } from 'app/shared/model/track.model';

type EntityResponseType = HttpResponse<ITrack>;
type EntityArrayResponseType = HttpResponse<ITrack[]>;

@Injectable({ providedIn: 'root' })
export class TrackService {
  public resourceUrl = SERVER_API_URL + 'api/tracks';

  constructor(protected http: HttpClient) {}

  create(track: ITrack): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(track);
    return this.http
      .post<ITrack>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(track: ITrack): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(track);
    return this.http
      .put<ITrack>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ITrack>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITrack[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(track: ITrack): ITrack {
    const copy: ITrack = Object.assign({}, track, {
      createdAt: track.createdAt != null && track.createdAt.isValid() ? track.createdAt.toJSON() : null,
      released: track.released != null && track.released.isValid() ? track.released.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.createdAt = res.body.createdAt != null ? moment(res.body.createdAt) : null;
      res.body.released = res.body.released != null ? moment(res.body.released) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((track: ITrack) => {
        track.createdAt = track.createdAt != null ? moment(track.createdAt) : null;
        track.released = track.released != null ? moment(track.released) : null;
      });
    }
    return res;
  }
}
