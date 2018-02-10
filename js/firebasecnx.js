// Initialize Firebase
var config = {
    apiKey: "AIzaSyCK2qIzalI9XG_yvkRH0oMTS5YejFoIIcs",
    authDomain: "games-for-good.firebaseapp.com",
    databaseURL: "https://games-for-good.firebaseio.com",
    storageBucket: "games-for-good.appspot.com",
};
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log(user.email + ' signed in')
        document.getElementsByClassName("out")[0].style.display = 'none';
        document.getElementsByClassName("in")[0].style.display = 'inline';
        document.getElementsByClassName("out")[1].style.display = 'none';
        document.getElementsByClassName("in")[1].style.display = 'inline';
    } else {
        console.log('Not signed in')
        document.getElementsByClassName("out")[0].style.display = 'inline';
        document.getElementsByClassName("in")[0].style.display = 'none';
        document.getElementsByClassName("out")[1].style.display = 'inline';
        document.getElementsByClassName("in")[1].style.display = 'none';
    }
});     


