import { useState } from "react"
import { changeError, clearError } from "../../features/slices/userSlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { logInFetch } from "../../features/actions/accountAction"
import type { RootState } from "../../app/store"
import { setToken } from "../../features/slices/tokenSlice"
import { encryptedToken } from "../../utils/constants"

const LogIn = () => {
  const pending = useAppSelector((state:RootState) => state.user.pending)
  const error = useAppSelector((state:RootState)=> state.user.errorMessage)
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useAppDispatch();


  const handleClearInputs = () => {
    setLogin("");
    setPassword("")
    dispatch(clearError())
  }

  const handleClickLogin = () => {
    dispatch(clearError())
    if (login && password) {
      const newToken = encryptedToken(login,password);
      dispatch(logInFetch(newToken))
        .unwrap()
        .then(() => {
            dispatch(setToken(newToken))
        })
    } else {
      dispatch(changeError("Fill all inputs"))
    }
  }


  return (
    <div>
      <div className="row">
        <div className="col-12">
          <div className="mb-5">
            <h3>Log in</h3>
          </div>
        </div>
      </div>
        <div className="row gy-3 overflow-hidden">
          <div className="col-12">
            <div className="form-floating mb-1">
              <input onChange={(e)=>setLogin(e.target.value)}
                     value={login}
                     type="email" className="form-control  border-2 " name="email" id="email"
                     placeholder="name@example.com" required />
              <label form="email" className="email form-label">Email</label>
            </div>
          </div>
          <div className="col-12">
            <div className="form-floating mb-1">
              <input onChange={(e)=>setPassword(e.target.value)}
                     value={password}
                     type="password" className="password form-control border-2" name="password" id="password"
                     placeholder="Password" required />
              <label htmlFor="password" className="pass form-label">Password</label>
            </div>
          </div>

          <div className="col-12">
            <div className="d-grid">
              <button onClick={handleClickLogin} className="btn bsb-btn-3xl btn-primary py-3" type="submit">
                {pending && <div className="spinner-border spinner-border-sm text-white me-2" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>}
                Log in now</button>
            </div>
          </div>
          <div className="col-12">
            <div className="d-grid">
              <button onClick={handleClearInputs} className="btn bsb-btn-3xl btn-primary py-3" type="submit">Clear</button>
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

export default LogIn