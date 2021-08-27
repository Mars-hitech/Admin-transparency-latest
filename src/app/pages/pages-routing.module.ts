import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import {AuthGuard} from '../auth-guard.service';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
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
import {SequencesComponent} from './sequences/sequences.component';
import {SequenceComponent} from './sequence/sequence.component';
import {AssessmentTypesComponent} from './assessment_types/assessment_types.component';
import {AssessmentTypeComponent} from './assessment_type/assessment_type.component';
import {MatiereComponent} from './matiere/matiere.component';
import {MatieresComponent} from './matieres/matieres.component';
import {ProgramsComponent} from './programs/programs.component';
import {ProgramComponent} from './program/program.component';
import {NotesComponent} from './notes/notes.component';
import {NotificationsComponent} from './notifications/notifications.component';
import {NotificationComponent} from './notification/notification.component';
import {MoyenneSequentiellesComponent} from './moyenne_sequentielles/moyenne_sequentielles.component';
import {MoyenneTrimestriellesComponent} from './moyenne_trimestrielles/moyenne_trimestrielles.component';
import {MoyenneAnnuellesComponent} from './moyenne_annuelles/moyenne_annuelles.component';
import {ResultatSequentiellesComponent} from './resultat_sequentielles/resultat_sequentielles.component';
import {ResultatTrimestriellesComponent} from './resultat_trimestrielles/resultat_trimestrielles.component';
import {ResultatAnnuellesComponent} from './resultat_annuelles/resultat_annuelles.component';
import {InscriptionComponent} from './inscription/inscription.component';
import {StudentParentComponent} from './student-parent/student-parent.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentsAddComponent } from './students-add/students-add.component';
import { StudentsShowComponent } from './students-show/students-show.component';
import { AbsentsShowComponent } from './absents-show/absents-show.component';
import { RetardShowComponent } from './retard-show/retard-show.component';
import { InscritShowComponent } from './inscrit-show/inscrit-show.component';
import { NoteListComponent } from './note-list/note-list.component';
import { NoteAddComponent } from './note-add/note-add.component';
import { NoteShowComponent } from './note-show/note-show.component';
import { ChatAddComponent } from './chat-add/chat-add.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatShowComponent } from './chat-show/chat-show.component';
import { MessageListComponent } from './message-list/message-list.component';
import { MessageAddComponent } from './message-add/message-add.component';
import { MessageShowComponent } from './message-show/message-show.component';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsAddComponent } from './news-add/news-add.component';
import { NewsShowComponent } from './news-show/news-show.component';
import { ChatUserListComponent } from './chat-user-list/chat-user-list.component';
import { ChatUserAddComponent } from './chat-user-add/chat-user-add.component';
import { ChatUserShowComponent } from './chat-user-show/chat-user-show.component';
import { NotificationShowComponent } from './notification-show/notification-show.component';
import { PaysListComponent } from './pays-list/pays-list.component';
import { PaysAddComponent } from './pays-add/pays-add.component';
import { VilleListComponent } from './ville-list/ville-list.component';
import { VilleAddComponent } from './ville-add/ville-add.component';
import { VilleShowComponent } from './ville-show/ville-show.component';
import { PaysShowComponent } from './pays-show/pays-show.component';
import { SchoolListComponent } from './school-list/school-list.component';
import { SchoolAddComponent } from './school-add/school-add.component';
import { SchoolShowComponent } from './school-show/school-show.component';
import { SchoolYearShowComponent } from './school-year-show/school-year-show.component';
import { SchoolYearAddComponent } from './school-year-add/school-year-add.component';
import { SchoolYearListComponent } from './school-year-list/school-year-list.component';
import { TimeSlotListComponent } from './time-slot-list/time-slot-list.component';
import { TimeSlotAddComponent } from './time-slot-add/time-slot-add.component';
import { TimeSlotShowComponent } from './time-slot-show/time-slot-show.component';
import { ClasseShowComponent } from './classe-show/classe-show.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserShowComponent } from './user-show/user-show.component';
import { PersonneListComponent } from './personne-list/personne-list.component';
import { PersonneAddComponent } from './personne-add/personne-add.component';
import { PersonneShowComponent } from './personne-show/personne-show.component';
import { TuteursListComponent } from './tuteurs-list/tuteurs-list.component';
import { TuteursAddComponent } from './tuteurs-add/tuteurs-add.component';
import { TuteursShowComponent } from './tuteurs-show/tuteurs-show.component';
import { RolesListComponent } from './roles-list/roles-list.component';
import { RolesAddComponent } from './roles-add/roles-add.component';
import { RolesShowComponent } from './roles-show/roles-show.component';
import { RolesUserListComponent } from './roles-user-list/roles-user-list.component';
import { RolesUserAddComponent } from './roles-user-add/roles-user-add.component';
import { RolesUserShowComponent } from './roles-user-show/roles-user-show.component';
import { PermissionListComponent } from './permission-list/permission-list.component';
import { PermissionAddComponent } from './permission-add/permission-add.component';
import { PermissionShowComponent } from './permission-show/permission-show.component';
import { PermissionRoleListComponent } from './permission-role-list/permission-role-list.component';
import { PermissionRoleAddComponent } from './permission-role-add/permission-role-add.component';
import { PermissionRoleShowComponent } from './permission-role-show/permission-role-show.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
        //permission-role
{
  path: 'permission-role-list',
  component: PermissionRoleListComponent,
},
{
  path: 'permission-role-add',
  component: PermissionRoleAddComponent,
},
{
  path: 'permission-role-add/:id',
  component: PermissionRoleAddComponent,
},
{
  path: 'permission-role-show/:id',
  component: PermissionRoleShowComponent,
},

    //permission
{
  path: 'permission-list',
  component: PermissionListComponent,
},
{
  path: 'permission-add',
  component: PermissionAddComponent,
},
{
  path: 'permission-add/:id',
  component: PermissionAddComponent,
},
{
  path: 'permission-show/:id',
  component: PermissionShowComponent,
},
//roles-user
{
  path: 'roles-user-list',
  component: RolesUserListComponent,
},
{
  path: 'roles-user-add',
  component: RolesUserAddComponent,
},
{
  path: 'roles-user-add/:id',
  component: RolesUserAddComponent,
},
{
  path: 'roles-user-show/:id',
  component: RolesUserShowComponent,
},
//roles
 {
  path: 'roles-list',
  component: RolesListComponent,
},
{
  path: 'roles-add',
  component: RolesAddComponent,
},
{
  path: 'roles-add/:id',
  component: RolesAddComponent,
},
{
  path: 'roles-show/:id',
  component: RolesShowComponent,
},

     //tuteur
 {
  path: 'tuteurs-list',
  component: TuteursListComponent,
},
{
  path: 'tuteurs-add',
  component: TuteursAddComponent,
},
{
  path: 'tuteurs-add/:id',
  component: TuteursAddComponent,
},
{
  path: 'tuteurs-show/:id',
  component: TuteursShowComponent,
},
 //personne
 {
  path: 'personne-list',
  component: PersonneListComponent,
},
{
  path: 'personne-add',
  component: PersonneAddComponent,
},
{
  path: 'personne-add/:id',
  component: PersonneAddComponent,
},
{
  path: 'personne-show/:id',
  component: PersonneShowComponent,
},
    //user
    {
      path: 'user-list',
      component: UserListComponent,
    },
    {
      path: 'user-add',
      component: UserAddComponent,
    },
    {
      path: 'user-add/:id',
      component: UserAddComponent,
    },
    {
      path: 'user-show/:id',
      component: UserShowComponent,
    },
    //time-slot
    {
      path: 'time-slot-list',
      component: TimeSlotListComponent,
    },
    {
      path: 'time-slot-add',
      component: TimeSlotAddComponent,
    },
    {
      path: 'time-slot-add/:id',
      component: TimeSlotAddComponent,
    },
    {
      path: 'time-slot-show/:id',
      component: TimeSlotShowComponent,
    },



    {
      path: 'school-year-list',
      component: SchoolYearListComponent,
    },
    {
      path: 'school-year-add',
      component: SchoolYearAddComponent,
    },
    {
      path: 'school-year-add/:id',
      component: SchoolYearAddComponent,
    },
    {
      path: 'school-year-show/:id',
      component: SchoolYearShowComponent,
    },


    {
      path: 'school-list',
      component: SchoolListComponent,
    },
    {
      path: 'school-add',
      component: SchoolAddComponent,
    },
    {
      path: 'school-add/:id',
      component: SchoolAddComponent,
    },
    {
      path: 'school-show/:id',
      component: SchoolShowComponent,
    },


    {
      path: 'ville-list',
      component: VilleListComponent,
    },
    {
      path: 'ville-add',
      component: VilleAddComponent,
    },
    {
      path: 'ville-add/:id',
      component: VilleAddComponent,
    },
    {
      path: 'ville-show/:id',
      component: VilleShowComponent,
    },


    {
      path: 'pays-list',
      component: PaysListComponent,
    },
    {
      path: 'pays-add',
      component: PaysAddComponent,
    },
    {
      path: 'pays-add/:id',
      component: PaysAddComponent,
    },
    {
      path: 'pays-show/:id',
      component: PaysShowComponent,
    },


    {
      path: 'dash',
      component: ECommerceComponent,
    },
    {
      path: 'dashboard',
      component: ECommerceComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'profile',
      component: ECommerceComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'students-list',
      component: StudentListComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'students',
      component: StudentsComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'student-add',
      component: StudentsAddComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'student-add/:id',
      component: StudentsAddComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'student-show/:id',
      component: StudentsShowComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'add-student',
      component: StudentComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'inscription',
      component: InscriptionComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'inscrit-show/:id',
      component: InscritShowComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'add-student/:id',
      component: StudentComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'student-parent',
      component: StudentParentComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'absences',
      component: AbsencesComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'absent-show/:id',
      component: AbsentsShowComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'add-absent',
      component: AbsentComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'add-absent/:id',
      component: AbsentComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'add-retard',
      component: RetardComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'retard-show/:id',
      component: RetardShowComponent,
      canActivate: [AuthGuard],
    },
   
    {
      path: 'add-retard/:id',
      component: RetardComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'retards',
      component: RetardsComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'add-teacher',
      component: TeacherComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'add-teacher/:id',
      component: TeacherComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'teachers',
      component: TeachersComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'add-classe',
      component: ClasseComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'add-classe/:id',
      component: ClasseComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'show-classe/:id',
      component: ClasseShowComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'classes',
      component: ClassesComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'sequences',
      component: SequencesComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'add-sequence',
      component: SequenceComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'add-sequence/:id',
      component: SequenceComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'assessment_types',
      component: AssessmentTypesComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'add-assessment_type',
      component: AssessmentTypeComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'add-assessment_type/:id',
      component: AssessmentTypeComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'add-matiere',
      component: MatiereComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'add-matiere/:id',
      component: MatiereComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'matieres',
      component: MatieresComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'programs',
      component: ProgramsComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'add-program',
      component: ProgramComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'add-program/:id',
      component: ProgramComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'notes',
      component: NotesComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'note-add',
      component: NoteAddComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'note-add/:id',
      component: NoteAddComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'note-show/:id',
      component: NoteShowComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'note-list',
      component: NoteListComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'add-notification',
      component: NotificationComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'add-notification/:id',
      component: NotificationComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'notification-show/:id',
      component: NotificationShowComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'notifications',
      component: NotificationsComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'chat-list',
      component: ChatListComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'chat-add',
      component: ChatAddComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'chat-add/:id',
      component: ChatAddComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'chat-show/:id',
      component: ChatShowComponent,
      canActivate: [AuthGuard],
    },

    {
      path: 'message-list',
      component: MessageListComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'message-add',
      component: MessageAddComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'message-add/:id',
      component: MessageAddComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'message-show/:id',
      component: MessageShowComponent,
      canActivate: [AuthGuard],
    },

    {
      path: 'news-list',
      component: NewsListComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'news-add',
      component: NewsAddComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'news-add/:id',
      component: NewsAddComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'news-show/:id',
      component: NewsShowComponent,
      canActivate: [AuthGuard],
    },


    {
      path: 'chat-user-list',
      component: ChatUserListComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'chat-user-add',
      component: ChatUserAddComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'chat-user-add/:id',
      component: ChatUserAddComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'chat-user-show/:id',
      component: ChatUserShowComponent,
      canActivate: [AuthGuard],
    },

    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
      canActivate: [AuthGuard],
    },
    {
      path: 'moyenne-sequentielle',
      component: MoyenneSequentiellesComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'moyenne-trimestrielle',
      component: MoyenneTrimestriellesComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'moyenne-annuelle',
      component: MoyenneAnnuellesComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'resultat-sequentielle',
      component: ResultatSequentiellesComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'resultat-trimestrielle',
      component: ResultatTrimestriellesComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'resultat-annuelle',
      component: ResultatAnnuellesComponent,
      canActivate: [AuthGuard],
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
