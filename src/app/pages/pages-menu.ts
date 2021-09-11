import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'ADMINISTRATION',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },

  {
    title: 'Elèves',
    icon: 'shuffle-2-outline',
    children: [
      {
        title: 'Elèves',
        link: '/pages/students-list',
        icon: 'people-outline',
      },
      {
        title: 'Absence',
        link: '/pages/absences',
        icon: 'person-delete-outline',
      },
      {
        title: 'Retard',
        link: '/pages/retards',
        icon: 'compass-outline',
      },
      {
        title: 'Inscrits',
        link: '/pages/students',
        icon: 'person-done-outline',
      },
      {
        title: 'Inscrition',
        link: '/pages/inscription',
        icon: 'save-outline',
      },
    
      {
        title: 'Associer un parent',
        link: '/pages/student-parent',
        icon: 'link-2-outline',
      },
    ],
  },

  {
    title: 'Gestion des Notes',
    icon: 'file-text-outline',
    children: [
      {
        title: 'Note Liste',
        icon: 'file-add-outline',
        link: '/pages/note-list',
      },
      /*
      {
        title: 'Note Sequentielles',
        icon: 'file-add-outline',
        link: '/pages/moyenne-sequentielle',
      },
      {
        title: 'Note Trimestrielles',
        link: '/pages/moyenne-trimestrielle',
        icon: 'file-add-outline',
      },
      {
        title: 'Note Annuelles',
        link: '/pages/moyenne-annuelle',
        icon: 'file-add-outline',
      },*/
    ],
  },

 /* {
    title: 'Gestion des Resultats',
    icon: 'plus-square-outline',
    children: [
      {
        title: 'Resultat Sequentielles',
        icon: 'file-add-outline',
        link: '/pages/resultat-sequentielle',
      },
      {
        title: 'Resultat Trimestrielles',
        link: '/pages/resultat-trimestrielle',
        icon: 'file-add-outline',
      },
      {
        title: 'Resultat Annuelles',
        link: '/pages/resultat-annuelle',
        icon: 'file-add-outline',
      },
    ],
  },
*/

  {
    title: 'Conversations',
    icon: 'message-square-outline',
    children: [
      {
        title: 'conversations',
        icon: 'calendar-outline',
        link: '/pages/chat-list',
      },
      {
        title: 'Personnes dans le tchat',
        icon: 'calendar-outline',
        link: '/pages/chat-user-list',
      },
      {
        title: 'Messages',
        icon: 'calendar-outline',
        link: '/pages/message-list',
      },
      {
        title: 'news',
        icon: 'calendar-outline',
        link: '/pages/news-list',
      },
      {
        title: 'Evenements',
        icon: 'calendar-outline',
        link: '/pages/notifications',
      },
    
    ],
  },
 

  {
    title: 'Administration',
    icon: 'settings-outline',
    children: [
      
      {
        title: 'Pays',
        link: '/pages/pays-list',
        icon: 'link-outline',
      },
      {
        title: 'Ville',
        link: '/pages/ville-list',
        icon: 'link-outline',
      },
      {
        title: 'School',
        link: '/pages/school-list',
        icon: 'link-outline',
      },
      {
        title: 'Année scolaire',
        link: '/pages/school-year-list',
        icon: 'link-outline',
      },
      {
        title: 'plage horaire',
        link: '/pages/time-slot-list',
        icon: 'link-outline',
      },
      {
        title: 'Classes',
        link: '/pages/classes',
        icon: 'link-outline',
      },
      {
        title: 'Sequence',
        link: '/pages/sequences',
        icon: 'credit-card-outline',
      },
      {
        title: 'Type d\'evaluation',
        link: '/pages/assessment_types',
        icon: 'shield-outline',
      },
      {
        title: 'Matiere',
        link: '/pages/matieres',
        icon: 'trash',
      },
      {
        title: 'Programme',
        link: '/pages/programs',
        icon: 'trash',
      },
    ],
  },
  {
    title: 'Comptes',
    icon: 'person-outline',
    children: [
      {
        title: 'utilisateurs',
        link: '/pages/user-list',
        icon: 'link-outline',
      },
       {
        title: 'personnes',
        link: '/pages/personne-list',
        icon: 'link-outline',
      },
      {
        title: 'tuteurs',
        link: '/pages/tuteurs-list',
        icon: 'link-outline',
      },
      {
        title: 'Enseignants',
        link: '/pages/teachers',
        icon: 'link-outline',
      },
        {
        title: 'Roles',
        link: '/pages/roles-list',
        icon: 'link-outline',
      },
      
        {
        title: 'Roles utilisateurs',
        link: '/pages/roles-user-list',
        icon: 'link-outline',
      },
      {
        title: 'Permissions',
        link: '/pages/permission-list',
        icon: 'link-outline',
      },
      {
        title: 'Permissions roles',
        link: '/pages/permission-role-list',
        icon: 'link-outline',
      },
     
    ],
  },
];
