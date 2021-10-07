import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Input } from 'antd';
import { updateStudentMark, updateStudentPresence } from '../../store/teacherAction';

function Edit({ el, id, name, choice }) {

    const { TextArea } = Input;
    const { user } = useSelector(state => state.user)
    const [edit, setEdit] = useState(false)
    const [edit_info, setEdit_info] = useState()
    const dispatch = useDispatch()
    const handelClick = () => {
        setEdit(true)
    }
    const handelchange = (e) => {
        setEdit_info(e.target.value)
    }
    const handelsave = (e) => {

        if (e.key === 'Enter') {
            setEdit(false)
            if (choice === "marks") {
                dispatch(updateStudentMark(e.target.id, edit_info, user._id))
            }
            else if (choice === "presence") {
                dispatch(updateStudentPresence(e.target.id, edit_info, user._id))
            }
        }
    }

    return (
        <div style={{ display: "flex", justifyContent: "center" }}  >
            {!edit ? <div style={{ maxWidth: "200px", overflowWrap: "break-word", textAlign: "center" }}>{el}</div> :
                <TextArea autoSize id={id} type="text" defaultValue={el} name={name} onChange={handelchange} onKeyPress={handelsave} />}
            <img src="https://www.mcicon.com/wp-content/uploads/2020/12/Education_Pen_1-copy-2.jpg" alt='edite icon' style={{ width: "15px", cursor: "pointer" }} onClick={handelClick} />


        </div>

    )
}

export default Edit