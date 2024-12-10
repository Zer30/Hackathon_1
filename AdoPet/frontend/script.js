const apiUrl = 'http://localhost:5000/api';
let token = '';

const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');

registerLink.addEventListener('click', ()=> {
    wrapper.classList.add('active');
}  );

loginLink.addEventListener('click', ()=> {
    wrapper.classList.remove('active');
}  );

btnPopup.addEventListener('click', ()=> {
    wrapper.classList.add('active-popup');
}  );

iconClose.addEventListener('click', ()=> {
    wrapper.classList.remove('active-popup');
}  );

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    fetch(`${apiUrl}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    }).then(res => res.json()).then(data => {
        if (data.token) {
            token = data.token;
            document.getElementById('wrapper').style.display = 'none';
            document.getElementById('pets').style.display = 'block';
            fetchPets();
        } else {
            alert(data.error);
        }
    });
}

function register() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    fetch(`${apiUrl}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    }).then(res => res.json()).then(data => alert(data.message));
}

function addPet() {
    const name = document.getElementById('petName').value;
    const type = document.getElementById('petType').value;
    fetch(`${apiUrl}/pets/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token,
        },
        body: JSON.stringify({ name, type }),
    }).then(res => res.json()).then(() => fetchPets());
}