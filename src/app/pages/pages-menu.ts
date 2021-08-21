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
      },
    ],
  },

  {
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


  {
    title: 'Conversations',
    icon: 'message-square-outline',
    children: [
      /*
      {
        title: 'Liste des Notifications',
        icon: 'calendar-outline',
        link: '/pages/notifications',
      },
      {
        title: 'Nouvelle Notification',
        link: '/pages/add-notification',
        icon: 'person-add-outline',
      },*/
    ],
  },
 

  {
    title: 'Administration',
    icon: 'settings-outline',
    children: [
      /*
      {
        title: 'Enseignants',
        link: '/pages/teachers',
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
      },*/
    ],
  },
  {
    title: 'Comptes',
    icon: 'person-outline',
    children: [
     /* {
        title: 'Enseignants',
        link: '/pages/teachers',
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
      },*/
    ],
  },
];
