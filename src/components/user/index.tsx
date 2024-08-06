import { useState } from "react"
import { CHANGE_NAMES, CHANGE_PASSWORD, HELLO_NAME } from "../../utils/windowsSwitch"
import ChangeNames from "./ChangeNames"
import ChangePassword from "./ChangePassword"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { useLogOut } from "../../utils/useLogout"
import { clearError } from "../../features/slices/userSlice"

const Settings = () => {
  const [currentWindow, setCurrentWindow] = useState<string>(HELLO_NAME)
  const firstname = useAppSelector((store) => store.user.user?.firstName)
  const lastname = useAppSelector((store) => store.user.user?.lastName)
  const login = useAppSelector((store) => store.user.user?.login)
  const role = useAppSelector((store) => store.user.user?.roles)
  const error = useAppSelector(state => state.user.errorMessage)
  const dispatch = useAppDispatch();
  const logOut = useLogOut();

  return (
    <div>
      {currentWindow === CHANGE_NAMES && <ChangeNames setCurrentWindow={setCurrentWindow} />}
      {currentWindow === CHANGE_PASSWORD && <ChangePassword setCurrentWindow={setCurrentWindow}/>}

      {currentWindow === HELLO_NAME &&
        (<div>
            <div className="row">
              <div className="col-12">
                <div className="mb-5">
                  <h1 className={"h2"}>
                    Hello, {firstname}
                  </h1>
                </div>
              </div>
            </div>
            <div className={"mb-5"}>
              <p><b>First Name:</b> {firstname}</p>
              <p><b>Last Name:</b> {lastname}</p>
              <p><b>Login (email):</b> {login}</p>
              <p><b>Role:</b> {role}</p>
            </div>
          </div>
        )
      }

      <div className="col-12 mb-4 mt-3">
        <div className="d-grid">
          <button onClick={logOut} className="btn bsb-btn-3xl btn-secondary py-3"
                  type="submit">
            Log out
          </button>
        </div>
      </div>

      {error &&
        <div className="col-12">
          <div className="d-grid text-center text-danger">
            {error}
          </div>
        </div>}

      <div className="row mb-4">
        <div className="col-12">
          <hr className="mb-4 border-secondary-subtle" />
          <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-center">
            {currentWindow !== HELLO_NAME && <button className="btn btn-link link-secondary text-decoration-none"
                                                     onClick={() => {
                                                       setCurrentWindow(HELLO_NAME);
                                                       dispatch(clearError());
                                                     }}>
              Home
            </button>}
            {currentWindow !== CHANGE_PASSWORD && <button className="btn btn-link link-secondary text-decoration-none"
                                                          onClick={() => {
                                                            setCurrentWindow(CHANGE_PASSWORD);
                                                            dispatch(clearError());
                                                          }}>
              Change password
            </button>}
            {currentWindow !== CHANGE_NAMES && <button className="btn btn-link link-secondary text-decoration-none"
                                                       onClick={() => {
                                                         setCurrentWindow(CHANGE_NAMES);
                                                         dispatch(clearError());
                                                       }}>
              Change names
            </button>}


          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings