import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAv63e81iKJ6Tz9QGzGrswziv_0FBzHDlQ",
  authDomain: "react-2024-25643.firebaseapp.com",
  projectId: "react-2024-25643",
  storageBucket: "react-2024-25643.appspot.com",
  messagingSenderId: "676828473999",
  appId: "1:676828473999:web:59edc06b99da70c34d5efa",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
