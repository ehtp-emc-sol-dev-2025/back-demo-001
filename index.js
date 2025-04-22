const express = require('express');
const app = express();
const port = 3000;

app.get('/<compétence>', (req, res) => {
    const competences = [
        { nom: 'HTML', description: 'Langage de balisage pour structurer les pages web.' },
        { nom: 'CSS', description: 'Langage de style pour la présentation des documents HTML.' },
        { nom: 'JavaScript', description: 'Langage de programmation pour les interactions web.' },
        { nom: 'Node.js', description: 'Environnement d’exécution JavaScript côté serveur.' },
        { nom: 'React', description: 'Bibliothèque JavaScript pour construire des interfaces utilisateur.' }
    ];
    res.json(competences);
});

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
