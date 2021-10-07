const { randomPinNumber } = require('../../utils/randomGenerator');
const ResetPin = require('./resetPinSchema');

//A.4. save email and pin in database
const setPasswordResetPin = async (email) => {
    // create random 6 digit then we send our new email and 6 digit to our schema 
    const pinLength = 6;
    //A.3. create uniq 6 digit pin
    const randPin = await randomPinNumber(pinLength);

    const resetObj = {
        email,
        pin: randPin
    };

    return new Promise((resolve, reject) => {
        ResetPin(resetObj)
            .save()
            .then((data) => resolve(data))
            .catch((error) => reject(error));
    })
};

const getPinByEmailPin = (email, pin) => {

    return new Promise((resolve, reject) => {
        try {
            ResetPin.findOne({ email, pin }, (error, data) => {
                if (error) {
                    console.log(error);
                    resolve(false);
                }

                resolve(data);
            })

        } catch (error) {
            reject(error)
            console.log(error)
        }
    })


};

const deletePin = (email, pin) => {
    try {
        ResetPin.findOneAndDelete({ email, pin }, (error, data) => {
            if (error) {
                console.log(error);
            }
        })

    } catch (error) {
        console.log(error)
    }

}


module.exports = {
    setPasswordResetPin,
    getPinByEmailPin,
    deletePin,
};