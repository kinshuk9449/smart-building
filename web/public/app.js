$(document).ready(function () {
    $("#navbar").load("navbar.html");
});

$(document).ready(function () {
    $("#navbar_signin").load("navbar_signin.html");
});

const USER_URL = `http://localhost:5001/api`;
const DEVICE_URL = `http://localhost:5000/api`;

/**
 *  Devices information is taken from mongodb.
 * It sees the type of device and display it in specific tables according to the table name.
 */
$.get(`${DEVICE_URL}/devices`)
    .then(response => {
        response.forEach(device => {
            if (device.device.toLowerCase() == 'conditioner') {
                $('#conditioner tbody').append(`
          <tr>
            <td>${device.deviceid}</td>
            <td>${device.devicebuilding}</td>
            <td>${device.deviceroom}</td>
          </tr>`
                );
            }
            else if (device.device.toLowerCase() == 'light') {
                $('#light tbody').append(`
          <tr>
            <td>${device.deviceid}</td>
            <td>${device.devicebuilding}</td>
            <td>${device.deviceroom}</td>
          </tr>`
                );
            }

            else if (device.device.toLowerCase() == 'security') {
                $('#security tbody').append(`
    <tr>
    <td>${device.deviceid}</td>
    <td>${device.devicebuilding}</td>
    <td>${device.deviceroom}</td>
    </tr>`
                );
            }

            else {
                $('#other-devices tbody').append(`
          <tr>
            <td>${device.deviceid}</td>
            <td>${device.device}</td>
            <td>${device.devicebuilding}</td>
            <td>${device.deviceroom}</td>
          </tr>`
                );
            }
        });
    })
    .catch(error => {
        console.log(`Error: ${error}`);
    });


const user_name = JSON.parse(localStorage.getItem('user_name')) || [];

const user_email = JSON.parse(localStorage.getItem('user_email')) || [];


/**
 * Users details are taken and then it checks if the email is already registered or not.
 * If it is registered before it asks user to sign in instead.
 * If not registered it will register the user and redirect to signin page.
 */


function Sign_Up() {

    var user_exist =0;
    const email = $('#email').val();
    const name = $('#name').val();
    const mobile = $('#phone').val();
    const pass = $('#pass').val();
    const access = $('#access').val();
    $.get(`${USER_URL}/users`)
    .then(response => {

        response.forEach(user => {


        if (user.email == email) {

            user_exist = 1;

        }
    });
    if(user_exist == 1)
    {
        alert('Email already Exist. SIgn In');
        location.href = '/signin';
    }
    else
    {
    const body = {
        email,
        name,
        mobile,
        pass,
        access
      };
    
      $.post(`${USER_URL}/users`, body)
      .then(response => {
        location.href = '/signin';
      })
      .catch(error => {
        console.error(`Error: ${error}`);
      });
    }
})
.catch(error => {
    console.error(`Error: ${error}`);
  });
    

}

/**
 * Details are matched with the existing user and matches if user and password matches or not
 * If it matches user is given access and the page specific to its access is shown.
 * If it doesn't match it redirects user to sign up page.
 */

function Sign_In() {
    var login = 0;
    const email = $('#email').val();
    const pass = $('#pass').val();
    $.get(`${USER_URL}/users`)
    .then(response => {

        response.forEach(user => {

        if (user.email == email && user.pass == pass) {
            console.log('matched')
            login = 1;
            user_name[0] = user.name;
            user_email[0] = user.access;
            localStorage.setItem('user_name', JSON.stringify(user_name));
            localStorage.setItem('user_email', JSON.stringify(user_email));
        }
    });
    if (login == 1) {
        location.href = '/landing-page';

    }
    else {
        alert('User not found. Sign up!!');
        location.href = '/signup';
    }
})
    

}

/**
 * If the user is given access it can add the device
 * If the device id is already registered it asks to register with different device id
 * If the device id is different from previous registered devices it registers the device
 */
function Device_register() {

    var device_exist =0;
    const deviceid = $('#device-id').val();
    const devicebuilding = $('#device-building').val();
    const deviceroom = $('#device-room').val();
    const device = $('#device').val();
    $.get(`${DEVICE_URL}/devices`)
    .then(response => {
        response.forEach(device => {


        if (device.deviceid == deviceid) {
            device_exist = 1;

        }
    });
    if(device_exist == 1)
    {
        alert('Device ID alredy Exists. Assign different Id!!');
            location.href = '/device-register';
    }
    else{

    
    const body = {
        deviceid,
        devicebuilding,
        deviceroom,
        device
      };
    
      $.post(`${DEVICE_URL}/devices`, body)
      .then(response => {
        location.href = '/landing-page';
      })
      .catch(error => {
        console.error(`Error: ${error}`);
      });
    }
})
    
    
}
