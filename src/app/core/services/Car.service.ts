import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { Car } from '../models/Car';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiUrl: string = `${environment.baseUrl}/17bb8c76405e43655d551a90800c8a81/raw/d41b4acc3457e51e7533fad6d5e9925ee9676457`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.apiUrl}/202212_MISW4104_Grupo1.json`);
  }
}
