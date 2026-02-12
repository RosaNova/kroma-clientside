import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { request } from 'http';

@Injectable({
  providedIn: 'root',
})
export class requestService {
  constructor(private httpClient: HttpClient) {}
  private getAuthHeader(): HttpHeaders {
    const token = localStorage.getItem('_t');
    if (token) {
      return new HttpHeaders({
        Authorization: 'Bearer ' + token,
      });
    }
    return new HttpHeaders();
  }
  getUrl(path: string) {
    return environment.api_url + path;
  }
  getJSON(path: string, data?: any) {
    const url = this.getUrl(path);
    const headers = this.getAuthHeader();
    headers.append('Content-Type', 'application/json');
    return this.httpClient.get<any>(url, { headers, params: data });
  }
  postJSON(path: string, data: any) {
    const url = this.getUrl(path);
    const headers = this.getAuthHeader();
    headers.append('Content-Type', 'application/json');
    return this.httpClient.post<any>(url, data, { headers });
  }
  patchJSON(path: string, data: any) {
    const url = this.getUrl(path);
    const headers = this.getAuthHeader();
    headers.append('Content-Type', 'application/json');
    return this.httpClient.patch<any>(url, data, { headers });
  }
  deleteJSON(path: string, data: any) {
    const url = this.getUrl(path);
    const headers = this.getAuthHeader();
    headers.append('Content-Type', 'application/json');
    return this.httpClient.patch<any>(url, data, { headers });
  }
}
