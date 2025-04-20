const express = require('express');
const app = express();

// Données des consultants en cybersécurité
const consultants = [
    {
        nom: "Jean Dupont",
        description: "Expert en sécurité des réseaux avec 10 ans d'expérience"
    },
    {
        nom: "Marie Lambert",
        description: "Spécialiste en tests d'intrusion et audits de sécurité"
    },
    {
        nom: "Thomas Martin",
        description: "Consultant en conformité RGPD et protection des données"
    },
    {
        nom: "Sophie Bernard",
        description: "Experte en cryptographie et sécurité des applications"
    },
    {
        nom: "Alexandre Petit",
        description: "Architecte sécurité cloud et infrastructure"
    }
];

// Endpoint GET /consultants
app.get('/consultants', (req, res) => {
    res.json(consultants);
});

module.exports = app;
