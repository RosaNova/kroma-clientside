import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { finalize, of, tap } from 'rxjs';
import { RequestParam } from '../models/request-param';
import { LoadingService } from './loading-service';

@Injectable({
  providedIn: 'root',
})
export class requestService {
  private cache = new Map<string, any>();

  constructor(private httpClient: HttpClient, private loadingService: LoadingService) { }
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
  getJSON(path: string, requestParam: RequestParam = {}) {
    const url = this.getUrl(path);
    if (requestParam.isLoading) {
      this.loadingService.setLoading(true);
    }
    let headers = this.getAuthHeader();
    headers = headers.set('Content-Type', 'application/json');
    return this.httpClient.get<any>(url, { headers, params: requestParam.data }).pipe(
      finalize(() => this.finalizeRequest(requestParam.isLoading)),
    );
  }
  clearCache() {
    this.cache.clear();
  }
  postJSON(path: string, requestParam: RequestParam = {}) {
    const url = this.getUrl(path);
    if (requestParam.isLoading) {
      this.loadingService.setLoading(true);
    }
    console.log(requestParam.data)
    let headers = this.getAuthHeader();
    headers = headers.set('Content-Type', 'application/json');
    return this.httpClient.post<any>(url, requestParam.data, { headers }).pipe(
      finalize(() => this.finalizeRequest(requestParam.isLoading)),
    );;
  }
  patchJSON(path: string, requestParam: RequestParam = {}) {
    const url = this.getUrl(path);
    if (requestParam.isLoading) {
      this.loadingService.setLoading(true);
    }
    let headers = this.getAuthHeader();
    headers = headers.set('Content-Type', 'application/json');
    return this.httpClient.patch<any>(url, requestParam.data, { headers }).pipe(
      finalize(() => this.finalizeRequest(requestParam.isLoading)),
    );
  }
  deleteJSON(path: string, requestParam: RequestParam = {}) {
    const url = this.getUrl(path);
    if (requestParam.isLoading) {
      this.loadingService.setLoading(true);
    }
    let headers = this.getAuthHeader();
    headers = headers.set('Content-Type', 'application/json');
    return this.httpClient.delete<any>(url, { headers }).pipe(
      finalize(() => this.finalizeRequest(requestParam.isLoading)),
    );
  }
  postFormData(path: string, requestParam: RequestParam = {}) {
    const url = this.getUrl(path);
    if (requestParam.isLoading) {
      this.loadingService.setLoading(true);
    }
    let headers = this.getAuthHeader();
    // Do NOT manually set Content-Type for FormData - the browser will set the correct boundary
    const data = this.toFormData(requestParam.data);
    return this.httpClient.post<any>(url, data, { headers }).pipe(
      finalize(() => this.finalizeRequest(requestParam.isLoading)),
    );
  }
  patchFormData(path: string, requestParam: RequestParam = {}) {
    const url = this.getUrl(path);
    if (requestParam.isLoading) {
      this.loadingService.setLoading(true);
    }
    let headers = this.getAuthHeader();
    // Do NOT manually set Content-Type for FormData - the browser will set the correct boundary
    const data = this.toFormData(requestParam.data);
    return this.httpClient.patch<any>(url, data, { headers }).pipe(
      finalize(() => this.finalizeRequest(requestParam.isLoading)),
    );
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
  private finalizeRequest(is_loading?: boolean) {
    if (is_loading) {
      this.loadingService.setLoading(false);
    }
  }
}
