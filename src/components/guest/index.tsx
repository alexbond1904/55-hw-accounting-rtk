import LogIn from "./LogIn"
import Register from "./Register"
import { LOGIN, REGISTER } from "../../utils/windowsSwitch"
import { useState } from "react"
import { clearError } from "../../features/slices/userSlice"
import { useAppDispatch } from "../../app/hooks"


const Guest = () => {
  const [currentWindow, setCurrentWindow] = useState<string>(LOGIN)
  const dispatch = useAppDispatch();

  const handleChangeWindow = () => {
    currentWindow === LOGIN ? setCurrentWindow(REGISTER) : setCurrentWindow(LOGIN)
  }

  return (
    <div>
      <div>
        {currentWindow === LOGIN ? <LogIn /> :
          <Register />
        }
      </div>
      <div className="row mb-4">
        <div className="col-12">
          <hr className="mb-4 border-secondary-subtle" />
          <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-center">
            <button className="btn btn-link link-secondary text-decoration-none"
                    onClick={()=> {
                      handleChangeWindow();
                      dispatch(clearError());
                    }
                    }>
              {currentWindow === LOGIN ? "Create new account" : "Already have an account? Log In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Guest