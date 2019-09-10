import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITrackSf } from 'app/shared/model/track-sf.model';

type EntityResponseType = HttpResponse<ITrackSf>;
type EntityArrayResponseType = HttpResponse<ITrackSf[]>;

@Injectable({ providedIn: 'root' })
export class TrackSfService {
  public resourceUrl = SERVER_API_URL + 'api/tracks';

  constructor(protected http: HttpClient) {}

  create(track: ITrackSf): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(track);
    return this.http
      .post<ITrackSf>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(track: ITrackSf): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(track);
    return this.http
      .put<ITrackSf>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ITrackSf>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITrackSf[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(track: ITrackSf): ITrackSf {
    const copy: ITrackSf = Object.assign({}, track, {
      createdAt: track.createdAt != null && track.createdAt.isValid() ? track.createdAt.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.createdAt = res.body.createdAt != null ? moment(res.body.createdAt) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((track: ITrackSf) => {
        track.createdAt = track.createdAt != null ? moment(track.createdAt) : null;
      });
    }
    return res;
  }
}
