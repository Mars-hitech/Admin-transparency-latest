import { NgModule } from '@angular/core';
import {
  NbActionsModule, NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule, NbDatepickerModule, NbDialogModule,
  NbIconModule, NbInputModule,
  NbMenuModule, NbRadioModule, NbSelectModule, NbSpinnerModule, NbStepperModule, NbUserModule,
} from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputFileModule} from 'ngx-input-file';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {StudentsComponent} from './students/students.component';
import {StudentComponent} from './student/student.component';
import {AbsencesComponent} from './absences/absences.component';
import {AbsentComponent} from './absent/absent.component';
import {RetardComponent} from './retard/retard.component';
import {RetardsComponent} from './retards/retards.component';
import {TeacherComponent} from './teacher/teacher.component';
import {TeachersComponent} from './teachers/teachers.component';
import {ClassesComponent} from './classes/classes.component';
import {ClasseComponent} from './classe/classe.component';
import {SequenceComponent} from './sequence/sequence.component';
import {SequencesComponent} from './sequences/sequences.component';
import {AssessmentTypeComponent} from './assessment_type/assessment_type.component';
import {AssessmentTypesComponent} from './assessment_types/assessment_types.component';
import {MatiereComponent} from './matiere/matiere.component';
import {MatieresComponent} from './matieres/matieres.component';
import {ProgramComponent} from './program/program.component';
import {ProgramsComponent} from './programs/programs.component';
import {NotesComponent} from './notes/notes.component';
import {NotificationsComponent} from './notifications/notifications.component';
import {NotificationComponent} from './notification/notification.component';
import {MoyenneSequentiellesComponent} from './moyenne_sequentielles/moyenne_sequentielles.component';
import {MoyenneTrimestriellesComponent} from './moyenne_trimestrielles/moyenne_trimestrielles.component';
import {MoyenneAnnuellesComponent} from './moyenne_annuelles/moyenne_annuelles.component';
import {ResultatSequentiellesComponent} from './resultat_sequentielles/resultat_sequentielles.component';
import {ResultatTrimestriellesComponent} from './resultat_trimestrielles/resultat_trimestrielles.component';
import {ResultatAnnuellesComponent} from './resultat_annuelles/resultat_annuelles.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { StudentParentComponent } from './student-parent/student-parent.component';
import { DataTablesModule } from 'angular-datatables';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentsAddComponent } from './students-add/students-add.component';
import { StudentsShowComponent } from './students-show/students-show.component';
import { AbsentsShowComponent } from './absents-show/absents-show.component';
import { RetardShowComponent } from './retard-show/retard-show.component';
import { InscritShowComponent } from './inscrit-show/inscrit-show.component';
import { NoteListComponent } from './note-list/note-list.component';
import { NoteAddComponent } from './note-add/note-add.component';

@NgModule({
  imports: [
    HttpClientModule,
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    ReactiveFormsModule,
    ECommerceModule,
    NbActionsModule,
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule,
    NbIconModule,
    NbInputModule,
    NbRadioModule,
    NbSelectModule,
    NbCheckboxModule,
    NbUserModule,
    InputFileModule,
    Ng2SmartTableModule,
    NbAlertModule,
    NbSpinnerModule,
    CommonModule,
    FormsModule,
    NgbModule,
    NbDatepickerModule,
    NbStepperModule,
    NbDatepickerModule,
    NbDialogModule.forRoot(),
    DataTablesModule
  ],
  declarations: [
    PagesComponent,
    StudentsComponent,
    StudentComponent,
    AbsencesComponent,
    AbsentComponent,
    RetardComponent,
    RetardsComponent,
    TeacherComponent,
    TeachersComponent,
    ClassesComponent,
    ClasseComponent,
    SequenceComponent,
    SequencesComponent,
    AssessmentTypeComponent,
    AssessmentTypesComponent,
    MatiereComponent,
    MatieresComponent,
    ProgramComponent,
    ProgramsComponent,
    NotesComponent,
    NotificationsComponent,
    NotificationComponent,
    MoyenneSequentiellesComponent,
    MoyenneTrimestriellesComponent,
    MoyenneAnnuellesComponent,
    ResultatSequentiellesComponent,
    ResultatTrimestriellesComponent,
    ResultatAnnuellesComponent,
    InscriptionComponent,
    StudentParentComponent,
    StudentListComponent,
    StudentsAddComponent,
    StudentsShowComponent,
    AbsentsShowComponent,
    RetardShowComponent,
    InscritShowComponent,
    NoteListComponent,
    NoteAddComponent,
  ],
})
export class PagesModule {
}
