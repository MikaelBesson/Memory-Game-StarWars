    // mes variables

let faceCartes = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10];
let dosCartes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let cartesCacher = [];
let nbPairesTrouvees = 0;
let score = document.getElementById("score");
let afficheScore = 1;
let imgCartes = document.getElementsByTagName("img");

initialiseJeu();

for (let i = 0; i < imgCartes.length; i++) {
    imgCartes[i].noCarte = i;
    imgCartes[i].onclick = function () {
        controleJeu(this.noCarte);
    }
}

    // attribution d'une valeur au carte 0= face cacher 1= face visible -1= la carte est retirer du plateau

function majAffichage(noCarte) {
    switch (dosCartes[noCarte]) {
        case 0:
            imgCartes[noCarte].src = "./images/fondcarte.png";
            break;
        case 1:
            imgCartes[noCarte].src = "./images/carte" + faceCartes[noCarte] + ".png";
            break;
        case -1:
            imgCartes[noCarte].style.visibility = "hidden";
            break;
    }
}

    // fonction qui melange les cartes au debut du jeu

function initialiseJeu() {
    for (let position = faceCartes.length - 1; position >= 1; position--) {
        let hasard = Math.floor(Math.random() * (position + 1));
        let sauve = faceCartes[position];
        faceCartes[position] = faceCartes[hasard];
        faceCartes[hasard] = sauve;
    }
}

    // verifie que 2 carte retourner sont les meme si oui elle séfface si non elle sont remis en possition dos de carte

function controleJeu(noCarte) {

    if (cartesCacher.length < 2) {

        if (dosCartes[noCarte] === 0) {
            dosCartes[noCarte] = 1;
            cartesCacher.push(noCarte);
            majAffichage(noCarte);
        }

        if (cartesCacher.length === 2) {
            let nouveauEtat = 0;
            if (faceCartes[cartesCacher[0]] === faceCartes[cartesCacher[1]]) {
                nouveauEtat = -1;

                //si la paire est bonne on ajoute 1 point au joueur

                nbPairesTrouvees++;
                score.innerHTML = afficheScore++;
            }

            dosCartes[cartesCacher[0]] = nouveauEtat;
            dosCartes[cartesCacher[1]] = nouveauEtat;

                // un timer pour verifier que le jeu et terminer et laisser le temp au joueur de voir ce qui ce passe

            setTimeout(function () {
                majAffichage(cartesCacher[0]);
                majAffichage(cartesCacher[1]);
                cartesCacher = [];
                if (nbPairesTrouvees === 10) {
                    rejouer();
                }
            }, 750);
        }
    }
}

    //quand le joueur a gagner une alerte message et rechargement de la page
function rejouer() {
    alert("Bravo la force et avec toi !");
    alert("Melange des carte pour une prochaine partie");
    location.reload();
}
