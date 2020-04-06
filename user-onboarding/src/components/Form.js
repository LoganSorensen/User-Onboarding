import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';

const UserForm = ({values, errors, touched, status}) => {
    console.log("values", values);
    console.log("errors", errors);
    console.log("touched", touched);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        console.log("status has changed", status);
        status && setUsers(users => [...users, status]);
    }, [status]);

    return (
        <div className="form">
            <Form>
                <Field id="name" type="text" name="name"  placeholder="Name"></Field>{touched.name && errors.name && (<p>{errors.name}</p>)}<br />
                <Field id="email" type="text" name="email" placeholder="Email"></Field>{touched.email && errors.email && (<p>{errors.email}</p>)}<br />
                <Field id="password" type="password" name="password" placeholder="Password"></Field>{touched.password && errors.password && (<p>{errors.password}</p>)}<br />
                {/* <label htmlFor="role">Please select your role: </label>
                <Field id="role" as="select">
                   <option disabled>-Choose an option-</option>
                   <option value="a">A</option>
                   <option value="b">B</option>
                   <option value="c">C</option>
                </Field>{touched.role && errors.role && (<p>{errors.role}</p>)}<br /> */}
                <Field id="tos" type="checkbox" name="tos" checked={values.tos}/>
                <label htmlFor="tos">I agree to the Terms of Service</label><br />{touched.tos && errors.tos && (<p>{errors.tos}</p>)}
                <button type="submit">Submit</button>
            </Form>
            {users.map(user => {
                return(
                    <ul key={user.id}>
                        <li>Name: {user.name}</li>
                        <li>Email: {user.email}</li>
                        <li>Password: {user.password}</li>
                        {/* <li>Role: {user.role}</li> */}
                    </ul>
                )
                
            })}
        </div>
    );
};

const FormikUserForm = withFormik({
    // mapPropsToValues({
    //     name,
    //     email,
    //     password,
    //     tos
    // }) {
    mapPropsToValues(props) {
        return {
            name: props.name || "",
            email: props.email || "",
            password: props.password || "",
            tos: props.tos || false
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required("Please enter your name"),
        email: Yup.string().required("Please enter your email"),
        password: Yup.string().required("Please enter your password"),
        // role: Yup.string().oneOf(["a", "b", "c"]).required("Please choose one"),
        tos: Yup.boolean().oneOf([true], "Please indicate that you have read the Terms of Service")
    }),
    handleSubmit(values, {setStatus, resetForm}) {
        console.log("submitting", values);
        axios
            .post("https://reqres.in/api/users/", values)
            .then(response => {
                console.log("success", response);
                setStatus(response.data);
                resetForm();
            })
            .catch(error => {
                console.log(error.response);
            })
    }
})(UserForm)

export default FormikUserForm;