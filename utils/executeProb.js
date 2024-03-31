function executeProb(func, probability, ...args) {
  var randomNum = Math.floor(Math.random() * 100) + 1;

  if (randomNum <= probability) {
    console.log("Function executed start");
    func(...args);
  } else {
    console.log(
      "Function text executed stopped with probability " +
        randomNum +
        " bigger than " +
        probability
    );
  }
}

export default executeProb;
