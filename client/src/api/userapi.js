import axios from 'axios';

const urlt = "http://localhost:5000/tokens"

export const fetchNewTeacherAccessJWT = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const { refreshJWT } = JSON.parse(localStorage.getItem("refreshJWT"));
  
        if (!refreshJWT) {
          reject("Token not found!");
        }
  
        const res = await axios.get(urlt + "/tchr", {
          headers: {
            Authorization: refreshJWT,
          },
        });
  
        if (res.data.status === "success") {
          sessionStorage.setItem("accessJWT", res.data.accessJWT);
        }
  
        resolve(true);
      } catch (error) {
        if (error.message === "Request failed with status code 403") {
          localStorage.removeItem("refreshJWT");
        }
  
        reject(false);
      }
    });
  };

  export const fetchNewStudentAccessJWT = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const { refreshJWT } = JSON.parse(localStorage.getItem("refreshJWT"));
  
        if (!refreshJWT) {
          reject("Token not found!");
        }
  
        const res = await axios.get(urlt, {
          headers: {
            Authorization: refreshJWT,
          },
        });
  
        if (res.data.status === "success") {
          sessionStorage.setItem("accessJWT", res.data.accessJWT);
        }
  
        resolve(true);
      } catch (error) {
        if (error.message === "Request failed with status code 403") {
          localStorage.removeItem("refreshJWT");
        }
  
        reject(false);
      }
    });
  };

  export const fetchNewAdminAccessJWT = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const { refreshJWT } = JSON.parse(localStorage.getItem("refreshJWT"));
  
        if (!refreshJWT) {
          reject("Token not found!");
        }
  
        const res = await axios.get(urlt, {
          headers: {
            Authorization: refreshJWT,
          },
        });
  
        if (res.data.status === "success") {
          sessionStorage.setItem("accessJWT", res.data.accessJWT);
        }
  
        resolve(true);
      } catch (error) {
        if (error.message === "Request failed with status code 403") {
          localStorage.removeItem("refreshJWT");
        }
  
        reject(false);
      }
    });
  };

  const url="http://localhost:5000/";

  export const userUpdate = (id, info, role) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.patch(url + role + `/update/${id}`, info);
            resolve(res.data);
            if (res.data.status === 'success') {
                resolve(res.data);
            }
        } catch (error) {
            console.log(error.message);
            reject(error);
        }

    })
}