import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPlaylistSf } from 'app/shared/model/playlist-sf.model';

type EntityResponseType = HttpResponse<IPlaylistSf>;
type EntityArrayResponseType = HttpResponse<IPlaylistSf[]>;

@Injectable({ providedIn: 'root' })
export class PlaylistSfService {
  public resourceUrl = SERVER_API_URL + 'api/playlists';

  constructor(protected http: HttpClient) {}

  create(playlist: IPlaylistSf): Observable<EntityResponseType> {
    return this.http.post<IPlaylistSf>(this.resourceUrl, playlist, { observe: 'response' });
  }

  update(playlist: IPlaylistSf): Observable<EntityResponseType> {
    return this.http.put<IPlaylistSf>(this.resourceUrl, playlist, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPlaylistSf>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPlaylistSf[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
