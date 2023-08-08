// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyAmNee83CVdCl8XXlhCxOmPK2k1Pv7a5uI",
//   authDomain: "aplicativo-de-apostas-c798b.firebaseapp.com",
//   projectId: "aplicativo-de-apostas-c798b",
//   storageBucket: "aplicativo-de-apostas-c798b.appspot.com",
//   messagingSenderId: "309805704643",  
//   appId: "1:309805704643:web:b45d9ad38b1b7d5a4ac976",
//   measurementId: "G-ZMN8YMB2KY"
// };

const firebaseConfig = {
  apiKey: "AIzaSyA5KvHey5SPNHLCeZ2HFThniYm9bYLg6uk",
  authDomain: "chat-teste-ed7ce.firebaseapp.com",
  projectId: "chat-teste-ed7ce",
  storageBucket: "chat-teste-ed7ce.appspot.com",
  messagingSenderId: "461605538492",
  appId: "1:461605538492:web:d822d29e60da5d9ab99eb9",
  measurementId: "G-N1STMB8FWS"
};

const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = getFirestore(app);
export default db;