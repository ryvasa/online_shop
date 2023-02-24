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
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
} from "./productRedux";
import {
  getAllUsersFailure,
  getAllUsersStart,
  getAllUsersSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "./userRedux";

// GET ALL PRODUCTS
export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};
// UPDATE PRODUCT
export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    const res = await publicRequest.put(`/products/${id}`, product);
    dispatch(updateProductSuccess(res.data));
    console.log(err);
  } catch (err) {
    dispatch(updateProductFailure());
  }
};

// GET ALL USERS
export const getAllUsers = async (dispatch) => {
  dispatch(getAllUsersStart());
  try {
    const res = await publicRequest.get("/users");
    dispatch(getAllUsersSuccess(res.data));
  } catch (err) {
    dispatch(getAllUsersFailure());
  }
};

// UPDATE USERS
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

// GET ALL ORDERS
export const getOrders = async (userId, dispatch) => {
  dispatch(getOrderStart());
  try {
    const res = await publicRequest.get(`/order/${userId}`);
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
