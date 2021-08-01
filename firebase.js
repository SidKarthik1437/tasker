import firebase from 'firebase';



const firebaseConfig = {
  apiKey: "AIzaSyAo1ghfMlaZdZ0PzPJNuAiKErz1Xc8PMGg",
  authDomain: "tasker-20.firebaseapp.com",
  projectId: "tasker-20",
  storageBucket: "tasker-20.appspot.com",
  messagingSenderId: "1071860553208",
  appId: "1:1071860553208:web:8cc82c0c19fb889f04720d"
};


const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

  const Firebase = app.firestore();

  export { Firebase };
