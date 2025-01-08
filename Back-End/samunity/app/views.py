from venv import logger
import json
from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.mail import send_mail
from .models import *
from .serializers import *
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.decorators import api_view, parser_classes
from django.db.models import Sum
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpRequest
from django.views.decorators.http import require_GET
from django.db.models import Prefetch

#Authentification
@api_view(['POST']) 
def create_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()

        # Envoi de l'e-mail de confirmation
        subject = 'SamUnity'
        message = f"""
            <html>
                <body>
                    <p>Bonjour {user.nom}, {user.poste} du groupe.</p>
                    <p>Votre compte a été créé avec succès.</p>
                    <p>Merci d'avoir rejoint le progiciel SamUnity !</p>
                    <p>Parle Seigneur, ton serviteur écoute.</p>
                    <p>Pour vous connecter, veuillez cliquer sur le lien suivant : 
                    <a href="http://localhost:3000/Authentification/connexion">Se connecter</a></p>
                </body>
            </html>
        """
        from_email = 'samuelpsbsh@gmail.com'
        recipient_list = [user.email]

        try:
            send_mail(subject, message, from_email, recipient_list)
        except Exception as e:
            return Response(
                {"error": f"Utilisateur créé, mais l'envoi de l'e-mail a échoué : {str(e)}"},
                status=status.HTTP_201_CREATED
            )

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login_user(request):
    nom = request.data.get('nom')
    poste = request.data.get('poste')
    mandature = request.data.get('mandature')
    password = request.data.get('password')

    try:
        user = User.objects.get(nom=nom, poste=poste, mandature=mandature)
    except User.DoesNotExist:
        return Response({'detail': 'Utilisateur non trouvé.'}, status=status.HTTP_404_NOT_FOUND)

    if user.check_password(password):
        return Response({'detail': 'Connexion réussie.', 'poste': user.poste}, status=status.HTTP_200_OK)
    else:
        return Response({'detail': 'Mot de passe incorrect.'}, status=status.HTTP_400_BAD_REQUEST)
    

#Epreuves
@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])  # Accepte multipart/form-data pour les fichiers
def depot_epreuve(request):
    if request.method == 'POST':
        # Récupérer l'année active
        annee_active = Annee_pastorale.objects.filter(statut='actif').first()  # Ajustez cette requête selon votre logique
        if not annee_active:
            return Response({"error": "Aucune année active trouvée."}, status=status.HTTP_404_NOT_FOUND)

        # Ajouter l'année active aux données de la requête
        data = request.data
        data['annee'] = annee_active.annee  # Assurez-vous que 'annee' est le bon champ

        print("Received data:", request.data)  # Debug
        serializer = Depot_epreuveSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Epreuve ajoutée avec succès!"}, status=201)
        else:
            return Response(serializer.errors, status=400)

@api_view(['GET'])
def all_epreuves(request):
    annee_active = Annee_pastorale.objects.filter(statut='actif').first()
    epreuves = Depot_epreuve.objects.filter(annee=annee_active.annee)
    serializer = Depot_epreuveSerializer(epreuves, many=True)
    return Response(serializer.data)
        

#Année pastorale
@api_view(['POST'])
def ajout_annee_pastorale(request):
    serializer = Ajout_annee_pastoraleSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(statut='inactif')  # Toujours enregistrer comme inactif
        return Response({"message": "Année pastorale ajoutée avec succès!"}, status=201)
    return Response(serializer.errors, status=400)

@api_view(['POST'])
def activer_annee_pastorale(request, id):
    try:
        # Désactiver toutes les autres années
        Annee_pastorale.objects.update(statut="inactif")

        # Activer l'année sélectionnée
        annee = Annee_pastorale.objects.get(pk=id)
        annee.statut = "actif"
        annee.save()

        return Response({"message": "Année activée avec succès!"}, status=200)
    except Annee_pastorale.DoesNotExist:
        return Response({"error": "Année non trouvée."}, status=404)
    except Exception as e:
        return Response({"error": str(e)}, status=500)

