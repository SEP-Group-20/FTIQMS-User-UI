export default {
    DOMAIN_NAME: "http://localhost:3001",
    actionCodeSettings: {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be in the authorized domains list in the Firebase Console.
        url: 'http://localhost:3000/forgotPwd',
        // This must be true.
        handleCodeInApp: true,
    },
    firebaseConfig: {
        apiKey: "AIzaSyDw0Cidy-HUfGXxW1BBqeRT3cMbuvOgC08",
        authDomain: "ftiqms-a1061.firebaseapp.com",
        projectId: "ftiqms-a1061",
        storageBucket: "ftiqms-a1061.appspot.com",
        messagingSenderId: "5717371664",
        appId: "1:5717371664:web:ebe32664546193d1175395"
    }

}