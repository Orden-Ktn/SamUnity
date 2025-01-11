from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'nom', 'email', 'poste', 'mandature', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # Hasher le mot de passe avant de sauvegarder l'utilisateur
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)


class Depot_epreuveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Depot_epreuve
        fields = ['epreuve', 'corrige_type', 'niveau', 'test', 'annee']

    def validate_epreuve(self, value):
        allowed_extensions = ['.docx']
        if not any(value.name.endswith(ext) for ext in allowed_extensions):
            raise serializers.ValidationError("Le fichier doit être un fichier Word.")
        return value

    def validate_corrige_type(self, value):
        allowed_extensions = ['.docx']
        if not any(value.name.endswith(ext) for ext in allowed_extensions):
            raise serializers.ValidationError("Le fichier doit être un fichier Word.")
        return value


class Ajout_annee_pastoraleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Annee_pastorale
        fields = ['id', 'annee', 'statut']
        read_only_fields = ['statut']


class Cotisation_EnfantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cotisation_Enfant
        fields = ['date', 'annee', 'montant']


class Cotisation_AnimateurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cotisation_Animateur
        fields = ['mois', 'annee', 'nom', 'montant']


class ResponsableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Responsable
        fields = ['nom', 'statut', 'annee']


class DepenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Depense
        fields = ['date', 'montant', 'motif', 'caisse', 'annee']


class BeneficeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Benefice
        fields = ['date', 'montant', 'motif', 'annee']


class PenaliteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Penalite
        fields = ['date', 'montant', 'motif', 'annee']


class Ancien_SoldeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ancien_Solde
        fields = ['solde', 'annee']


class Objectif_TGSerializer(serializers.ModelSerializer):
    class Meta:
        model = Objectif_TG
        fields = ['objectif', 'annee']


class Objectif_OGSerializer(serializers.ModelSerializer):
    class Meta:
        model = Objectif_OG
        fields = ['objectif', 'annee']


class Objectif_SGSerializer(serializers.ModelSerializer):
    class Meta:
        model = Objectif_SG
        fields = ['objectif', 'annee']


class Objectif_FOSerializer(serializers.ModelSerializer):
    class Meta:
        model = Objectif_FO
        fields = ['objectif', 'annee']


class MontantCalculeSerializer(serializers.ModelSerializer):
    class Meta:
        model = MontantCalcule
        fields = [
            'id', 
            'ancien_solde',
            'total_cotisations',
            'total_benefices',
            'total_penalites',
            'total_depenses',
            'nouveau_solde',
            'annee',
        ]


class ActiviteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Activite
        fields = ['intitule', 'annee']


class Bilan_ActiviteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bilan_Activite
        fields = ['activite', 'effectif', 'montant', 'ressource', 'difficulte', 'annee']


class Point_ActiviteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Point_Activite
        fields = ['activite', 'effectif', 'montantrecolte', 'montantdepense', 'benefice', 'perte', 'annee']


class Participant_ActiviteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Participant_Activite
        fields = ['activite', 'nom', 'prenom', 'niveau', 'annee']


class EnfantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enfant
        fields = ['nom', 'prenom', 'age', 'niveau_etude', 'niveau', 'catechese', 'annee']


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'


class ClassementReveillonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classement_reveillon
        fields = '__all__'      

        
class ClassementSemaineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classement_semaine
        fields = '__all__'

class ClassementTriduumPascalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classement_triduum_pascal
        fields = '__all__'


class ClassementFeteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classement_fete
        fields = '__all__'