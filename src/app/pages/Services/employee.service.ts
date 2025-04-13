import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee, IDepartment, IDesignation, IEmployeeList } from '../model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  apiUrl: string = 'https://api.freeprojectapi.com/api/EmployeeApp/';

  constructor(private http: HttpClient) { }

  getDepartments(): Observable<IDepartment[]>{
    return this.http.get<IDepartment[]>(`${this.apiUrl}GetDepartments`);
  }

  getDesignationByDeptId(deptId: number) : Observable<IDesignation[]>{
    return this.http.get<IDesignation[]>(`${this.apiUrl}GetDesignationsByDeptId?deptId=${deptId}`)
  }

  getEmployees(): Observable<IEmployeeList[]>{
    return this.http.get<IEmployeeList[]>(`${this.apiUrl}GetEmployees`);
  }

  getEmployeesById(id: number): Observable<Employee>{
    return this.http.get<Employee>(`${this.apiUrl}${id}`);
  }

  createEmployees(obj: Employee): Observable<Employee[]>{
    return this.http.post<Employee[]>(`${this.apiUrl}CreateEmployee`, obj);
  }

  updateEmployees(obj: Employee): Observable<Employee[]>{
    return this.http.put<Employee[]>(`${this.apiUrl}UpdateEmployee`, obj);
  }

  deleteEmployees(id: number) :Observable<Employee[]>{
    return this.http.delete<Employee[]>(`${this.apiUrl}DeleteEmployee?id=${id}`)
  }
}
