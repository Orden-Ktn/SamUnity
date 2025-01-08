from django.db import models
from django.contrib.auth.hashers import make_password, check_password

class User(models.Model):
    nom = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    poste = models.CharField(max_length=50)
    mandature = models.CharField(max_length=50)
    password = models.CharField(max_length=255)  # Pour stocker le mot de passe haché

    def save(self, *args, **kwargs):
        # Hacher le mot de passe uniquement si le mot de passe est en texte brut
        if not self.password.startswith('pbkdf2_'):
            self.password = make_password(self.password)
        super().save(*args, **kwargs)

    def check_password(self, raw_password):
        # Vérifie si le mot de passe brut correspond au mot de passe haché
        return check_password(raw_password, self.password)

    def __str__(self):
        return self.nom


class Depot_epreuve(models.Model):
    epreuve = models.FileField(upload_to='epreuves/')
    corrige_type = models.FileField(upload_to='corriges/')
    niveau = models.CharField(max_length=255)
    test = models.CharField(max_length=255)
    annee = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.niveau} - {self.epreuve.name} - {self.corrige_type.name}"


class Annee_pastorale(models.Model):
    annee = models.CharField(max_length=255)
    statut = models.CharField(max_length=10, default='inactif')

class Cotisation_Enfant(models.Model):
    date = models.DateField()
    annee = models.CharField(max_length=255)
    montant = models.CharField(max_length=500)

    def __str__(self):
        return f"{self.date} - {self.montant} FCFA"
    

class Cotisation_Animateur(models.Model):
    mois = models.CharField(max_length=255)
    annee = models.CharField(max_length=255)
    nom = models.CharField(max_length=255)
    montant = models.CharField(max_length=500)

    def __str__(self):
        return f"{self.date} - {self.montant} FCFA"


class Responsable(models.Model):
    nom = models.CharField(max_length=255)
    statut = models.CharField(max_length=10)
    annee = models.CharField(max_length=255)
    

class Depense(models.Model):
    date = models.DateField()
    annee = models.CharField(max_length=255)
    montant = models.CharField(max_length=500)
    motif = models.CharField(max_length=1000)
    caisse = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.date} - {self.montant} FCFA"


class Benefice(models.Model):
    date = models.DateField()
    annee = models.CharField(max_length=255)
    montant = models.CharField(max_length=500)
    motif = models.CharField(max_length=1000)

    def __str__(self):
        return f"{self.date} - {self.montant} FCFA"
    

class Penalite(models.Model):
    date = models.DateField()
    annee = models.CharField(max_length=255)
    montant = models.CharField(max_length=500)
    motif = models.CharField(max_length=1000)

    def __str__(self):
        return f"{self.date} - {self.montant} FCFA"
    

class Ancien_Solde(models.Model):
    annee = models.CharField(max_length=255)
    solde = models.CharField(max_length=500)


class Objectif_TG(models.Model):
    objectif = models.CharField(max_length=5000)
    annee = models.CharField(max_length=255)


class Objectif_OG(models.Model):
    objectif = models.CharField(max_length=5000)
    annee = models.CharField(max_length=255)

class Objectif_SG(models.Model):
    objectif = models.CharField(max_length=5000)
    annee = models.CharField(max_length=255)

class Activite(models.Model):
    intitule = models.CharField(max_length=5000)
    annee = models.CharField(max_length=255)


class Bilan_Activite(models.Model):
    activite = models.CharField(max_length=700)
    effectif = models.CharField(max_length=500)
    montant = models.CharField(max_length=500)
    ressource = models.CharField(max_length=5000)
    difficulte = models.CharField(max_length=5000)
    annee = models.CharField(max_length=255)


class Point_Activite(models.Model):
    activite = models.CharField(max_length=700)
    effectif = models.CharField(max_length=500)
    montantrecolte = models.CharField(max_length=500)
    montantdepense = models.CharField(max_length=500)
    benefice = models.CharField(max_length=500)
    perte = models.CharField(max_length=500)
    annee = models.CharField(max_length=255)


class MontantCalcule(models.Model):
    ancien_solde = models.CharField(max_length=500)
    total_cotisations = models.CharField(max_length=500)
    total_benefices = models.CharField(max_length=500)
    total_penalites = models.CharField(max_length=500)
    total_depenses = models.CharField(max_length=500)
    nouveau_solde = models.CharField(max_length=500)
    date_mise_a_jour = models.DateTimeField(auto_now=True)
    annee = models.CharField(max_length=255)

    def __str__(self):
        return f"Montant calculé au {self.date_mise_a_jour}"
    

class Participant_Activite(models.Model):
    activite = models.CharField(max_length=700)
    nom = models.CharField(max_length=500)
    prenom = models.CharField(max_length=500)
    niveau = models.CharField(max_length=500)
    annee = models.CharField(max_length=255)


class Enfant(models.Model):
    nom = models.CharField(max_length=500)
    prenom = models.CharField(max_length=500)
    age = models.CharField(max_length=700)
    niveau = models.CharField(max_length=500)
    niveau_etude = models.CharField(max_length=700)
    catechese = models.CharField(max_length=700)
    annee = models.CharField(max_length=255)


class Note(models.Model):
    enfant = models.ForeignKey(Enfant, on_delete=models.CASCADE)
    option = models.CharField(max_length=100)
    note = models.FloatField()
    date_ajout = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.enfant.nom} - {self.option} - {self.note}"
