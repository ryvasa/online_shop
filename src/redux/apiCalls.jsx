import { publicRequest } from "../requestMethode";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
} from "./productRedux";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "./userRedux";

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const updateUsers = async (id, user, dispatch) => {
  dispatch(updateUserStart());
  try {
    const res = await publicRequest.put(`/users/${id}`, user);
    dispatch(updateUserSuccess(res.data));
    console.log(err);
  } catch (err) {
    dispatch(updateUserFailure());
  }
};
