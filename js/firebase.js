// Your web app's Firebase configuration
let firebaseConfig = {
  apiKey: "AIzaSyBHYtR1b7sTT_Mei0WZn5zwXxJZi5FV1c8",
  authDomain: "personal-library-56653.firebaseapp.com",
  databaseURL: "https://personal-library-56653.firebaseio.com",
  projectId: "personal-library-56653",
  storageBucket: "personal-library-56653.appspot.com",
  messagingSenderId: "614875452740",
  appId: "1:614875452740:web:52a9ef0616aa1717e33311",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let database = firebase.database();
let storage = window.localStorage;

class firebaseDB {
  static getLib(id) {
    return database
      .ref("users/" + id)
      .once("value")
      .then((snapshot) => {
        return snapshot.val();
      });
  }

  static setBook(id, book, title) {
    //if no id is specified we make a new entry in users
    let key = "";
    if (id === null) {
      key = database.ref("users/").push().key;
      storage.setItem("userID", key);
    } else {
      key = id;
    }
    //add the book to his library
    let updates = {};
    updates["/users/" + key + "/" + title + "/"] = book;

    database.ref().update(updates, function (error) {
      if (error) {
        console.log(error + "\nhere");
      }
    });
  }
}

export default firebaseDB;
