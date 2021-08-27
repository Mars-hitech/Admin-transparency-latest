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
import { NoteShowComponent } from './note-show/note-show.component';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsAddComponent } from './news-add/news-add.component';
import { NewsShowComponent } from './news-show/news-show.component';
import { MessageListComponent } from './message-list/message-list.component';
import { MessageAddComponent } from './message-add/message-add.component';
import { MessageShowComponent } from './message-show/message-show.component';
import { ChatUserListComponent } from './chat-user-list/chat-user-list.component';
import { ChatUserAddComponent } from './chat-user-add/chat-user-add.component';
import { ChatUserShowComponent } from './chat-user-show/chat-user-show.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatAddComponent } from './chat-add/chat-add.component';
import { ChatShowComponent } from './chat-show/chat-show.component';
import { NotificationShowComponent } from './notification-show/notification-show.component';
import { PaysListComponent } from './pays-list/pays-list.component';
import { PaysAddComponent } from './pays-add/pays-add.component';
import { PaysShowComponent } from './pays-show/pays-show.component';
import { VilleListComponent } from './ville-list/ville-list.component';
import { VilleAddComponent } from './ville-add/ville-add.component';
import { VilleShowComponent } from './ville-show/ville-show.component';
import { SchoolListComponent } from './school-list/school-list.component';
import { SchoolAddComponent } from './school-add/school-add.component';
import { SchoolShowComponent } from './school-show/school-show.component';
import { SchoolYearListComponent } from './school-year-list/school-year-list.component';
import { SchoolYearAddComponent } from './school-year-add/school-year-add.component';
import { SchoolYearShowComponent } from './school-year-show/school-year-show.component';
import { TimeSlotListComponent } from './time-slot-list/time-slot-list.component';
import { TimeSlotAddComponent } from './time-slot-add/time-slot-add.component';
import { TimeSlotShowComponent } from './time-slot-show/time-slot-show.component';
import { ClasseShowComponent } from './classe-show/classe-show.component';
import { TagInputModule } from 'ngx-chips';
import { UserListComponent } from './user-list/user-list.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserShowComponent } from './user-show/user-show.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgSelectModule } from '@ng-select/ng-select';
import { PersonneListComponent } from './personne-list/personne-list.component';
import { PersonneAddComponent } from './personne-add/personne-add.component';
import { PersonneShowComponent } from './personne-show/personne-show.component';
import { TuteursListComponent } from './tuteurs-list/tuteurs-list.component';
import { TuteursAddComponent } from './tuteurs-add/tuteurs-add.component';
import { TuteursShowComponent } from './tuteurs-show/tuteurs-show.component';
import { RolesListComponent } from './roles-list/roles-list.component';
import { RolesAddComponent } from './roles-add/roles-add.component';
import { RolesShowComponent } from './roles-show/roles-show.component';
import { RolesUserShowComponent } from './roles-user-show/roles-user-show.component';
import { RolesUserAddComponent } from './roles-user-add/roles-user-add.component';
import { RolesUserListComponent } from './roles-user-list/roles-user-list.component';
import { PermissionListComponent } from './permission-list/permission-list.component';
import { PermissionAddComponent } from './permission-add/permission-add.component';
import { PermissionShowComponent } from './permission-show/permission-show.component';
import { PermissionRoleListComponent } from './permission-role-list/permission-role-list.component';
import { PermissionRoleAddComponent } from './permission-role-add/permission-role-add.component';
import { PermissionRoleShowComponent } from './permission-role-show/permission-role-show.component';
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
    TagInputModule, 
    DataTablesModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgSelectModule,
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
    NoteShowComponent,
    NewsListComponent,
    NewsAddComponent,
    NewsShowComponent,
    MessageListComponent,
    MessageAddComponent,
    MessageShowComponent,
    ChatUserListComponent,
    ChatUserAddComponent,
    ChatUserShowComponent,
    ChatListComponent,
    ChatAddComponent,
    ChatShowComponent,
    NotificationShowComponent,
    PaysListComponent,
    PaysAddComponent,
    PaysShowComponent,
    VilleListComponent,
    VilleAddComponent,
    VilleShowComponent,
    SchoolListComponent,
    SchoolAddComponent,
    SchoolShowComponent,
    SchoolYearListComponent,
    SchoolYearAddComponent,
    SchoolYearShowComponent,
    TimeSlotListComponent,
    TimeSlotAddComponent,
    TimeSlotShowComponent,
    ClasseShowComponent,
    UserListComponent,
    UserAddComponent,
    UserShowComponent,
    PersonneListComponent,
    PersonneAddComponent,
    PersonneShowComponent,
    TuteursListComponent,
    TuteursAddComponent,
    TuteursShowComponent,
    RolesListComponent,
    RolesAddComponent,
    RolesShowComponent,
    RolesUserShowComponent,
    RolesUserAddComponent,
    RolesUserListComponent,
    PermissionListComponent,
    PermissionAddComponent,
    PermissionShowComponent,
    PermissionRoleListComponent,
    PermissionRoleAddComponent,
    PermissionRoleShowComponent,
  ],
})
export class PagesModule {
}
