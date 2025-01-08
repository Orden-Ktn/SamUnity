from django.urls import path
from . import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
#Authentification
    path('create/', views.create_user, name='create_user'),
    path('login/', views.login_user, name='login_user'),

#Epreuve
    path('depot_epreuve/', views.depot_epreuve, name='depot_epreuve'),
    path('all_epreuves/', views.all_epreuves, name='all_epreuves'),

#Anné pastorale
    path('ajout_annee_pastorale/', views.ajout_annee_pastorale, name='ajout_annee_pastorale'),
    path('all_annees_pastorales/', views.all_annees_pastorales, name='all_annees_pastorales'),
    path('activer_annee_pastorale/<int:id>/', views.activer_annee_pastorale, name='activer_annee_pastorale'),
    path('annee-active/', views.get_annee_active, name='annee-active'),

#Cotisation des enfants
    path('ajout_cotisation_enfant/', views.ajout_cotisation_enfant, name='ajout_cotisation_enfant'),
    path('point-cotisations-enfant/', views.point_cotisation_enfant, name='point-cotisations-enfant'),

#Cotisation des animateurs
    path('ajout_cotisations_animateur/', views.ajout_cotisation_animateur, name='ajout_cotisations_animateur'),
    path('point-cotisations-animateur/', views.point_cotisation_animateur, name='point-cotisations-animateur'),
    
#Responsables
    path('users/', views.get_users, name='users'),
    path('ajout_responsable/', views.ajout_responsable, name='ajout_responsable'),
    path('liste_responsable/', views.liste_responsable, name='liste_responsable'),
    path("all_fa/", views.get_fa, name="all_fa"),

#Dépenses
    path('ajout_depense/', views.ajout_depense, name='ajout_depense'),
    path('point-depense/', views.point_depense, name='point-depense'),

#Bénéfices
    path('ajout_benefice/', views.ajout_benefice, name='ajout_benefice'),
    path('point-benefice/', views.point_benefice, name='point-benefice'),

#Pénélatités
    path('ajout_penalite/', views.ajout_penalite, name='ajout_penalite'),
    path('point-penalite/', views.point_penalite, name='point-penalite'),

#Etat de la caisse
    path('ajout_ancien_solde/', views.ajout_ancien_solde, name='ajout_ancien_solde'),
    path('solde_courant/', views.solde_courant, name='solde_courant'),

#Objectif TG
    path('ajout_objectif_tresorerie/', views.ajout_objectif_tresorerie, name='ajout_objectif_tresorerie'),
    path("all_objectifs_tresorerie/", views.get_objectifs_tresorerie, name="all_objectifs_tresorerie"),

#Objectif SG
    path('ajout_objectif_secretariat/', views.ajout_objectif_secretariat, name='ajout_objectif_secretariat'),
    path("all_objectifs_secretariat/", views.get_objectifs_secretariat, name="all_objectifs_secretariat"),

#Objectif OG
    path('ajout_objectif_organisation/', views.ajout_objectif_organisation, name='ajout_objectif_organisation'),
    path("all_objectifs_organisation/", views.get_objectifs_organisation, name="all_objectifs_organisation"),

#Objectif FO
    path('ajout_objectif_formation/', views.ajout_objectif_formation, name='ajout_objectif_formation'),
    path("all_objectifs_formation/", views.get_objectifs_formation, name="all_objectifs_formation"),

#Activités
    path('ajout_activite/', views.ajout_activite, name='ajout_activite'),
    path("all_activite/", views.get_activite, name="all_activite"),

#Point d'activité côté OG
    path('ajout_bilan_activite/', views.ajout_bilan_activite, name='ajout_bilan_activite'),
    path("all_bilan_activite/", views.get_bilan_activite, name="all_bilan_activite"),

#Bilan d'activité côté TG
    path('ajout_point_activite/', views.ajout_point_activite, name='ajout_point_activite'),
    path("all_point_activite/", views.get_point_activite, name="all_point_activite"),

#Montants
    path("all_montant/", views.get_montant_calculer, name="all_montant"),

#Participants
    path('ajout_participant/', views.ajout_participant, name='ajout_participant'),
    path("all_participant/", views.get_participant, name="all_participant"),
    path('search/', views.search_activity, name='search_activity'),

#Enfants
    path('ajout_enfant/', views.ajout_enfant, name='ajout_enfant'),
    path("all_enfant/", views.get_enfant, name="all_enfant"),
    path('search_niveau/', views.search_niveau, name='search_niveau'),

#Notes
    path('ajout_note/', views.ajout_note, name='ajout_note'),
    path('voir_notes/', views.voir_notes, name='voir_notes'),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

