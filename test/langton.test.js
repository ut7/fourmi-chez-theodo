var
expect = require("expect.js"),
LANGTON = require("../src/langton");

describe("Le monde", function () {
  it("sait activer et désactiver des cases", function () {
    var monde = LANGTON.nouveauMonde(16, 9);
    expect(monde.caseActivée(4, 7)).not.to.be.ok()

    monde.inverseCase(4, 7);
    expect(monde.caseActivée(4, 7)).to.be.ok()
    expect(monde.caseActivée(5, 9)).not.to.be.ok()

    monde.inverseCase(4, 7);
    expect(monde.caseActivée(4, 7)).not.to.be.ok()
  });

  it("est torique", function () {
    var monde = nouveauMonde(16, 9);
    monde.nouvellePosition({ligne: 0, colonne: 5}, {dl: -1, dc: 0}).to.eql({ligne: 15: colonne: 5});
  });

  it("génère un événement quand il active/désactive une case", function () {
    var
    argumentsCallback = [],
    monde = LANGTON.nouveauMonde(16, 9);

    monde.quandCaseChange(function () {
      argumentsCallback = arguments;
    });

    monde.inverseCase(4, 7);
    expect(argumentsCallback).to.eql([4, 7, true]);
  });
});

describe("Un peintre de cases", function () {
  it("sait peindre dans le canevas 2D", function () {
    var
    argumentsFillRect = []
    contexte = {
      fillRect: function () {
        argumentsFillRect = arguments;
      }
    },
    peinsCase = LANGTON.peinsDansCanevas2D({
      tailleCase: 5,
      couleurCaseActive: "b",
      couleurCaseInactive: "n"
    }, contexte);

    peinsCase(5, 9, true);
    expect(contexte.fillStyle).to.eql("b");
    expect(argumentsFillRect).to.eql([9 * 5, 5 * 5, 5 - 1, 5 - 1]);


    peinsCase(5, 9, false);
    expect(contexte.fillStyle).to.eql("n");
  });
});

describe("Une fourmi", function () {
  var monde = {
    inverseCase: function () {}
  };


  it("sait avancer", function () {
    var
    fourmi = LANGTON.nouvelleFourmi(monde, {ligne: 4, colonne: 7}, {dl: -2, dc: 3});

    fourmi.avance();
    expect(fourmi.position()).to.eql({ligne: 2, colonne: 10});
  });

  it("inverse la case avant d'avancer", function () {
    var
    argumentsInverseCase = [],
    fourmi = LANGTON.nouvelleFourmi(monde, {ligne: 4, colonne: 7}, {dl: -2, dc: 3});

    monde.inverseCase = function () {
      argumentsInverseCase = arguments;
    }

    fourmi.avance();
    expect(argumentsInverseCase).to.eql([4, 7]);

  });
});
