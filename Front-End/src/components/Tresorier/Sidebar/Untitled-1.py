class Graph:
    def __init__(self, vertices):
        self.vertices = vertices  # Nombre de sommets
        self.edges = []  # Liste des arêtes

    def add_edge(self, src, dest, weight):
        self.edges.append((src, dest, weight))

    def bellman_ford(self, start):
        # Initialisation
        dist = {vertex: float('inf') for vertex in range(self.vertices)}
        dist[start] = 0

        # Stocker les chemins
        paths = {vertex: [] for vertex in range(self.vertices)}
        paths[start] = [start]

        # Relaxation des arêtes
        for _ in range(self.vertices - 1):
            for src, dest, weight in self.edges:
                if dist[src] + weight < dist[dest]:
                    dist[dest] = dist[src] + weight
                    paths[dest] = paths[src] + [dest]

        # Détection de cycle négatif
        for src, dest, weight in self.edges:
            if dist[src] + weight < dist[dest]:
                raise ValueError("Graph contains a negative-weight cycle")

        return dist, paths

# Exemple concret
lieux = {
    0: "Ecole",
    1: "Garderie",
    2: "Mosquée",
    3: "Église",
    4: "Université",
    5: "Aéroport",
    6: "Morgue",
}

# Création du graphe
graph = Graph(len(lieux))

# Ajouter des arêtes (src, dest, poids)
graph.add_edge(0, 1, 2)  # Ecole -> Garderie
graph.add_edge(0, 2, 4)  # Ecole -> Mosquée
graph.add_edge(1, 3, 7)  # Garderie -> Église
graph.add_edge(1, 4, 3)  # Garderie -> Université
graph.add_edge(2, 4, 1)  # Mosquée -> Université
graph.add_edge(3, 5, 2)  # Église -> Aéroport
graph.add_edge(4, 6, 5)  # Université -> Morgue
graph.add_edge(5, 6, 1)  # Aéroport -> Morgue

graph.add_edge(2, 3, 2)  # Mosquée -> Église (chemin additionnel)

depart = 0  # Ecole

# Calcul des distances et chemins
try:
    distances, paths = graph.bellman_ford(depart)

    # Chemin le plus court vers la Morgue
    destination = 6  # Morgue
    if paths[destination]:
        print(f"Chemin le plus court de {lieux[depart]} à {lieux[destination]} : {' -> '.join(lieux[p] for p in paths[destination])} (Distance: {distances[destination]})")
    else:
        print(f"Aucun chemin disponible de {lieux[depart]} à {lieux[destination]}")

except ValueError as e:
    print(e)
