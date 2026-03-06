import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class requestService {
  constructor(
    private httpClient: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}
  private getAuthHeader(): HttpHeaders {
    // ✅ return empty headers during SSR
    if (!isPlatformBrowser(this.platformId)) {
      return new HttpHeaders();
    }
    const token = localStorage.getItem('token');
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
  deleteJSON(path: string) {
    const url = this.getUrl(path);
    const headers = this.getAuthHeader();
    headers.append('Content-Type', 'application/json');
    return this.httpClient.delete<any>(url, { headers });
  }
  postFormData(path: string, data: any) {
    const url = this.getUrl(path);
    const headers = this.getAuthHeader();
    headers.append('Content-Type', 'multipart/form-data;boundary=abc');
    data = this.toFormData(data);
    return this.httpClient.post<any>(url, data, { headers });
  }
  patchFormData(path: string, data: any) {
    const url = this.getUrl(path);
    const headers = this.getAuthHeader();
    headers.append('Content-Type', 'multipart/form-data;boundary=abc');
    data = this.toFormData(data);
    return this.httpClient.patch<any>(url, data, { headers });
  }
  private toFormData(formValue: any) {
    const formData = new FormData();
    //to append files to last of form data
    const fileKeys = [];
    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      if (typeof value?.name == 'string') {
        fileKeys.push(key);
        continue;
      }
      formData.append(key, value);
    }
    for (const key of fileKeys) {
      formData.append(key, formValue[key]);
    }
    return formData;
  }
}
