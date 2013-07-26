var génèreGrille = function (nbLignes, nbColonnes, valeurInitiale) {
  var ligne, colonne, résultat = [];
  for(ligne = 0; ligne < nbLignes; ligne++) {
    résultat[ligne] = [];
    for(colonne = 0; colonne < nbColonnes; colonne++) {
      résultat[ligne][colonne] = valeurInitiale;
    }
  }
  return résultat;
};

exports.nouveauMonde = function (nbLignes, nbColonnes) {
  var
  callbackChangementCase = function () {},
  grille = génèreGrille(nbLignes, nbColonnes, false);

  return {
    caseActivée: function (ligne, colonne) {
      return grille[ligne][colonne];
    },

    inverseCase: function (ligne, colonne) {
      grille[ligne][colonne] = !grille[ligne][colonne];
      callbackChangementCase(ligne, colonne, grille[ligne][colonne]);
    },

    quandCaseChange: function (callback) {
      callbackChangementCase = callback;
    }
  };
};

exports.peinsDansCanevas2D = function (configuration, contexte) {
  return function (ligne, colonne, caseActive) {
    contexte.fillStyle = caseActive ? configuration.couleurCaseActive : configuration.couleurCaseInactive;
    contexte.fillRect(colonne * configuration.tailleCase,
                      ligne * configuration.tailleCase,
                      configuration.tailleCase - 1,
                      configuration.tailleCase - 1);
  };
};

exports.nouvelleFourmi = function (monde, positionInitiale, directionInitiale) {
  var
  position = positionInitiale,
  direction = directionInitiale;


  return {
    avance: function () {
      monde.inverseCase(position.ligne, position.colonne);
      position = {
        ligne: position.ligne + direction.dl,
        colonne: position.colonne + direction.dc
      }
    },
    position: function () {
      return position;
    }
  };
};
