import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IGenre } from 'app/shared/model/genre.model';

type EntityResponseType = HttpResponse<IGenre>;
type EntityArrayResponseType = HttpResponse<IGenre[]>;

@Injectable({ providedIn: 'root' })
export class GenreService {
  public resourceUrl = SERVER_API_URL + 'api/genres';

  constructor(protected http: HttpClient) {}

  create(genre: IGenre): Observable<EntityResponseType> {
    return this.http.post<IGenre>(this.resourceUrl, genre, { observe: 'response' });
  }

  update(genre: IGenre): Observable<EntityResponseType> {
    return this.http.put<IGenre>(this.resourceUrl, genre, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IGenre>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IGenre[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
