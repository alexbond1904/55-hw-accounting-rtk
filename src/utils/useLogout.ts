import { useAppDispatch } from '../app/hooks';
import { clearError, clearUser } from "../features/slices/userSlice"
import { clearToken } from "../features/slices/tokenSlice"

export const useLogOut = () => {
  const dispatch = useAppDispatch();

  return () => {
    dispatch(clearError())
    dispatch(clearUser());
    dispatch(clearToken());
  };
};
