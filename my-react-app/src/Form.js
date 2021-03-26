import React, { useEffect,useState } from 'react';
import axios from "axios";
import SchemaSetUp from './SchemaSetUp';
import * as yup from "yup"

export default function Form() {
    

const initialValues = {
    name: "",
    email: "",
    password:"",
    tos:false
}
const initialErrors = {
    name: "",
    email: "",
    password:"",
}

const initialDisabled = true;


const [users, setUsers] = useState([]);
const [createForm, setCreateForm] = useState(initialValues);
const [formErrors, setFormErrors] = useState(initialErrors);
const [buttonDisabled, setButtonDisabled] = useState(initialDisabled);

const onSubmit = evt => {
    evt.preventDefault()
    const newUser = {
        name:createForm.name,
        email:createForm.email,
        
        password: createForm.password,
        tos: createForm.tos
    }
    axios.post('https://reqres.in/api/users', newUser)
    .then(res => {
        setUsers(res.data)
        setCreateForm(initialValues)
    })
    .catch(err => {
        console.log(err);
    })
    }

const onChange = evt => {
    const {name, type, value, checked} = evt.target
    const valueToUse = type === 'checkbox' ? checked : value
    inputChange(name, valueToUse)
    setCreateForm({...createForm, [name]:valueToUse})
}

const inputChange = (name, value) => {
    yup.reach(SchemaSetUp, name)
      .validate(value)
      .then(() => {
        setFormErrors({...formErrors, [name]: ''})
      })
      .catch(err => {
        setFormErrors({...formErrors, [name]: err.errors[0]})
      })
    setCreateForm({
      ...createForm,
      [name]: value 
    })
  }
 
  useEffect(() => {
    SchemaSetUp.isValid(createForm).then(valid => setButtonDisabled(!valid))
  }, [createForm])


    return (
        <div>
           <form onSubmit={onSubmit}>
           <div className='errors'>
          <div>{formErrors.name}</div>
          <div>{formErrors.email}</div>
          <div>{formErrors.password}</div>
          <div>{formErrors.tos}</div>
        </div>
               <label>Name:
                   <input
                   type="text"
                   name="name"
                    onChange={onChange}
                   values={createForm.name}
                   />
               </label>
               <label>Email:
               <input
                   type="text"
                   name="email"
                    onChange={onChange}
                   values={createForm.email}
                   />
               </label>
               <label>Password:
               <input
                   type="password"
                   name="password"
                    onChange={onChange}
                    values={createForm.password}
                   />
               </label>
               <label>Terms of Service
               <input
                   type="checkbox"
                   name="tos"
                    onChange={onChange}
                    checked={createForm.tos}
                   />
               </label>
<button disabled={buttonDisabled}>
    Submit!
</button>
               </form> 
        </div>
    )
}