@api_view(['GET'])
def all_annees_pastorales(request):
    annees = Annee_pastorale.objects.all()
    serializer = Ajout_annee_pastoraleSerializer(annees, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_annee_active(request):
    annee_active = Annee_pastorale.objects.filter(statut='actif').first()  # Utiliser first() pour obtenir le premier élément
    if annee_active:
        return Response({'annee': annee_active.annee})  # Retourner l'année active
    return Response({'annee': 'Non définie'})  # Si aucun résultat trouvé


#Cotisation Enfants
@api_view(['POST'])
def ajout_cotisation_enfant(request):
    if request.method == 'POST':
        # Récupérer l'année active
        annee_active = Annee_pastorale.objects.filter(statut='actif').first()  # Ajustez cette requête selon votre logique
        if not annee_active:
            return Response({"error": "Aucune année active trouvée."}, status=status.HTTP_404_NOT_FOUND)

        # Ajouter l'année active aux données de la requête
        data = request.data
        data['annee'] = annee_active.annee  # Assurez-vous que 'annee' est le bon champ
        
        # Sérialisation des données
        serializer = Cotisation_EnfantSerializer(data=data)
        if serializer.is_valid():
            # Sauvegarder la pénalité dans la base de données
            serializer.save()
            # Après l'ajout, on met à jour le solde courant
            solde_courant()  # Appel de la vue solde_courant pour mettre à jour les montants
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
def ajout_cotisation_animateur(request):
    if request.method == 'POST':
        # Récupérer l'année active
        annee_active = Annee_pastorale.objects.filter(statut='actif').first()  # Ajustez cette requête selon votre logique
        if not annee_active:
            return Response({"error": "Aucune année active trouvée."}, status=status.HTTP_404_NOT_FOUND)

        # Ajouter l'année active aux données de la requête
        data = request.data
        data['annee'] = annee_active.annee  # Assurez-vous que 'annee' est le bon champ

        # Sérialisation des données
        serializer = Cotisation_AnimateurSerializer(data=data)
        if serializer.is_valid():
            # Sauvegarder la pénalité dans la base de données
            serializer.save()
            # Après l'ajout, on met à jour le solde courant
            solde_courant()  # Appel de la vue solde_courant pour mettre à jour les montants
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def point_cotisation_enfant(request):
    annee_active = Annee_pastorale.objects.filter(statut='actif').first()
    cotisations = Cotisation_Enfant.objects.filter(annee=annee_active.annee)
    
    # Calcul du total
    total_cotisations = sum(float(cotisation.montant) for cotisation in cotisations if cotisation.montant)
    
    serializer = Cotisation_EnfantSerializer(cotisations, many=True)
    return Response({
        'cotisations': serializer.data,
        'total_cotisations': total_cotisations
    })


#Cotisation Animateurs
@api_view(['GET'])
def cotisation_animateur_list(request):
    annee_active = Annee_pastorale.objects.filter(statut='actif').first()
    cotisations = Cotisation_Animateur.objects.filter(annee=annee_active.annee)
    serializer = Cotisation_AnimateurSerializer(cotisations, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def point_cotisation_animateur(request):
    annee_active = Annee_pastorale.objects.filter(statut='actif').first()
    cotisations = Cotisation_Animateur.objects.filter(annee=annee_active.annee)
    
    # Calcul du total
    total_cotisations = sum(float(cotisation.montant) for cotisation in cotisations if cotisation.montant)
    
    serializer = Cotisation_AnimateurSerializer(cotisations, many=True)
    return Response({
        'cotisations': serializer.data,
        'total_cotisations': total_cotisations
    })



#Responsables
@api_view(['GET'])
def get_users(request):
    users = Responsable.objects.all()
    serializer = ResponsableSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def liste_responsable(request):
    annee_active = Annee_pastorale.objects.filter(statut='actif').first()
    users = Responsable.objects.filter(annee=annee_active.annee)
    serializer = ResponsableSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def ajout_responsable(request):
    if request.method == 'POST':
        # Récupérer l'année active
        annee_active = Annee_pastorale.objects.filter(statut='actif').first()  # Ajustez cette requête selon votre logique
        if not annee_active:
            return Response({"error": "Aucune année active trouvée."}, status=status.HTTP_404_NOT_FOUND)

        # Ajouter l'année active aux données de la requête
        data = request.data
        data['annee'] = annee_active.annee  # Assurez-vous que 'annee' est le bon champ

        serializer = ResponsableSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def get_fa(request):
    annee_active = Annee_pastorale.objects.filter(statut='actif').first()
    responsables_fa = Responsable.objects.filter(statut="FA", annee=annee_active.annee)
    serializer = ResponsableSerializer(responsables_fa, many=True)
    return Response(serializer.data)


#Dépenses
@api_view(['POST'])
def ajout_depense(request):
    if request.method == 'POST':
        # Récupérer l'année active
        annee_active = Annee_pastorale.objects.filter(statut='actif').first()
        if not annee_active:
            return Response({"error": "Aucune année active trouvée."}, status=status.HTTP_404_NOT_FOUND)

        # Ajouter l'année active aux données de la requête
        data = request.data
        data['annee'] = annee_active.annee  # Assurez-vous que 'annee' est le bon champ

        # Sérialisation des données
        serializer = DepenseSerializer(data=data)
        if serializer.is_valid():
            # Sauvegarder la dépense dans la base de données
            serializer.save()
            # Mettre à jour le solde après l'ajout de la dépense
            solde_courant()  # Appel de la fonction sans passer la requête
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def point_depense(request):
    annee_active = Annee_pastorale.objects.filter(statut='actif').first()
    depenses = Depense.objects.filter(annee=annee_active.annee)
    
    # Calcul du total
    total_depenses = sum(float(depense.montant) for depense in depenses if depense.montant)
    
    serializer = DepenseSerializer(depenses, many=True)
    return Response({
        'depenses': serializer.data,
        'total_depenses': total_depenses
    })


#Bénéfice
@api_view(['POST'])
def ajout_benefice(request):
    if request.method == 'POST':
        # Récupérer l'année active
        annee_active = Annee_pastorale.objects.filter(statut='actif').first()  # Ajustez cette requête selon votre logique
        if not annee_active:
            return Response({"error": "Aucune année active trouvée."}, status=status.HTTP_404_NOT_FOUND)

        # Ajouter l'année active aux données de la requête
        data = request.data
        data['annee'] = annee_active.annee  # Assurez-vous que 'annee' est le bon champ

        # Sérialisation des données
        serializer = BeneficeSerializer(data=data)
        if serializer.is_valid():
            # Sauvegarder la pénalité dans la base de données
            serializer.save()
            # Après l'ajout, on met à jour le solde courant
            solde_courant()  # Appel de la vue solde_courant pour mettre à jour les montants
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def point_benefice(request):
    annee_active = Annee_pastorale.objects.filter(statut='actif').first()
    benefices = Benefice.objects.filter(annee=annee_active.annee)
    
    # Calcul du total
    total_benefices = sum(float(benefice.montant) for benefice in benefices if benefice.montant)
    
    serializer = BeneficeSerializer(benefices, many=True)
    return Response({
        'benefices': serializer.data,
        'total_benefices': total_benefices
    })


#Pénalité
@api_view(['POST'])
def ajout_penalite(request):
    if request.method == 'POST':
        # Récupérer l'année active
        annee_active = Annee_pastorale.objects.filter(statut='actif').first()
        if not annee_active:
            return Response({"error": "Aucune année active trouvée."}, status=status.HTTP_404_NOT_FOUND)

        # Ajouter l'année active aux données de la requête
        data = request.data
        data['annee'] = annee_active.annee  # Assurez-vous que 'annee' est le bon champ

        # Sérialisation des données
        serializer = PenaliteSerializer(data=data)
        if serializer.is_valid():
            # Sauvegarder la pénalité dans la base de données
            serializer.save()
            # Après l'ajout, on met à jour le solde courant
            solde_courant()  # Appel de la vue solde_courant pour mettre à jour les montants
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def point_penalite(request):
    annee_active = Annee_pastorale.objects.filter(statut='actif').first()
    penalites = Penalite.objects.filter(annee=annee_active.annee)
    
    # Calcul du total
    total_penalites = sum(float(penalite.montant) for penalite in penalites if penalite.montant)
    
    serializer = PenaliteSerializer(penalites, many=True)
    return Response({
        'penalites': serializer.data,
        'total_penalites': total_penalites
    })



#Etat de la ca
@api_view(['POST'])
def ajout_ancien_solde(request):
    if request.method == 'POST':
        # Récupérer l'année active
        annee_active = Annee_pastorale.objects.filter(statut='actif').first()  # Ajustez cette requête selon votre logique
        if not annee_active:
            return Response({"error": "Aucune année active trouvée."}, status=status.HTTP_404_NOT_FOUND)

        # Ajouter l'année active aux données de la requête
        data = request.data
        data['annee'] = annee_active.annee  # Assurez-vous que 'annee' est le bon champ

        # Sérialisation des données
        serializer = Ancien_SoldeSerializer(data=data)
        if serializer.is_valid():
            # Sauvegarder la pénalité dans la base de données
            serializer.save()
            # Après l'ajout, on met à jour le solde courant
            solde_courant()  # Appel de la vue solde_courant pour mettre à jour les montants
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@csrf_exempt  # Désactive CSRF pour les tests (à enlever en prod)
def solde_courant(request=None):
    # Récupérer l'année active
    annee_active = Annee_pastorale.objects.filter(statut='actif').first()
    if not annee_active:
        return JsonResponse({"error": "Aucune année active trouvée."}, status=404)

    # Récupération de l'ancien solde
    ancien_solde_obj = Ancien_Solde.objects.last()
    ancien_solde = int(ancien_solde_obj.solde) if ancien_solde_obj else 0
    total_depenses = int(Depense.objects.aggregate(total=Sum('montant'))['total'] or 0)
    total_cotisations = int(Cotisation_Enfant.objects.aggregate(total=Sum('montant'))['total'] or 0)
    total_benefices = int(Benefice.objects.aggregate(total=Sum('montant'))['total'] or 0)
    total_penalites = int(Penalite.objects.aggregate(total=Sum('montant'))['total'] or 0)
    

    # Calcul du nouveau solde
    nouveau_solde = ancien_solde + total_cotisations - total_depenses + total_benefices + total_penalites

    # Enregistrement ou mise à jour
    MontantCalcule.objects.update_or_create(
        id=1,
        defaults={
            'ancien_solde': ancien_solde,
            'total_cotisations': total_cotisations,
            'total_benefices': total_benefices,
            'total_penalites': total_penalites,
            'total_depenses': total_depenses,
            'nouveau_solde': nouveau_solde,
            'annee': annee_active.annee,
        }
    )
    
    montant_calculé = MontantCalcule.objects.get(id=1)
    serializer = MontantCalculeSerializer(montant_calculé)
    return JsonResponse(serializer.data, safe=False)


@api_view(['GET'])
def get_montant_calculer(request):
    annee_active = Annee_pastorale.objects.filter(statut='actif').first()
    montant = MontantCalcule.objects.filter(annee=annee_active.annee)
    serializer = MontantCalculeSerializer(montant, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def ajout_objectif_tresorerie(request):
    if request.method == 'POST':
        # Récupérer l'année active
        annee_active = Annee_pastorale.objects.filter(statut='actif').first()  # Ajustez cette requête selon votre logique
        if not annee_active:
            return Response({"error": "Aucune année active trouvée."}, status=status.HTTP_404_NOT_FOUND)

        # Ajouter l'année active aux données de la requête
        data = request.data
        data['annee'] = annee_active.annee  # Assurez-vous que 'annee' est le bon champ

        serializer = Objectif_TGSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_objectifs_tresorerie(request):
    annee_active = Annee_pastorale.objects.filter(statut='actif').first()
    objectif = Objectif_TG.objects.filter(annee=annee_active.annee)
    serializer = Objectif_TGSerializer(objectif, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def ajout_objectif_secretariat(request):
    if request.method == 'POST':
        # Récupérer l'année active
        annee_active = Annee_pastorale.objects.filter(statut='actif').first()  # Ajustez cette requête selon votre logique
        if not annee_active:
            return Response({"error": "Aucune année active trouvée."}, status=status.HTTP_404_NOT_FOUND)

        # Ajouter l'année active aux données de la requête
        data = request.data
        data['annee'] = annee_active.annee  # Assurez-vous que 'annee' est le bon champ

        serializer = Objectif_SGSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_objectifs_secretariat(request):
    annee_active = Annee_pastorale.objects.filter(statut='actif').first()
    objectif = Objectif_SG.objects.filter(annee=annee_active.annee)
    serializer = Objectif_SGSerializer(objectif, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def ajout_objectif_organisation(request):
    if request.method == 'POST':
        # Récupérer l'année active
        annee_active = Annee_pastorale.objects.filter(statut='actif').first()  # Ajustez cette requête selon votre logique
        if not annee_active:
            return Response({"error": "Aucune année active trouvée."}, status=status.HTTP_404_NOT_FOUND)

        # Ajouter l'année active aux données de la requête
        data = request.data
        data['annee'] = annee_active.annee  # Assurez-vous que 'annee' est le bon champ

        serializer = Objectif_OGSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_objectifs_organisation(request):
    annee_active = Annee_pastorale.objects.filter(statut='actif').first()
    objectif = Objectif_OG.objects.filter(annee=annee_active.annee)
    serializer = Objectif_OGSerializer(objectif, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def ajout_objectif_formation(request):
    if request.method == 'POST':
        # Récupérer l'année active
        annee_active = Annee_pastorale.objects.filter(statut='actif').first()  # Ajustez cette requête selon votre logique
        if not annee_active:
            return Response({"error": "Aucune année active trouvée."}, status=status.HTTP_404_NOT_FOUND)

        # Ajouter l'année active aux données de la requête
        data = request.data
        data['annee'] = annee_active.annee  # Assurez-vous que 'annee' est le bon champ

        serializer = Objectif_FOSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_objectifs_formation(request):
    annee_active = Annee_pastorale.objects.filter(statut='actif').first()
    objectif = Objectif_FO.objects.filter(annee=annee_active.annee)
    serializer = Objectif_FOSerializer(objectif, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def ajout_activite(request):
    if request.method == 'POST':
        # Récupérer l'année active
        annee_active = Annee_pastorale.objects.filter(statut='actif').first()  # Ajustez cette requête selon votre logique
        if not annee_active:
            return Response({"error": "Aucune année active trouvée."}, status=status.HTTP_404_NOT_FOUND)

        # Ajouter l'année active aux données de la requête
        data = request.data
        data['annee'] = annee_active.annee  # Assurez-vous que 'annee' est le bon champ

        serializer = ActiviteSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_activite(request):
    annee_active = Annee_pastorale.objects.filter(statut='actif').first()
    intitule = Activite.objects.filter(annee=annee_active.annee)
    serializer = ActiviteSerializer(intitule, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def ajout_bilan_activite(request):
    if request.method == 'POST':
        # Récupérer l'année active
        annee_active = Annee_pastorale.objects.filter(statut='actif').first()  # Ajustez cette requête selon votre logique
        if not annee_active:
            return Response({"error": "Aucune année active trouvée."}, status=status.HTTP_404_NOT_FOUND)

        # Ajouter l'année active aux données de la requête
        data = request.data
        data['annee'] = annee_active.annee  # Assurez-vous que 'annee' est le bon champ

        serializer = Bilan_ActiviteSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



#Activités
@api_view(['GET'])
def get_bilan_activite(request):
    annee_active = Annee_pastorale.objects.filter(statut='actif').first()
    contenu = Bilan_Activite.objects.filter(annee=annee_active.annee)
    serializer = Bilan_ActiviteSerializer(contenu, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def ajout_point_activite(request):
    if request.method == 'POST':
        # Récupérer l'année active
        annee_active = Annee_pastorale.objects.filter(statut='actif').first()  # Ajustez cette requête selon votre logique
        if not annee_active:
            return Response({"error": "Aucune année active trouvée."}, status=status.HTTP_404_NOT_FOUND)

        # Ajouter l'année active aux données de la requête
        data = request.data
        data['annee'] = annee_active.annee  # Assurez-vous que 'annee' est le bon champ

        serializer = Point_ActiviteSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_point_activite(request):
    annee_active = Annee_pastorale.objects.filter(statut='actif').first()
    contenu = Point_Activite.objects.filter(annee=annee_active.annee)
    serializer = Point_ActiviteSerializer(contenu, many=True)
    return Response(serializer.data)



#Participants Activité
@api_view(['POST'])
def ajout_participant(request):
    if request.method == 'POST':
        # Récupérer l'année active
        annee_active = Annee_pastorale.objects.filter(statut='actif').first()  # Ajustez cette requête selon votre logique
        if not annee_active:
            return Response({"error": "Aucune année active trouvée."}, status=status.HTTP_404_NOT_FOUND)

        # Ajouter l'année active aux données de la requête
        data = request.data
        data['annee'] = annee_active.annee  # Assurez-vous que 'annee' est le bon champ

        serializer = Participant_ActiviteSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_participant(request):
    annee_active = Annee_pastorale.objects.filter(statut='actif').first()
    participant = Participant_Activite.objects.filter(annee=annee_active.annee).order_by('nom')
    serializer = Participant_ActiviteSerializer(participant, many=True)
    return Response(serializer.data)

@require_GET
def search_activity(request):
    activity = request.GET.get('activity')
    if activity:
        # Filtrer les résultats en fonction de l'activité
        results = Participant_Activite.objects.filter(activite=activity).order_by('nom')

        data = [{"id": item.id, "nom": item.nom, "prenom": item.prenom, "niveau": item.niveau} for item in results]
        return JsonResponse(data, safe=False)
    else:
        return JsonResponse({"error": "Aucune activité spécifiée"}, status=400)



#Enfant
@api_view(['POST'])
def ajout_enfant(request):
    if request.method == 'POST':
        # Récupérer l'année active
        annee_active = Annee_pastorale.objects.filter(statut='actif').first()  # Ajustez cette requête selon votre logique
        if not annee_active:
            return Response({"error": "Aucune année active trouvée."}, status=status.HTTP_404_NOT_FOUND)

        # Ajouter l'année active aux données de la requête
        data = request.data
        data['annee'] = annee_active.annee  # Assurez-vous que 'annee' est le bon champ

        serializer = EnfantSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def get_enfant(request):
    annee_active = Annee_pastorale.objects.filter(statut='actif').first()
    contenu = Enfant.objects.filter(annee=annee_active.annee).order_by('niveau', 'nom')
    serializer = EnfantSerializer(contenu, many=True)
    
    return Response(serializer.data)


@require_GET
def search_niveau(request):
    niveau = request.GET.get('niveau')
    if niveau:
        # Filtrer les résultats en fonction de l'activité
        results = Enfant.objects.filter(niveau=niveau)

        data = [{"id": item.id, "nom": item.nom, "prenom": item.prenom, "niveau": item.niveau} for item in results]
        return JsonResponse(data, safe=False)
    else:
        return JsonResponse({"error": "Aucune activité spécifiée"}, status=400)
    


#Notes
@csrf_exempt
def ajout_note(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            enfant_id = data.get('enfant_id')
            option = data.get('option')
            note = data.get('note')

            enfant = Enfant.objects.get(id=enfant_id)
            Note.objects.create(enfant=enfant, option=option, note=note)

            return JsonResponse({'message': 'Note ajoutée avec succès'}, status=201)
        except Enfant.DoesNotExist:
            return JsonResponse({'error': "Élève non trouvé"}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Méthode non autorisée'}, status=405)

@csrf_exempt
def voir_notes(request):
    if request.method == 'GET':
        niveau = request.GET.get('niveau')
        try:
            # Récupération des enfants du niveau sélectionné avec leurs notes associées
            enfants = Enfant.objects.filter(niveau=niveau).prefetch_related(
                Prefetch('note_set', queryset=Note.objects.all(), to_attr='notes')
            )
            
            # Préparation des données sérialisées
            data = []
            for enfant in enfants:
                enfant_data = EnfantSerializer(enfant).data
                
                # Calcul de la moyenne d'interrogation (meilleures notes)
                interro_notes = [note.note for note in enfant.notes if note.option in [
                    'Interro 1', 'Interro 2', 'Interro 3', 'Interro 4', 'Interro 5']]
                
                if len(interro_notes) >= 2:
                    top_two_interro = sorted(interro_notes, reverse=True)[:2]
                    moyenne_interro = sum(top_two_interro) / 2
                else:
                    moyenne_interro = sum(interro_notes) / len(interro_notes) if interro_notes else 0

                # Récupération des notes Test 1 et Test 2
                test_notes = {note.option: note.note for note in enfant.notes if note.option in ['Test 1', 'Test 2']}
                
                test1 = test_notes.get('Test 1', 0)
                test2 = test_notes.get('Test 2', 0)
                
                # Calcul de la moyenne générale
                moyenne_generale = (moyenne_interro + test1 + test2) / 3

                # Ajout des moyennes au résultat
                enfant_data['moyenne_interro'] = moyenne_interro
                enfant_data['moyenne_generale'] = moyenne_generale
                enfant_data['notes'] = NoteSerializer(enfant.notes, many=True).data
                
                data.append(enfant_data)
            
            return JsonResponse(data, safe=False)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)