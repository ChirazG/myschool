const redis = require("redis");
const client = redis.createClient(process.env.REDIS_URL);

//redis://localhost:6379

client.on("error", function (error) {
    console.error(error);
});

const setJWT = (key, value) => {

    return new Promise((resolve, reject) => {
        try {
            client.set(key, value, (err, res) => {
                if (err) reject(err)
                resolve(res);
            });
        } catch (error) {
            reject(error);
        }

    });
};

const getJWT = (key) => {

    return new Promise((resolve, reject) => {
        try {
            client.get(key, (err, res) => {
                if (err) reject(err)
                resolve(res);
            });
        } catch (error) {
            reject(error);
        }

    });
};

const deleteJWT = key => {
    try {
        // if there's a key it will delete the key from the db if there's no key it will return null
        client.del(key)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    setJWT,
    getJWT,
    deleteJWT,
}