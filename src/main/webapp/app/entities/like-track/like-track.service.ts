import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ILikeTrack } from 'app/shared/model/like-track.model';

type EntityResponseType = HttpResponse<ILikeTrack>;
type EntityArrayResponseType = HttpResponse<ILikeTrack[]>;

@Injectable({ providedIn: 'root' })
export class LikeTrackService {
  public resourceUrl = SERVER_API_URL + 'api/like-tracks';

  constructor(protected http: HttpClient) {}

  create(likeTrack: ILikeTrack): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(likeTrack);
    return this.http
      .post<ILikeTrack>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(likeTrack: ILikeTrack): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(likeTrack);
    return this.http
      .put<ILikeTrack>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ILikeTrack>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ILikeTrack[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(likeTrack: ILikeTrack): ILikeTrack {
    const copy: ILikeTrack = Object.assign({}, likeTrack, {
      date: likeTrack.date != null && likeTrack.date.isValid() ? likeTrack.date.toJSON() : null
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
      res.body.forEach((likeTrack: ILikeTrack) => {
        likeTrack.date = likeTrack.date != null ? moment(likeTrack.date) : null;
      });
    }
    return res;
  }
}
