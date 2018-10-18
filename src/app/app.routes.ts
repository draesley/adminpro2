import { Routes, RouterModule } from '@angular/router'
import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { RegisterComponent } from './login/register.component';
import { PagesComponent } from './pages/pages.component';
import { LoginGuardGuard } from './services/services.index';
import { EmailComponent } from './email/email.component';



const appRoutes: Routes = [
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'register',
        component:RegisterComponent
    },
    {
        path:'email',
        component:EmailComponent,
        data:{title:'Email'}
    },
    {
        path:'',
        component:PagesComponent,
        canActivate:[LoginGuardGuard],
        loadChildren:'./pages/pages.module#PagesModule'
    },
    {
        path:'**',
        component: NopagefoundComponent
    }
]
export const APP_ROUTES = RouterModule.forRoot(appRoutes, {useHash:true});