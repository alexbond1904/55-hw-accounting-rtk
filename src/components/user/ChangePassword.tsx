import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { changeError, clearError } from "../../features/slices/userSlice"
import { changePasswordFetch } from "../../features/actions/accountAction"
import { HELLO_NAME } from "../../utils/windowsSwitch"
import { setToken } from "../../features/slices/tokenSlice"
import { encryptedToken } from "../../utils/constants"


const ChangePassword = ({setCurrentWindow}:{setCurrentWindow:(page:string)=>void}) => {
  const status = useAppSelector(state => state.user.status)
  const pending = useAppSelector(state => state.user.pending)
  const login = useAppSelector(state => state.user.user!.login)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")
  const dispatch = useAppDispatch()


  const handleClickChangePassword = () => {
    dispatch(clearError())

    const errors = []

    if (!currentPassword) {
      errors.push("Current password is empty")
    }

    if (!newPassword.trim()) {
      errors.push("New password is empty")
    }

    if (newPassword.trim() !== confirmNewPassword.trim()) {
      errors.push("New passwords do not match")
    }

    if (errors.length > 0) {
      dispatch(changeError(errors.join(", ")))
      return
    }

    dispatch(changePasswordFetch({ currentPassword, newPassword }))
      .unwrap()
      .then(()=>{
        dispatch(clearError())
        setCurrentWindow(HELLO_NAME)
        dispatch(setToken(encryptedToken(login,newPassword)))
      })
  }

  return (
    <div>
      <div className="row">
        <div className="col-12">
          <div className="mb-5">
            <h1 className={"h2"}>Change Password</h1>
          </div>
        </div>
      </div>
      <div className="row gy-3 overflow-hidden">
        <div className="col-12">
          <div className="form-floating mb-1">
            <input type="password"
                   onChange={e => setCurrentPassword(e.target.value.trim())}
                   className="password form-control border-2" name="password" id="password"
                   value={currentPassword}
                   placeholder="Password" required />
            <label htmlFor="password" className="pass form-label">Current password</label>
          </div>
        </div>
        <div className="col-12">
          <div className="form-floating mb-1">
            <input type="password"
                   onChange={e => setNewPassword(e.target.value.trim())}
                   className="password form-control border-2" name="password" id="password"
                   value={newPassword}
                   placeholder="Password" required />
            <label htmlFor="password" className="pass form-label">New password</label>
          </div>
        </div>
        <div className="col-12">
          <div className="form-floating mb-1">
            <input type="password"
                   onChange={e => setConfirmNewPassword(e.target.value.trim())}
                   className="password form-control border-2" name="password" id="password"
                   value={confirmNewPassword}
                   placeholder="Password" required />
            <label htmlFor="password" className="pass form-label">Confirm new password</label>
          </div>
        </div>

        <div className="col-12">
          <div className="d-grid">
            <button onClick={handleClickChangePassword} className="btn bsb-btn-3xl btn-primary py-3"
                    type="submit">
              {status === "Pending" &&
                <div className="spinner-border spinner-border-sm text-white me-2" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>}
              {pending && <div className="spinner-border spinner-border-sm text-white me-2" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>}Change Password
            </button>
          </div>
        </div>


      </div>
    </div>
  )
}

export default ChangePassword