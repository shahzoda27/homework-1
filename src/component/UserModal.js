import React from 'react'
import { Modal,ModalHeader,ModalBody,ModalFooter } from 'reactstrap'
import axios from 'axios'
const UserModal = ({open,toggle,user}) => {
    const addUsers =(e)=>{
        e.preventDefault()
        let payload ={
            name: e.target[0].value,
            department: e.target[1].value,
            gender: JSON.parse(e.target[2].value) ,
            date: e.target[3].value,
        }
        if (user !== "") {
            axios.patch(`http://localhost:8000/users/${user.id}`,{...payload}).then(res=>{
                console.log(res);
                if (res.status === 200) {
                    window.location.reload()
                }
            })
        }else{
            axios.post('http://localhost:8000/users',{...payload}).then((res)=>{
                if (res.status === 201) {
                    window.location.reload()
                }
            }).catch((err)=>{
                console.log(err);
            })
        }
        
    }
  return (
    <Modal isOpen={open} toggle={toggle}>
      <ModalHeader>
        <h1>Add User</h1>
      </ModalHeader>
      <ModalBody>
        <form id='users' onSubmit={addUsers}>
            <input type="text" defaultValue={user.name} placeholder='name' className='form-control my-2' />
            <input type="text" defaultValue={user.department} placeholder='department' className='form-control my-2' />
            <input type="text" defaultValue={user.gender} placeholder='genderda true yozsez male keladi false yozsez female' className='form-control my-2' />
            <input type="text" defaultValue={user.date} placeholder='age' className='form-control my-2' />
        </form>
      </ModalBody>
      <ModalFooter>
        {
            user !== "" ?
            <button type='submit' form='users' className='btn btn-success'>Edit User</button> :
            <button type='submit' form='users' className='btn btn-primary'>Add User</button>

        }
      </ModalFooter>
    </Modal>
  )
}

export default UserModal
