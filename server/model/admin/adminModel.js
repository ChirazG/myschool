const Admin = require('./Admin');



const insertAdmin = (stdObj) => {
    return new Promise((resolve, reject) => {
        Admin(stdObj)
            .save()
            .then((data) => resolve(data))
            .catch((error) => reject(error));
    })
};
const getAdminById = (_id) => {

    return new Promise((resolve, reject) => {
        if (!_id) return false

        try {
            Admin.findOne({ _id }, (error, data) => {
                if (error) {
                    reject(error)
                }
                resolve(data)
            })
        } catch (error) {
            reject(error)
        }


    });
}

const getAdminByEmail = (email) => {

    return new Promise((resolve, reject) => {
        if (!email) return false

        try {
            Admin.findOne({ email }, (error, data) => {
                if (error) {
                    reject(error)
                }
                resolve(data)
            })
        } catch (error) {
            reject(error)
        }


    });
};

/*const storeAdminRefreshJWT = (_id, token) => {
    return new Promise((resolve, reject) => {
      try {
        Admin.findOneAndUpdate(
          { _id },
          {
            $set: { "refreshJWT.token": token, "refreshJWT.addedAt": Date.now() },
          },
          { new: true }
        )
          .then((data) => resolve(data))
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  };*/

const updatePassword = (email, newHashedPass) => {
    return new Promise((resolve, reject) => {
        try {
            Admin.findOneAndUpdate(
                { email },
                {
                    $set: {
                        "password": newHashedPass
                    },
                },
                { new: true }
            )
                .then(data => resolve(data))
                .catch(error => {
                    console.log(error)
                    reject(error)
                })
        } catch (error) {
            console.log(error)
            reject(error)
        }

    })
}

module.exports = {
    insertAdmin,
    //storeAdminRefreshJWT,
    updatePassword,
    getAdminByEmail,
    getAdminById,
};