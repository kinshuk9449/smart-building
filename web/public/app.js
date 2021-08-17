$(document).ready(function () {
    $("#navbar").load("navbar.html");
});

$(document).ready(function () {
    $("#navbar_signin").load("navbar_signin.html");
});

const user_name = JSON.parse(localStorage.getItem('user_name')) || [];

const user_email = JSON.parse(localStorage.getItem('user_email')) || [];

const users = JSON.parse(localStorage.getItem('users')) || [];

const devices = JSON.parse(localStorage.getItem('devices')) || [];
var login =0;

function Sign_Up() {

    const email = $('#email').val();
    const name = $('#name').val();
    const mobile = $('#phone').val();
    const pass = $('#pass').val();
    users.push({ email, name, mobile, pass });
    devices.push({ email, name });
    localStorage.setItem('users', JSON.stringify(users));
    location.href = '/signin';
}

function Sign_In() {

    const email = $('#email').val();
    const pass = $('#pass').val();
    user_name[0] = email ;
    localStorage.setItem('user_name', JSON.stringify(user_name));
    users.forEach(function (user) {

        if (user.email == email && user.pass == pass) {
            login = 1;
            user_name[0] = user.name;
            user_email[0] = user.email;
            localStorage.setItem('user_name', JSON.stringify(user_name));
            localStorage.setItem('user_email', JSON.stringify(user_email));
        }

    });
    if (login == 1) {
        location.href = '/landing-page';
        document.getElementById
    }
    else {
        alert('User not found. Sign up!!');
        location.href = '/';
    }
}

function Device_register() {
    
    const deviceid = $('#device-id').val();
    const devicebuilding = $('#device-building').val();
    const deviceroom = $('#device-room').val();
    const device = $('#device').val();
    devices.push({ deviceid,device,devicebuilding,deviceroom});
    localStorage.setItem('devices', JSON.stringify(devices));
    location.href = '/landing-page';
}