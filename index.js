module.exports = async function (context, req) {
    context.res = {
        headers: {
            "Content-Type": "application/json"
        },
        body: {
            faqs: [
                {
                    question: "Quels sont les objectifs principaux du module Cloud Dev ?",
                    reponse: "Ce module vise à maîtriser les concepts fondamentaux du cloud computing, les architectures cloud natives et le déploiement d'applications sur Azure."
                },
                {
                    question: "Quelles technologies cloud seront abordées ?",
                    reponse: "Le cours couvre Azure Fundamentals, les services PaaS, les conteneurs Docker, Kubernetes et le serverless computing."
                },
                {
                    question: "Faut-il des prérequis techniques pour ce module ?",
                    reponse: "Oui, une connaissance de base en développement logiciel et des concepts réseaux est recommandée."
                },
                {
                    question: "Comment sont organisées les séances pratiques ?",
                    reponse: "Les TP se déroulent sur la plateforme Azure avec des cas concrets de déploiement d'applications cloud."
                },
                {
                    question: "Y aura-t-il une certification à la fin du module ?",
                    reponse: "Oui, une préparation à la certification AZ-204 (Developing Solutions for Microsoft Azure) est incluse."
                },
                {
                    question: "Quelle est la durée du module ?",
                    reponse: "Le module s'étale sur 6 semaines avec 30 heures de cours théoriques et 20 heures de travaux pratiques."
                },
                {
                    question: "Comment accéder aux ressources pédagogiques ?",
                    reponse: "Tous les supports sont disponibles sur la plateforme Moodle de l'école."
                },
                {
                    question: "Quels types de projets seront réalisés ?",
                    reponse: "Vous développerez une application full-stack déployée sur Azure avec CI/CD et monitoring."
                },
                {
                    question: "Les cours sont-ils disponibles en ligne ?",
                    reponse: "Oui, toutes les sessions sont enregistrées et accessibles en replay."
                },
                {
                    question: "Quel est le mode d'évaluation ?",
                    reponse: "L'évaluation se fait via un projet pratique et un QCM final sur les concepts clés."
                }
            ]
        }
    };
};
