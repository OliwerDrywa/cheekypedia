import * as firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBAM6HGG7ZHfh-pmmkyjRXXlC84lqBs9is",
  authDomain: "cheekypedia.firebaseapp.com",
  databaseURL: "https://cheekypedia.firebaseio.com",
  projectId: "cheekypedia",
  storageBucket: "cheekypedia.appspot.com",
  messagingSenderId: "460293560926",
  appId: "1:460293560926:web:f381bd89f3e112cffe32cf",
  measurementId: "G-1Y8W52KG0E"
};

export const app = firebase.initializeApp(firebaseConfig);

