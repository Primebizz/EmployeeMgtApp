import { Routes } from '@angular/router';
import { EmployeeListComponent } from './pages/employee-list/employee-list.component';
import { EmployeeFormComponent } from './pages/employee-form/employee-form.component';
import { PageNotfoundComponent } from './pages/page-notfound/page-notfound.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
    },

    {
        path: 'list',
        component: EmployeeListComponent,
        title: 'Employee List'
    },

    {
        path: 'form',
        component: EmployeeFormComponent,
        title: 'Employee Form'
    },

    {
        path: 'edit-form/:id',
        component: EmployeeFormComponent,
        title: 'Edit Form Data'
    },

    {
        path: "**",
        component: PageNotfoundComponent,
        title: 'Bad Url Search'
    }

];
