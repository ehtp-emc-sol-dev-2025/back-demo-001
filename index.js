const express = require('express');
const app = express();

app.get('/sylabus', (req, res) => {
  const syllabus = [
    {
      id: 1,
      title: "Aperçu global sur les démarches et tendances de développement de solutions et services informatiques",
      description: "Introduction aux tendances actuelles et démarches agiles dans le développement de solutions cloud."
    },
    {
      id: 2,
      title: "Développement d’applications & Cloud : options, avantages et process",
      description: "Exploration des options, avantages et processus pour développer des applications dans le cloud."
    },
    {
      id: 3,
      title: "Développement et déploiement d’applications web sur le Cloud",
      description: "Techniques pour développer et déployer des applications web sur Azure."
    },
    {
      id: 4,
      title: "Déploiement et Gestion des Conteneurs",
      description: "Utilisation de conteneurs avec Docker et orchestration via Azure Kubernetes Service (AKS)."
    },
    {
      id: 5,
      title: "Développement d'API",
      description: "Conception, gestion et sécurisation d'APIs RESTful avec Azure API Management."
    },
    {
      id: 6,
      title: "Fonctions & logiques métiers sous Cloud",
      description: "Création de fonctions serverless et logiques métiers avec Azure Functions et Logic Apps."
    },
    {
      id: 7,
      title: "Gestion et automatisation des workflows",
      description: "Automatisation des flux de travail avec Azure Logic Apps et Event Grid."
    },
    {
      id: 8,
      title: "Optimisation avec le Cache Redis",
      description: "Utilisation d'Azure Cache for Redis pour optimiser les performances des applications."
    },
    {
      id: 9,
      title: "Surveillance, monitoring et suivi des performances des applications Cloud",
      description: "Mise en place de la surveillance avec Azure Monitor et Application Insights."
    },
    {
      id: 10,
      title: "Préparation du certificat : Microsoft Azure Developer Associate (AZ-204)",
      description: "Préparation à l'examen AZ-204 avec révision et projets pratiques."
    }
  ];
  res.json(syllabus);
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server running');
});
