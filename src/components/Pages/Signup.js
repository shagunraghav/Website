import React from 'react';
import Field from '../Common/Field';
import {withFormik} from 'formik';
import {connect} from 'react-redux';
import * as Yup from 'yup';
import * as AuthActions from '../../store/actions/authActions.js';

const fields=[
    {name:'email',elementName:'input',type:'email',placeholder:'Your email'},
    {name:'name',elementName:'input',type:'text',placeholder:'Your name'},
    {name:'password',elementName:'input',type:'password',placeholder:'Your Password'},
    {name:'password2',elementName:'input',type:'password',placeholder:' Password again'}
]

class Signup extends React.Component{
    render(){
        return(
            <div className="login-page">
                <div className="container">
                    <div className="login-form">
                        <div className='row'>
                            <h1>SignUp</h1>
                        </div>
                        <div >
                            <form className="row" onSubmit={e=>{
                                e.preventDefault();
                                this.props.register(this.props.values.name,this.props.values.email,this.props.values.password);
                            }}>
                            {fields.map((f,i)=>{
                                return (
                                <div className="col-md-6">
                                    <Field
                                    key={i}
                                    {...f}
                                    value={this.props.values[f.name]}
                                    name={f.name}
                                    onChange={this.props.handleChange}
                                    onBlur={this.props.handleBlur}
                                    touched={(this.props.touched[f.name])}
                                    errors={this.props.errors[f.name]}
                                />
                                </div>
                                )
                            })}
                            <div className="col-md-12">
                                <p className="text-danger text-center">{this.props.auth.error || ''}</p>
                                <button className="btn btn-primary">SignUp</button>
                        </div>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state=>{
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch=>{
    return{
        register:(name,email,pass)=>{
            dispatch(AuthActions.register(name,email,pass));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withFormik({
    mapPropsToValues:()=> ({
        email:'',
        name:'',
        password:'',
        password2:'',
    }),
    validationSchema: Yup.object().shape({
        name:Yup.string().required('We need Your name'),
        email:Yup.string().email('Email is invalid.').required('You need login  with email address'),
        password: Yup.string().min(6,'Password need to be 8 characters long').required('You need to enter your password.'),
        password2:Yup.string().required('you need to enter your password again').test('pass-match','Passwords dont match',function(value){
            const {password} = this.parent;
            return password === value;
        })
    }),
    handleSubmit:(values,{setSubmitting},login)=>{
        console.log("Login attempt",values);
        this.props.login(values.email,values.password);
    }
})(Signup));


