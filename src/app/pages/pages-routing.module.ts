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

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
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
      path: 'notifications',
      component: NotificationsComponent,
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
