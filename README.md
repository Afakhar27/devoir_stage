# Dashboard Stage - Take-Home Assignment

Application de tableau de bord avec authentification et gestion de limite de vue de contacts.

## Fonctionnalités

- **Authentification** : Sécurisée via Clerk.
- **Agences** : Visualisation de la liste des agences.
- **Contacts** : Visualisation de la liste des contacts avec une limite quotidienne de 50 vues.
- **Upgrade** : Message d'invitation à la mise à niveau lorsque la limite est atteinte.

## Installation

1.  Cloner le dépôt.
2.  Installer les dépendances :
    ```bash
    npm install
    ```
3.  Configurer les variables d'environnement dans `.env.local` :
    ```env
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=votre_clé_publique
    CLERK_SECRET_KEY=votre_clé_secrète
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
    ```
4.  Lancer le serveur de développement :
    ```bash
    npm run dev
    ```

## Architecture et Design

### Diagramme de Flux (System Design)

```mermaid
graph TD
    A[Utilisateur] -->|Accès| B(Page d'Accueil /)
    B -->|Non Authentifié| C[Page de Connexion /sign-in]
    B -->|Authentifié| D[Tableau de Bord /tableau-de-bord]
    C -->|Succès| D
    D -->|Naviguer| E[Agences /agences]
    D -->|Naviguer| F[Contacts /contacts]
    E --> G[Afficher Liste Agences]
    F --> H{Vérifier Limite Quotidienne}
    H -->|Limite < 50| I[Afficher Contacts]
    I --> J[Incrémenter Compteur]
    H -->|Limite >= 50| K[Afficher Message Upgrade]
    J -->|Si reste < Total| K
```

### Structure du Projet

- `src/app` : Pages et routes (App Router).
- `src/components` : Composants réutilisables (Navbar).
- `src/lib` : Logique métier (données, gestion des limites).
- `src/data` : Données mockées (JSON).

## Technologies

- Next.js 16 (App Router)
- Clerk (Auth)
- Tailwind CSS
- TypeScript
