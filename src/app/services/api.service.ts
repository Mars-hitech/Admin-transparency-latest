import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import { AppComponent } from '../app.component';


@Injectable({
  providedIn: 'root',
})
export class ApiService {

  public Country: any = this.restangular.service('countries').withHttpConfig({ cache: true });
  public Person: any = this.restangular.service('people');
  public Student: any = this.restangular.service('students');
  public RoleUser: any = this.restangular.service('role_users');
  public Tutor: any = this.restangular.service('tutors');
  public Absent: any = this.restangular.service('absents');
  public Retard: any = this.restangular.service('retards');
  public AssessnentType: any = this.restangular.service('assessment_types').withHttpConfig({ cache: true });
  public Teacher: any = this.restangular.service('teachers').withHttpConfig({ cache: true });
  public SchoolYear: any = this.restangular.service('school_years').withHttpConfig({ cache: true });
  public TimeSlot: any = this.restangular.service('time_slots').withHttpConfig({ cache: true });
  public User: any = this.restangular.service('users').withHttpConfig({ cache: true });
  public Classe: any = this.restangular.service('classes').withHttpConfig({ cache: true });
  public Sequence: any = this.restangular.service('sequences').withHttpConfig({ cache: true });
  public Trimestre: any = this.restangular.service('trimestres').withHttpConfig({ cache: true });
  public AssessmentType: any = this.restangular.service('assessment_types').withHttpConfig({ cache: true });
  public Matiere: any = this.restangular.service('matieres').withHttpConfig({ cache: true });
  public Program: any = this.restangular.service('programmers').withHttpConfig({ cache: true });
  public Note: any = this.restangular.service('notes').withHttpConfig({ cache: true });
  public Event: any = this.restangular.service('events').withHttpConfig({ cache: true });
  public News: any = this.restangular.service('news').withHttpConfig({ cache: true });
  public Message: any = this.restangular.service('messages').withHttpConfig({ cache: true });
  public ChatUser: any = this.restangular.service('chat_users').withHttpConfig({ cache: true });
  public Inscrit: any = this.restangular.service('inscrits').withHttpConfig({ cache: true });
  public Chat: any = this.restangular.service('chats').withHttpConfig({ cache: true });
  public Role: any = this.restangular.service('roles').withHttpConfig({ cache: true });
  public Permission: any = this.restangular.service('permissions').withHttpConfig({ cache: true });
  public PermissionRole: any = this.restangular.service('permission_roles').withHttpConfig({ cache: true });
  public MoyenneSequentielle: any = this.restangular.service('moyenne_sequentielles');
  public MoyenneTrimestrielle: any = this.restangular.service('moyenne_trimestrielles');
  public MoyenneAnnuelle: any = this.restangular.service('moyenne_annuelles');
  public ResultatSequentielle: any = this.restangular.service('resultat_sequentielles');
  public ResultatTrimestrielle: any = this.restangular.service('resultat_trimestrielles');
  public ResultatAnnuelle: any = this.restangular.service('resultat_annuelles');
  public School: any = this.restangular.service('schools');

  constructor(public restangular: Restangular) {

    restangular.withConfig((RestangularConfigurer) => {
      RestangularConfigurer
        .addFullRequestInterceptor(function (element, operation, what, url, headers) {
          const token = AppComponent.currentToken;
          if (token) {
            headers.Authorization = 'Bearer ' + token;
            headers['Access-Token'] = token;
          }
        })
        .addResponseInterceptor(function (data, operation, what, url, response, deferred) {
          if (response.headers) {
            if (response.headers.hasOwnProperty('X-Page-Total')) {
              data.metadata = {
                total: response.headers.get('X-Page-Total'),
                per_page: response.headers.get('X-Per-Page'),
              };
              return data;
            }
          }
          return data;
        });
    });
  }

}
