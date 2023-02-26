import { publicRequest } from "../requestMethode";
import {
  deleteOrderFailure,
  deleteOrderStart,
  deleteOrderSuccess,
  getOrderFailure,
  getOrderStart,
  getOrderSuccess,
} from "./orderRedux";
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
  } catch (err) {
    dispatch(updateUserFailure());
  }
};
export const getOrders = async (userId, dispatch) => {
  dispatch(getOrderStart());
  try {
    const res = await publicRequest.get(`/orders/find/${userId}`);

    dispatch(getOrderSuccess(res.data));
  } catch (err) {
    dispatch(getOrderFailure());
  }
};
export const deleteOrders = (dispatch) => {
  dispatch(deleteOrderStart());
  dispatch(deleteOrderSuccess());
  dispatch(deleteOrderFailure());
};
