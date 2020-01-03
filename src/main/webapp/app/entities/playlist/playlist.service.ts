import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPlaylist } from 'app/shared/model/playlist.model';

type EntityResponseType = HttpResponse<IPlaylist>;
type EntityArrayResponseType = HttpResponse<IPlaylist[]>;

@Injectable({ providedIn: 'root' })
export class PlaylistService {
  public resourceUrl = SERVER_API_URL + 'api/playlists';

  constructor(protected http: HttpClient) {}

  create(playlist: IPlaylist): Observable<EntityResponseType> {
    return this.http.post<IPlaylist>(this.resourceUrl, playlist, { observe: 'response' });
  }

  update(playlist: IPlaylist): Observable<EntityResponseType> {
    return this.http.put<IPlaylist>(this.resourceUrl, playlist, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPlaylist>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPlaylist[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
