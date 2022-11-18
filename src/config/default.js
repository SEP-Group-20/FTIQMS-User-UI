export default {
    DOMAIN_NAME: process.env.REACT_APP_SERVER_DOMAIN_NAME,
    actionCodeSettings: {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be in the authorized domains list in the Firebase Console.
        url: process.env.REACT_APP_DOMAIN_NAME + '/forgotPwd',
        // This must be true.
        handleCodeInApp: true,
    },
    firebaseConfig: {
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        authDomain: "ftiqms-a1061.firebaseapp.com",
        projectId: "ftiqms-a1061",
        storageBucket: "ftiqms-a1061.appspot.com",
        messagingSenderId: "5717371664",
        appId: "1:5717371664:web:ebe32664546193d1175395"
    }

}