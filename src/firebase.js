import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBfTeyUZ0caasmZSOsoKxT1eCiJKfG6wZs",
  authDomain: "onlineshop-8177e.firebaseapp.com",
  projectId: "onlineshop-8177e",
  storageBucket: "onlineshop-8177e.appspot.com",
  messagingSenderId: "627713795696",
  appId: "1:627713795696:web:4e79de83923de600f936b5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
