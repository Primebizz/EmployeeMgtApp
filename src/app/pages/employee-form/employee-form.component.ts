import { Component, inject } from '@angular/core';
import { Employee, IDepartment, IDesignation } from '../model';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { EmployeeService } from '../Services/employee.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  imports: [FormsModule, AsyncPipe, ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent {

  employeeForm: any = new FormGroup ({
    fullname: new FormControl(),
    email: new FormControl(),
    phone: new FormControl(),
    gender: new FormControl(),
    dateOfJoining: new FormControl(),
    department: new FormControl(),
    designation: new FormControl(),
    employeeType: new FormControl(),
    salary: new FormControl(),
  })



  employeeObj: Employee = new Employee();

  employeeService = inject(EmployeeService);

  deptList$: Observable<IDepartment[]> = new Observable<IDepartment[]>();

  designationList: IDesignation[] = [];

  activatedRoute = inject(ActivatedRoute);

  emptId: number = 0;

  router = inject(Router);

  constructor(){
    this.deptList$ = this.employeeService.getDepartments();
    this.activatedRoute.params.subscribe((res: any) => {
      this.emptId = res.id;
      if(this.emptId !== 0){
        this.getEmployeeByid();
        this.getDesignation();
      }
    })
  }

  onUpdateEmployee(){
    this.employeeService.updateEmployees(this.employeeObj).subscribe((res: Employee[]) => {

      // alert('Employee Succesfully Created');
      const p = document.createElement('p');
      p.innerText = 'Employee updated';
      p.className = 'bg-green-200 text-green-800 py-2 px-4 rounded-md mt-2'; 
      document.getElementById('form')?.prepend(p);
  
      setTimeout(() => {
        p.style.display = 'none';
      }, 3000);
      this.employeeForm.reset();
      this.onResetEmployee()

    }, error => {
      // alert('Api Error' + error.error);
      const p = document.createElement('p');
      p.innerText = `Error updating employee. ${error.error}`;
      p.className = 'bg-red-200 text-red-800 py-2 px-4 rounded-md mt-2'; 
      document.getElementById('form')?.prepend(p);
  
      setTimeout(() => {
        p.style.display = 'none';
        this.onResetEmployee();
      }, 3000);
      
    }

    )
  }

  getEmployeeByid(){
    this.employeeService.getEmployeesById(this.emptId).subscribe((res: Employee) => {
      this.employeeObj = res;
    })
  }

  onSaveEmployee() {
    this.employeeService.createEmployees(this.employeeObj).subscribe((res: Employee[]) => {
      // alert('Employee Successfully Created');
      const p = document.createElement('p');
      p.innerText = 'Employee created';
      p.className = 'bg-green-200 text-green-800 py-2 px-4 rounded-md mt-2'; 
      document.getElementById('form')?.prepend(p);
  
      setTimeout(() => {
        p.style.display = 'none';
      }, 3000);
      this.employeeForm.reset();
  
    }, error => {
      // alert('Api Error' + error.error);
      const p = document.createElement('p');
      p.innerText = `Error creating employee. ${error.error}`;
      p.className = 'bg-red-200 text-red-800 py-2 px-4 rounded-md mt-2'; 
      document.getElementById('form')?.prepend(p);
  
      setTimeout(() => {
        p.style.display = 'none';
      }, 3000);
      this.employeeForm.reset();
    })
  }

  onResetEmployee(){
    this.employeeForm.reset();
    this.router.navigateByUrl('form');
  }

  getDesignation(){
    this.employeeService.getDesignationByDeptId(this.employeeObj.departmentId).subscribe((res: IDesignation[]) => {
      this.designationList = res;
    })
  }


    get fullname(){
    return this.employeeForm.get('fullname');
  }

  get dateOfJoining(){
    return this.employeeForm.get('dateOfJoining');
  }

  get email(){
    return this.employeeForm.get('email');
  }

  get phone(){
    return this.employeeForm.get('phone');
  }

  get gender(){
    return this.employeeForm.get('gender');
  }

  // get female(){
  //   return this.employeeForm.get('female');
  // }

  get department(){
    return this.employeeForm.get('department');
  }

  get designation(){
    return this.employeeForm.get('designation');
  }

  get employeeType(){
    return this.employeeForm.get('employeeType');
  }

  get salary(){
    return this.employeeForm.get('salary');
  }

}
