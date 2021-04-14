import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  url:string='http://localhost:8080/doctor/';

  constructor(private http:HttpClient) { }

  getAllDoctors()
  {
    return this.http.get(this.url);
  }

  findDoctorById(doctorId:string)
  {
    return this.http.get(this.url+doctorId);
  }

  addDoctor(doctor:any)
  {
    return this.http.post(this.url,doctor);
  }

  modifyDoctor(doctor:any)
  {
    return this.http.put(this.url,doctor);
  }

  deleteDoctor(doctorId:string)
  {
    return this.http.delete(this.url+doctorId);
  }

}
