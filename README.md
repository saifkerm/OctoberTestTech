## Lancement du projet
 - npm install
 - node dist/index
 
## Pour exécuter les tests
 - npm run test
 
 ## Exemple d'utilisation de l'api
 - localhost:4000/SIRETouSIREN>
 - Exemple : localhost:4000/80426417400017
 - Retourne : {
        creation_date: string;
        name: string;
        address: {
            street: string;
            postalCode: string;
            city: string;
            country: string;
        };
        phoneNumber: string;
        sirent: string;
        siret: string;
        capital: string
}
