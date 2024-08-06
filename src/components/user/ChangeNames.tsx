import { useState } from "react"
import type { RootState } from "../../app/store"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { clearError } from "../../features/slices/userSlice"
import { changeNameFetch } from "../../features/actions/accountAction"
import { HELLO_NAME } from "../../utils/windowsSwitch"

const ChangeNames = ({setCurrentWindow}:{setCurrentWindow:(page:string)=>void}) => {
  const pending = useAppSelector(state => state.user.pending)
  const firstName = useAppSelector((state: RootState) => state.user.user!.firstName)
  const lastName = useAppSelector((state: RootState) => state.user.user!.lastName)
  const status = useAppSelector((state: RootState) => state.user.status)
  const error = useAppSelector((state: RootState) => state.user.errorMessage)
  const [firstNameInput, setFirstNameInput] = useState(firstName)
  const [lastNameInput, setLastNameInput] = useState(lastName)
  const dispatch = useAppDispatch();



  const handleClickChange = () => {
      dispatch(changeNameFetch({firstName:firstNameInput, lastName: lastNameInput}))
        .unwrap()
        .then(()=>{
          dispatch(clearError())
          setCurrentWindow(HELLO_NAME);
        })
  }


  return (
    <div>
      <div className="row">
        <div className="col-12">
          <div className="mb-5">
            <h1 className={"h2"}>Change name</h1>
          </div>
        </div>
      </div>
      <div className="row gy-3 overflow-hidden">
        <div className="col-12">
          <div className="form-floating mb-1">
            <input type="text"
                   onChange={e => setFirstNameInput(e.target.value.trim())}
                   className="form-control border-2" name="name" id="name"
                   placeholder="First Name" value={firstNameInput} required />
            <label form="name" className="user form-label">First Name</label>
          </div>
        </div>
        <div className="col-12">
          <div className="form-floating mb-1">
            <input type="text" onChange={e => setLastNameInput(e.target.value.trim())}
                   className="form-control border-2" name="lastname" id="lastname"
                   placeholder="name@example.com" value={lastNameInput} required />
            <label form="lastname" className="user form-label">Last name</label>
          </div>
        </div>

        <div className="col-12">
          <div className="d-grid">
            <button onClick={handleClickChange} className="btn bsb-btn-3xl btn-primary py-3"
                    type="submit">
              {status === "Pending" &&
                <div className="spinner-border spinner-border-sm text-white me-2" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>}
              {pending && <div className="spinner-border spinner-border-sm text-white me-2" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>}Save changes
            </button>
          </div>
        </div>


        {error &&
          <div className="col-12">
            <div className="d-grid text-center">
              {error}
            </div>
          </div>
        }

      </div>
    </div>
  )
}

export default ChangeNames