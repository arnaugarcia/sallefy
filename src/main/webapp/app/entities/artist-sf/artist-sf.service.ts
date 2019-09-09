import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IArtistSf } from 'app/shared/model/artist-sf.model';

type EntityResponseType = HttpResponse<IArtistSf>;
type EntityArrayResponseType = HttpResponse<IArtistSf[]>;

@Injectable({ providedIn: 'root' })
export class ArtistSfService {
  public resourceUrl = SERVER_API_URL + 'api/artists';

  constructor(protected http: HttpClient) {}

  create(artist: IArtistSf): Observable<EntityResponseType> {
    return this.http.post<IArtistSf>(this.resourceUrl, artist, { observe: 'response' });
  }

  update(artist: IArtistSf): Observable<EntityResponseType> {
    return this.http.put<IArtistSf>(this.resourceUrl, artist, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IArtistSf>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IArtistSf[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
