import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFollowUser } from 'app/shared/model/follow-user.model';

type EntityResponseType = HttpResponse<IFollowUser>;
type EntityArrayResponseType = HttpResponse<IFollowUser[]>;

@Injectable({ providedIn: 'root' })
export class FollowUserService {
  public resourceUrl = SERVER_API_URL + 'api/follow-users';

  constructor(protected http: HttpClient) {}

  create(followUser: IFollowUser): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(followUser);
    return this.http
      .post<IFollowUser>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(followUser: IFollowUser): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(followUser);
    return this.http
      .put<IFollowUser>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IFollowUser>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IFollowUser[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(followUser: IFollowUser): IFollowUser {
    const copy: IFollowUser = Object.assign({}, followUser, {
      date: followUser.date != null && followUser.date.isValid() ? followUser.date.toJSON() : null
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
      res.body.forEach((followUser: IFollowUser) => {
        followUser.date = followUser.date != null ? moment(followUser.date) : null;
      });
    }
    return res;
  }
}
