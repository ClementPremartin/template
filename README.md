![prisma-2](https://github.com/ClementPremartin/template/assets/99645627/fa534aa2-5dd5-43a2-8703-efa0d0d1ed6d)# Projet Template

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
![Up<svg fill="none" height="982" viewBox="1.372 -.18543865 324.553 128.18543865" width="2500" xmlns="http://www.w3.org/2000/svg"><g fill="#0c344b"><path d="m199.202 85.75h8.638v-31.662h-8.638zm-.367-39.847c0-2.813 1.567-4.219 4.701-4.219 3.133 0 4.701 1.406 4.701 4.219 0 1.341-.392 2.384-1.175 3.13-.784.746-1.959 1.118-3.526 1.118-3.134 0-4.701-1.416-4.701-4.248z"/><path clip-rule="evenodd" d="m164.253 67.483c2.786-2.36 4.178-5.767 4.178-10.223 0-4.286-1.307-7.51-3.922-9.672-2.615-2.16-6.433-3.242-11.456-3.242h-13.225v41.404h8.779v-14.727h3.767c5.135 0 9.095-1.179 11.879-3.54zm-12.757-3.653h-2.889v-12.29h3.993c2.398 0 4.158.49 5.282 1.472 1.123.982 1.685 2.502 1.685 4.56 0 2.038-.67 3.591-2.011 4.658s-3.36 1.6-6.06 1.6z" fill-rule="evenodd"/><path d="m194.62 53.748c-.774-.17-1.746-.255-2.917-.255-1.964 0-3.781.543-5.451 1.628a11.908 11.908 0 0 0 -3.98 4.291h-.424l-1.275-5.324h-6.542v31.662h8.638v-16.114c0-2.549.769-4.532 2.307-5.948 1.54-1.416 3.687-2.124 6.444-2.124 1.001 0 1.85.095 2.549.283zm40.245 30.02c2.257-1.7 3.385-4.172 3.385-7.42 0-1.567-.273-2.917-.821-4.05-.547-1.133-1.398-2.133-2.549-3.002-1.151-.868-2.964-1.802-5.438-2.803-2.775-1.114-4.573-1.955-5.394-2.521s-1.233-1.236-1.233-2.011c0-1.378 1.275-2.067 3.824-2.067 1.434 0 2.841.217 4.219.65 1.378.436 2.861.992 4.447 1.672l2.605-6.23c-3.606-1.661-7.316-2.492-11.13-2.492-4.003 0-7.093.769-9.273 2.308-2.183 1.539-3.273 3.714-3.273 6.527 0 1.643.26 3.026.78 4.149.518 1.124 1.349 2.12 2.493 2.988 1.14.869 2.931 1.813 5.365 2.832 1.699.718 3.059 1.345 4.079 1.883 1.019.539 1.737 1.02 2.153 1.445.415.425.622.977.622 1.657 0 1.812-1.567 2.718-4.702 2.718-1.529 0-3.299-.255-5.309-.764-2.012-.51-3.819-1.142-5.424-1.898v7.137a22.275 22.275 0 0 0 4.56 1.373c1.624.312 3.587.468 5.891.468 4.492 0 7.867-.85 10.123-2.55zm37.604 1.982h-8.638v-18.493c0-2.284-.383-3.998-1.146-5.14-.766-1.142-1.969-1.714-3.612-1.714-2.208 0-3.813.812-4.814 2.436s-1.501 4.295-1.501 8.015v14.896h-8.638v-31.662h6.599l1.161 4.05h.482c.849-1.454 2.077-2.592 3.681-3.413 1.605-.821 3.446-1.232 5.523-1.232 4.739 0 7.948 1.549 9.629 4.645h.764c.85-1.473 2.101-2.615 3.753-3.427s3.516-1.218 5.593-1.218c3.587 0 6.302.921 8.142 2.761 1.841 1.841 2.761 4.791 2.761 8.85v20.646h-8.666v-18.493c0-2.284-.383-3.998-1.146-5.14-.766-1.142-1.969-1.714-3.612-1.714-2.114 0-3.695.756-4.744 2.266-1.047 1.511-1.571 3.908-1.571 7.193z"/><path clip-rule="evenodd" d="m318.222 81.445 1.671 4.305h6.032v-21.099c0-3.776-1.133-6.589-3.398-8.439-2.266-1.85-5.523-2.776-9.771-2.776-4.436 0-8.477.954-12.121 2.861l2.86 5.834c3.417-1.53 6.391-2.294 8.921-2.294 3.285 0 4.928 1.605 4.928 4.814v1.388l-5.494.17c-4.739.17-8.283 1.053-10.635 2.648-2.35 1.596-3.525 4.074-3.525 7.434 0 3.21.873 5.683 2.619 7.42 1.747 1.737 4.139 2.605 7.18 2.605 2.473 0 4.479-.354 6.017-1.062 1.539-.708 3.035-1.977 4.489-3.809zm-4.22-10.252 3.342-.113v2.605c0 1.908-.6 3.437-1.799 4.588-1.198 1.152-2.799 1.728-4.8 1.728-2.794 0-4.191-1.218-4.191-3.653 0-1.7.613-2.964 1.841-3.795 1.227-.83 3.096-1.284 5.607-1.36zm-218.269 30.336-57.479 17c-1.756.52-3.439-.999-3.07-2.77l20.534-98.34c.384-1.838 2.926-2.13 3.728-.427l38.02 80.736c.717 1.523-.101 3.319-1.733 3.801zm9.857-4.01-44.022-93.482v-.002a7.062 7.062 0 0 0 -6.019-4.022c-2.679-.156-5.079 1.136-6.433 3.335l-47.744 77.33a7.233 7.233 0 0 0 .084 7.763l23.338 36.152c1.391 2.158 3.801 3.407 6.306 3.407.71 0 1.424-.1 2.126-.308l67.744-20.036a7.424 7.424 0 0 0 4.66-4.028 7.264 7.264 0 0 0 -.04-6.11z" fill-rule="evenodd"/></g></svg>loading prisma-2.svg…]()


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
