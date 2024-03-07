# Projet Template

Ce projet est un template pour une application web full-stack utilisant Next.js pour le front-end et Node.js avec un serveur GraphQL pour le back-end. L'application est dockerisée et utilise Prisma comme ORM avec TypeGraphQL pour générer le schéma GraphQL.

## Structure du Projet

Le projet est organisé en deux dossiers principaux :

- `./front-end`: Contient le code source du front-end développé avec Next.js.
- `./back-end`: Contient le code source du back-end développé avec Node.js et GraphQL.

## Technologies Utilisées

- **Front-end**: Next.js
- **Back-end**: Node.js, GraphQL
- **ORM**: Prisma
- **Schéma GraphQL**: TypeGraphQL
- **Tests**: Jest (back-end), Playwright (tests d'intégration front-end)
- **Docker**: Docker Compose pour l'orchestration des containers

## Installation et Démarrage en Mode Développement

1. Assurez-vous d'avoir Docker installé sur votre machine.

2. Dans les répertoires `back-end` et `front-end`, exécutez la commande suivante pour installer les dépendances :

```bash
cd back-end && npm i && cd ..
cd front-end && npm i && cd ..
```

3. Pour démarrer l'application en mode développement, exécutez la commande suivante à la racine du projet :

```bash
docker-compose -f docker-compose.dev.yml up --build
```

Cela lancera tous les containers nécessaires pour l'application.

## Prisma
![prisma-2](https://github.com/ClementPremartin/template/assets/99645627/fa534aa2-5dd5-43a2-8703-efa0d0d1ed6d)

Prisma est un ORM (Object-Relational Mapping) moderne pour Node.js et TypeScript. Il simplifie l'interaction avec la base de données en vous permettant de définir votre schéma de base de données à l'aide d'une syntaxe conviviale et en générant du code TypeScript pour accéder à la base de données.

### Migrations

Prisma facilite la gestion des migrations de base de données avec sa fonctionnalité de migration intégrée. Pour effectuer des migrations dans ce projet, suivez ces étapes :

Pour appliquer les migrations, utilisez la commande suivante :

```bash
npx prisma migrate dev
```

Après avoir appliqué les migrations, vous devez générer le code TypeScript correspondant aux modèles de base de données mis à jour. Utilisez la commande suivante pour générer le code :

```bash
npx prisma generate
```

### Prisma Studio

Prisma Studio est un outil de visualisation de base de données qui vous permet d'explorer votre schéma de base de données, de consulter et de modifier les données, et d'exécuter des requêtes SQL directement depuis une interface graphique conviviale.

Pour lancer Prisma Studio, utilisez la commande suivante :

```bash
npx prisma studio
```

Cela ouvrira une interface utilisateur à l'addrresse http://localhost:5555 dans votre navigateur par défaut.

## Tests

### Tests Back-end

Pour exécuter les tests unitaires du back-end en local, suivez ces étapes :

1. Accédez au container Docker du back-end en utilisant la commande suivante :

```bash

docker exec -it template-backend-1 ash

```

2. Une fois dans le container, exécutez la commande suivante pour lancer les tests :

```bash

npm run test

```

### Tests Front-end

Les tests d'intégration du front-end sont écrits avec Playwright. Pour les exécuter, vous pouvez utiliser la commande suivante à partir du répertoire `front-end` :

```bash

npx playwright test --ui

```

## GitHub Actions

Le projet utilise GitHub Actions pour l'intégration continue. Les workflows sont configurés pour automatiser les tests et le déploiement lorsque des changements sont détectés dans la branche principale.

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou à soumettre une pull request.

## Licence

Ce projet est distribué sous la licence [MIT](LICENSE).
