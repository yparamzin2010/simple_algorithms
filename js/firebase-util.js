  const messagesCollectionName = "messages"

  // Web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAPi1hcqjeRhzOOfQsVnkWGUoWZ_ptQOg4",
    authDomain: "birdview-286612.firebaseapp.com",
    projectId: "birdview-286612",
    storageBucket: "birdview-286612.appspot.com",
    messagingSenderId: "128496185357",
    appId: "1:128496185357:web:4721feea9f18892f54e544",
    measurementId: "G-SSYMGREKVV"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  var db = firebase.firestore();
  var userName = "Anonymous"

  function authenticate(successCallback) {
    console.log('Authenticating...')

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then((result) => {
              console.log("Authentication succeeded!")
              //successCallback(result.user)
            }).catch(function(error) {
              console.log(`Authentication error: ${error.message}`)
            });
         }).catch((error) => {
            console.log(`Authentication initialization error: ${error.message}`)
         });
  }

  function pollDatabase() {
    var outputText = ''
    db.collection(messagesCollectionName).orderBy("timestamp", "desc").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          var message = doc.data()
          var date = new Date(message.timestamp).toLocaleString()
          outputText += `${date} - ${message.sender}:${message.body}<br>`
      });
      $('#output').html(outputText)
    });
  }

  function send(message) {
    console.log(`Sending '${message}' from '${userName}'...`);
    db.collection(messagesCollectionName).add({
        body: message,
        sender: userName,
        timestamp: Date.now()
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        pollDatabase()
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
  }

  function clearDatabase() {
     console.log("Clearing database...");

     db.collection(messagesCollectionName).get().then((querySnapshot) => {
       querySnapshot.forEach((doc) => {
           deleteById(doc.id)
       })
     })
  }

  function deleteById(id) {
     console.log(`Removing ${id}...`);
     db.collection(messagesCollectionName).doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
  }
