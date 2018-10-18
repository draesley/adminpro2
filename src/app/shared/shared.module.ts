import { NgModule } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { BreadcrumdsComponent } from "./breadcrumds/breadcrumds.component";
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { PipesModule } from "../pipes/pipes.module";
import { ModalUploadComponent } from "../components/modal-upload/modal-upload.component";

@NgModule({
    declarations:[
        HeaderComponent,
        SidebarComponent,
        BreadcrumdsComponent,
        ModalUploadComponent
    ],
    exports:[
        HeaderComponent,
        SidebarComponent,
        BreadcrumdsComponent,
        ModalUploadComponent
    ],
    imports:[
        RouterModule,
        CommonModule,
        PipesModule
    ]
})
export class SharedModule{}