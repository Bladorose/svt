# Atelier SVT – Placement des organes

Cette application web permet à un élève de renseigner son prénom, son nom et sa classe puis de placer différents organes (trachée, poumons, cœur, estomac, foie et intestin) sur un schéma simplifié du corps humain à l'aide du glisser-déposer.

## Aperçu

- Formulaire élève avec champs obligatoires.
- Liste d'organes à faire glisser.
- Silhouette interactive avec zones de dépôt vérifiant automatiquement la bonne position de chaque organe.
- Message de réussite lorsque tous les organes sont correctement placés et bouton de réinitialisation pour recommencer.

## Lancer le projet en local

1. **Cloner le dépôt** (si ce n'est pas déjà fait) :
   ```bash
   git clone <URL_DU_DEPOT>
   cd svt
   ```

2. **Démarrer un petit serveur web** (recommandé pour un fonctionnement optimal du glisser-déposer) :
   ```bash
   python -m http.server 8000
   ```

3. **Ouvrir l'application** dans votre navigateur préféré à l'adresse :
   ```
   http://localhost:8000/index.html
   ```

> 💡 Astuce : si vous utilisez VS Code, l'extension *Live Server* permet également de lancer l'application en un clic.

## Tester l'application en ligne

Si vous souhaitez partager une démonstration en ligne sans installer quoi que ce soit, vous pouvez utiliser l'une des options suivantes :

- **GitHub Pages**
  1. Pousser ce dépôt sur GitHub.
  2. Dans les paramètres du dépôt, section **Pages**, choisir la branche souhaitée (souvent `main`) et le dossier racine (`/`).
  3. Quelques minutes plus tard, votre application sera accessible via l'URL fournie par GitHub Pages.

- **CodeSandbox / StackBlitz**
  1. Importer le dépôt directement dans [CodeSandbox](https://codesandbox.io/) ou [StackBlitz](https://stackblitz.com/).
  2. Choisir un modèle « Vanilla » (HTML/CSS/JS). Les fichiers `index.html`, `styles.css` et `app.js` seront automatiquement reconnus et servis.
  3. L'éditeur fournit une URL publique à partager avec vos élèves.

- **Netlify Drop**
  1. Se rendre sur [https://app.netlify.com/drop](https://app.netlify.com/drop).
  2. Glisser le dossier du projet zippé. Netlify génère immédiatement une URL temporaire pour tester l'application.

## Structure des fichiers

```
svt/
├── index.html    # Page principale avec le formulaire, la réserve d'organes et le schéma
├── styles.css    # Styles responsives et apparence du corps humain
├── app.js        # Logique de glisser-déposer et messages d'état
└── README.md     # Ce guide
```

## Personnalisation

- Les noms des organes et des zones sont définis dans `index.html` et dans la constante `organLabels` de `app.js`.
- Les couleurs et typographies peuvent être modifiées dans la section `:root` de `styles.css`.
- Pour ajouter un nouvel organe, il suffit de créer une nouvelle carte dans la réserve, une zone correspondante sur la silhouette et d'ajouter l'étiquette dans `organLabels`.

Bon atelier ! 👩‍🏫👨‍🏫
