var
LANGTON = require("./src/langton"),

canevas = document.getElementById("langton"),
contexte = canevas.getContext("2d"),
monde = LANGTON.nouveauMonde(10, 10),
configuration = {
  tailleCase: 30,
  couleurCaseActive: "white",
  couleurCaseInactive: "black"
},
fourmi = LANGTON.nouvelleFourmi(monde, {ligne: 8, colonne: 5}, {dl: -1, dc: 0});

monde.quandCaseChange(LANGTON.peinsDansCanevas2D(configuration, contexte));

setInterval(function () {fourmi.avance();}, 500);
