import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ILikeUser } from 'app/shared/model/like-user.model';

type EntityResponseType = HttpResponse<ILikeUser>;
type EntityArrayResponseType = HttpResponse<ILikeUser[]>;

@Injectable({ providedIn: 'root' })
export class LikeUserService {
  public resourceUrl = SERVER_API_URL + 'api/like-users';

  constructor(protected http: HttpClient) {}

  create(likeUser: ILikeUser): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(likeUser);
    return this.http
      .post<ILikeUser>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(likeUser: ILikeUser): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(likeUser);
    return this.http
      .put<ILikeUser>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ILikeUser>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ILikeUser[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(likeUser: ILikeUser): ILikeUser {
    const copy: ILikeUser = Object.assign({}, likeUser, {
      date: likeUser.date != null && likeUser.date.isValid() ? likeUser.date.toJSON() : null
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
      res.body.forEach((likeUser: ILikeUser) => {
        likeUser.date = likeUser.date != null ? moment(likeUser.date) : null;
      });
    }
    return res;
  }
}
