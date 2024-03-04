import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpOptions } from '@capacitor/core';
@Injectable({
  providedIn: 'root'
})
export class MyHttpService {

  constructor() { }

  // Asynchronous method for making GET requests using Capacitor's Http
  async get(options: HttpOptions) {
    return await CapacitorHttp.get(options);
  }
}
