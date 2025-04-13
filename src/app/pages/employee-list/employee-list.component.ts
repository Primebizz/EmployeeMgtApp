import { Component, inject, OnInit } from '@angular/core';
import { Employee, IEmployeeList } from '../model';
import { EmployeeService } from '../Services/employee.service';
import { DatePipe, NumberSymbol } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  imports: [DatePipe],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit{

  employeeList: IEmployeeList[] = [];
  employeeService = inject(EmployeeService);
  router = inject(Router)

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(){
    this.employeeService.getEmployees().subscribe((res: IEmployeeList[]) => {
      this.employeeList = res;
    })
  }

  deleteEmployee(id: number){
    const isDelete = confirm('Are you sure you want to delete this employee?')
    if(isDelete){
      this.employeeService.deleteEmployees(id).subscribe((res: any) => {
        alert('Employee Deleted Successfully');
        this.getEmployees();
      });
      }else{
        alert('Delete Error')
      }
    }

    editEmployee(id: number){
      this.router.navigateByUrl("/edit-form/" + id)
    }
    

}
