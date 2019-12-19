import React from 'react';
import axios from 'axios';
import {withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';

const UserForm = props => {
    return (
        <div className="form">
            <form>
                <input id="name" type="text" placeholder="Name"></input><br />
                <input id="email" type="email" placeholder="Email"></input><br />
                <input id="password" type="password" placeholder="Password"></input><br />
                <input id="tos" type="checkbox"></input>
                <label htmlFor="tos">I agree to the Terms of Service</label><br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default UserForm;