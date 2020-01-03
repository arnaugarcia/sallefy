import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IFollowPlaylist } from 'app/shared/model/follow-playlist.model';

type EntityResponseType = HttpResponse<IFollowPlaylist>;
type EntityArrayResponseType = HttpResponse<IFollowPlaylist[]>;

@Injectable({ providedIn: 'root' })
export class FollowPlaylistService {
  public resourceUrl = SERVER_API_URL + 'api/follow-playlists';

  constructor(protected http: HttpClient) {}

  create(followPlaylist: IFollowPlaylist): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(followPlaylist);
    return this.http
      .post<IFollowPlaylist>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(followPlaylist: IFollowPlaylist): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(followPlaylist);
    return this.http
      .put<IFollowPlaylist>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IFollowPlaylist>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IFollowPlaylist[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(followPlaylist: IFollowPlaylist): IFollowPlaylist {
    const copy: IFollowPlaylist = Object.assign({}, followPlaylist, {
      date: followPlaylist.date && followPlaylist.date.isValid() ? followPlaylist.date.toJSON() : undefined
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
      res.body.forEach((followPlaylist: IFollowPlaylist) => {
        followPlaylist.date = followPlaylist.date ? moment(followPlaylist.date) : undefined;
      });
    }
    return res;
  }
}
