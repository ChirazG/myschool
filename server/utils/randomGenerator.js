const randomPinNumber = length => {
    let pin = '';

    for (let i = 0; i < length; i++) {
        // Math.floor(0->9.99999) => 0->9
        pin += Math.floor(Math.random()*10)   
    };
    return pin;
};

module.exports = { randomPinNumber };