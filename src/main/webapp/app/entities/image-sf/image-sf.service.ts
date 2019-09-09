import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IImageSf } from 'app/shared/model/image-sf.model';

type EntityResponseType = HttpResponse<IImageSf>;
type EntityArrayResponseType = HttpResponse<IImageSf[]>;

@Injectable({ providedIn: 'root' })
export class ImageSfService {
  public resourceUrl = SERVER_API_URL + 'api/images';

  constructor(protected http: HttpClient) {}

  create(image: IImageSf): Observable<EntityResponseType> {
    return this.http.post<IImageSf>(this.resourceUrl, image, { observe: 'response' });
  }

  update(image: IImageSf): Observable<EntityResponseType> {
    return this.http.put<IImageSf>(this.resourceUrl, image, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IImageSf>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IImageSf[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
