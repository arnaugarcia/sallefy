import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
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

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(likeTrack: ILikeTrack): ILikeTrack {
    const copy: ILikeTrack = Object.assign({}, likeTrack, {
      date: likeTrack.date && likeTrack.date.isValid() ? likeTrack.date.toJSON() : undefined
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
      res.body.forEach((likeTrack: ILikeTrack) => {
        likeTrack.date = likeTrack.date ? moment(likeTrack.date) : undefined;
      });
    }
    return res;
  }
}
