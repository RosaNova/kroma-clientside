import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class requestService {
  
  private cache = new Map<string, any>();

  constructor(private httpClient: HttpClient) { }
  private getAuthHeader(): HttpHeaders {
    const isBrowser = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
    const token = isBrowser ? window.localStorage.getItem('token') : null;
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return headers;
  }
  getUrl(path: string) {
    return environment.api_url + path;
  }
  getJSON(path: string, data?: any, useCache: boolean = false) {
    const url = this.getUrl(path);
    const cacheKey = url + (data ? JSON.stringify(data) : '');

    if (useCache && this.cache.has(cacheKey)) {
      return of(this.cache.get(cacheKey));
    }

    let headers = this.getAuthHeader();
    headers = headers.set('Content-Type', 'application/json');
    return this.httpClient.get<any>(url, { headers, params: data }).pipe(
      tap(response => {
        if (useCache) {
          this.cache.set(cacheKey, response);
        }
      })
    );
  }

  clearCache() {
    this.cache.clear();
  }
  postJSON(path: string, data: any) {
    const url = this.getUrl(path);
    let headers = this.getAuthHeader();
    headers = headers.set('Content-Type', 'application/json');
    return this.httpClient.post<any>(url, data, { headers });
  }
  patchJSON(path: string, data: any) {
    const url = this.getUrl(path);
    let headers = this.getAuthHeader();
    headers = headers.set('Content-Type', 'application/json');
    return this.httpClient.patch<any>(url, data, { headers });
  }
  deleteJSON(path: string) {
    const url = this.getUrl(path);
    let headers = this.getAuthHeader();
    headers = headers.set('Content-Type', 'application/json');
    return this.httpClient.delete<any>(url, { headers });
  }
  postFormData(path: string, data: any) {
    const url = this.getUrl(path);
    let headers = this.getAuthHeader();
    // Do NOT manually set Content-Type for FormData - the browser will set the correct boundary
    data = this.toFormData(data);
    return this.httpClient.post<any>(url, data, { headers });
  }
  patchFormData(path: string, data: any) {
    const url = this.getUrl(path);
    let headers = this.getAuthHeader();
    // Do NOT manually set Content-Type for FormData - the browser will set the correct boundary
    data = this.toFormData(data);
    return this.httpClient.patch<any>(url, data, { headers });
  }
  private toFormData(formValue: any) {
    if (formValue instanceof FormData) {
      return formValue;
    }
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
