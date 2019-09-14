import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ILikeAlbum } from 'app/shared/model/like-album.model';

type EntityResponseType = HttpResponse<ILikeAlbum>;
type EntityArrayResponseType = HttpResponse<ILikeAlbum[]>;

@Injectable({ providedIn: 'root' })
export class LikeAlbumService {
  public resourceUrl = SERVER_API_URL + 'api/like-albums';

  constructor(protected http: HttpClient) {}

  create(likeAlbum: ILikeAlbum): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(likeAlbum);
    return this.http
      .post<ILikeAlbum>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(likeAlbum: ILikeAlbum): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(likeAlbum);
    return this.http
      .put<ILikeAlbum>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ILikeAlbum>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ILikeAlbum[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(likeAlbum: ILikeAlbum): ILikeAlbum {
    const copy: ILikeAlbum = Object.assign({}, likeAlbum, {
      date: likeAlbum.date != null && likeAlbum.date.isValid() ? likeAlbum.date.toJSON() : null
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
      res.body.forEach((likeAlbum: ILikeAlbum) => {
        likeAlbum.date = likeAlbum.date != null ? moment(likeAlbum.date) : null;
      });
    }
    return res;
  }
}
