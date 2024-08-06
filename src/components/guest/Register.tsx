import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { registerFetch } from "../../features/actions/accountAction"
import type { UserRequest } from "../../utils/interfaces"
import { changeError, clearError } from "../../features/slices/userSlice"


const Register = () => {
    const status = useAppSelector(state => state.user.status);
    const error = useAppSelector(state => state.user.errorMessage);
    const pending = useAppSelector(state => state.user.pending);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const dispatch = useAppDispatch();



    const handleClickRegister = () => {
        let emptyInputsError = ""
        emptyInputsError = !firstName.trim() ? emptyInputsError + " first name," : emptyInputsError;
        emptyInputsError = !lastName.trim() ? emptyInputsError + " last name," : emptyInputsError;
        emptyInputsError = !email.trim() ? emptyInputsError + " email," : emptyInputsError;
        emptyInputsError = !password.trim() ? emptyInputsError + " password," : emptyInputsError;

        if (emptyInputsError) {
            emptyInputsError = emptyInputsError.substring(0, emptyInputsError.length - 1)
            return dispatch(changeError("Error: wrong"+emptyInputsError))
        }

        dispatch(clearError())
        const user:UserRequest = {
            firstName,
            lastName,
            password,
            login:email
        }
        dispatch(registerFetch(user));
        if (status === "LoggedIn") {
            setPassword("")
            setEmail("")
            setLastName("")
            setFirstName("")
        }
    }

    return (
        <div>
            <div className="row">
                <div className="col-12">
                    <div className="mb-5">
                        <h3>Register</h3>
                    </div>
                </div>
            </div>
            <div className="row gy-3 overflow-hidden">
                <div className="col-12">
                    <div className="form-floating mb-1">
                        <input type="text"
                               onChange={e => setFirstName(e.target.value.trim())}
                               className="form-control border-2" name="name" id="name"
                               placeholder="First Name" value={firstName} required/>
                        <label form="name" className="user form-label">First Name</label>
                    </div>
                </div>
                <div className="col-12">
                    <div className="form-floating mb-1">
                        <input type="text" onChange={e => setLastName(e.target.value.trim())}
                               className="form-control border-2" name="lastname" id="lastname"
                               placeholder="name@example.com" value={lastName} required/>
                        <label form="lastname" className="user form-label">Last name</label>
                    </div>
                </div>
                <div className="col-12">
                    <div className="form-floating mb-1">
                        <input type="email" onChange={e => setEmail(e.target.value.trim())}
                               className="form-control border-2" name="email" id="email"
                               placeholder="name@example.com" value={email} required/>
                        <label form="email" className="email form-label">Email</label>
                    </div>
                </div>
                <div className="col-12">
                    <div className="form-floating mb-1">
                        <input type="password"
                               onChange={e => setPassword(e.target.value.trim())}
                               className="password form-control border-2" name="password" id="password"
                               value={password}
                               placeholder="Password" required/>
                        <label htmlFor="password" className="pass form-label">Password</label>
                    </div>
                </div>

                <div className="col-12">
                    <div className="d-grid">
                        <button onClick={handleClickRegister} className="btn bsb-btn-3xl btn-primary py-3"
                                type="submit">
                            {pending && <div className="spinner-border spinner-border-sm text-white me-2" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>}Register
                        </button>
                    </div>
                </div>
                {error &&
                <div className="col-12">
                    <div className="d-grid text-center text-danger">
                        {error}
                    </div>
                </div>}

            </div>
        </div>
    )
}

export default Register