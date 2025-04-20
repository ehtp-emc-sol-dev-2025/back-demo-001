const express = require('express');
const app = express();

// Données des joueurs
const joueurs = [
    { nom: "Yassine Bounou", poste: "Gardien de but" },
    { nom: "Achraf Hakimi", poste: "Défenseur droit" },
    { nom: "Romain Saïss", poste: "Défenseur central" },
    { nom: "Sofyan Amrabat", poste: "Milieu défensif" },
    { nom: "Hakim Ziyech", poste: "Milieu offensif" }
];

const titulaires = [
    { nom: "Yassine Bounou", poste: "Gardien de but" },
    { nom: "Achraf Hakimi", poste: "Défenseur droit" },
    { nom: "Nayef Aguerd", poste: "Défenseur central" },
    { nom: "Sofyan Amrabat", poste: "Milieu défensif" },
    { nom: "Azzedine Ounahi", poste: "Milieu central" }
];

const remplacants = [
    { nom: "Munir Mohamedi", poste: "Gardien de but" },
    { nom: "Jawad El Yamiq", poste: "Défenseur central" },
    { nom: "Yahya Jabrane", poste: "Milieu défensif" },
    { nom: "Abdelhamid Sabiri", poste: "Milieu offensif" },
    { nom: "Abderrazak Hamdallah", poste: "Attaquant" }
];

// Endpoints
app.get('/joueurs', (req, res) => {
    res.json(joueurs);
});

app.get('/titulaires', (req, res) => {
    res.json(titulaires);
});

app.get('/remplacants', (req, res) => {
    res.json(remplacants);
});

module.exports = app;
