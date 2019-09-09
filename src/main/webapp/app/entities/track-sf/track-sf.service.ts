import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITrackSf } from 'app/shared/model/track-sf.model';

type EntityResponseType = HttpResponse<ITrackSf>;
type EntityArrayResponseType = HttpResponse<ITrackSf[]>;

@Injectable({ providedIn: 'root' })
export class TrackSfService {
  public resourceUrl = SERVER_API_URL + 'api/tracks';

  constructor(protected http: HttpClient) {}

  create(track: ITrackSf): Observable<EntityResponseType> {
    return this.http.post<ITrackSf>(this.resourceUrl, track, { observe: 'response' });
  }

  update(track: ITrackSf): Observable<EntityResponseType> {
    return this.http.put<ITrackSf>(this.resourceUrl, track, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITrackSf>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITrackSf[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
