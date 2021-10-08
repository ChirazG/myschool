import { addSubjectSuccess, addSubjectFail} from "./adminSlice";
import { subjectAdd } from "../api/subjectapi";
// import { deleteStudent } from "../api/adminapi";



export const newSubjectAdd = (data) => async (dispatch) => {

    console.log("ddddata", data)
    try {
        const result = await subjectAdd(data);
        console.log("rrresult", result)
        result.status === "success" ? dispatch(addSubjectSuccess(result.message)) : dispatch(addSubjectFail(result.message));

    } catch (error) {
        dispatch(addSubjectFail(error.message))
    }

}

// export const deleteStudentAdmin = (id) => async (dispatch) =>{
// console.log('iddddddd', id)
//     try {
//         await deleteStudent(id);
//         dispatch(deleteStudentSuccess())
        
//     } catch (error) {
//         console.log(error)
//         dispatch(deleteStudentFail())
//     }
//     }