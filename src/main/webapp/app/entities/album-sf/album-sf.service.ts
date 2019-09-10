import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAlbumSf } from 'app/shared/model/album-sf.model';

type EntityResponseType = HttpResponse<IAlbumSf>;
type EntityArrayResponseType = HttpResponse<IAlbumSf[]>;

@Injectable({ providedIn: 'root' })
export class AlbumSfService {
  public resourceUrl = SERVER_API_URL + 'api/albums';

  constructor(protected http: HttpClient) {}

  create(album: IAlbumSf): Observable<EntityResponseType> {
    return this.http.post<IAlbumSf>(this.resourceUrl, album, { observe: 'response' });
  }

  update(album: IAlbumSf): Observable<EntityResponseType> {
    return this.http.put<IAlbumSf>(this.resourceUrl, album, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAlbumSf>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAlbumSf[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
