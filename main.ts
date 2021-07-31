let F1: any = (<HTMLInputElement>document.querySelector('.f1'));
let EDIT: Element = document.querySelector('.Edit');
let DELETE: Element = document.querySelector('.Delete');
let TBODY: any = (<HTMLInputElement>document.querySelector('.tbody_1'));
let EDIT_BTN = (<HTMLElement>document.querySelector('.Edit_btn'));
let ADD_BTN = (<HTMLElement>document.querySelector('.Add_btn'));
let userIndex: number;


let sing = [];

//BTN add
ADD_BTN.addEventListener('click', () => {
    addUser();
});

//Delete   Edit  BTN
TBODY.addEventListener('click', function (BTN) {
     if (BTN.target.value === 'Delete') {
        deleteUser(BTN);
    }
    if (BTN.target.value === 'Edit') {
        editUser(BTN);
    } 
});

function addUser() {
    let regExp_EMAIL = /^\S{1,}@([a-z]+)\.([a-z]{2,5})$/;
    let regEXP = /^[a-zA-Z]{4,16}$/;
    let regEXP_PASS = /^[\w_.-]{4,16}$/;
    if (regExp_EMAIL.test(F1.elements[2].value)) {
        F1.elements[2].style.border = '';
    }
    else {
        F1.elements[2].style.border = '1px solid red';
    }
    if (regEXP.test(F1.elements[0].value)) {
        F1.elements[0].style.border = '';
    }
    else {
        F1.elements[0].style.border = '1px solid red';
    }
    if (regEXP_PASS.test(F1.elements[1].value)) {
        F1.elements[1].style.border = '';
    }
    else {
        F1.elements[1].style.border = '1px solid red';
    }
    if (regExp_EMAIL.test(F1.elements[2].value) && regEXP.test(F1.elements[0].value) && regEXP_PASS.test(F1.elements[1].value)){
        sing.push({ login: F1.elements[0].value, password: F1.elements[1].value, email: F1.elements[2].value });
        F1.elements[0].value = '';
        F1.elements[1].value = '';
        F1.elements[2].value = '';
        render(sing.length, sing[sing.length - 1].login, sing[sing.length - 1].password, sing[sing.length - 1].email);
    }
};

function render(index, login, password, email) {
    let inform_about_user = `<tr> <td>${index}</td> <td>${login}</td> <td>${password}</td> <td>${email}</td> <td><button class="Edit" value="Edit" type="button">Edit</button></td> <td><button class="Delete" value="Delete" type="button">Delete</button></td> </tr>`;
    document.querySelector('.tbody_1').innerHTML += inform_about_user;
}


//delete
function deleteUser(BTN) {
    sing.splice(BTN.target.parentElement.parentElement.children[0].textContent - 1, 1);
    let r = TBODY.children.length;
    for (let i = r - 1; i > 0; i--) {
        TBODY.children[i].remove();
    }
    for (let i = 0; i < sing.length; i++) {
        render(i + 1, sing[i].login, sing[i].password, sing[i].email);
    }
};


//EDIT
function editUser(BTN) {
    EDIT_BTN.style.display = 'block';
    ADD_BTN.style.display = 'none';
    F1.elements[0].value = sing[BTN.target.parentElement.parentElement.children[0].textContent - 1].login;
    F1.elements[1].value = sing[BTN.target.parentElement.parentElement.children[0].textContent - 1].password;
    F1.elements[2].value = sing[BTN.target.parentElement.parentElement.children[0].textContent - 1].email;
    userIndex = (BTN.target.parentElement.parentElement.children[0].textContent - 1);
};


//edit user
EDIT_BTN.addEventListener('click', () => {
    saveEditUser()
});

function saveEditUser() {
    class User {
        login:string;
        email:string;
        password: string|number;
        constructor(login, email, password) {
            this.login = login;
            this.email = email;
            this.password = password;
        }
    }
    let newUser = new User(F1.elements[0].value, F1.elements[1].value, F1.elements[2].value);
    sing.splice(userIndex, 1, newUser);
    console.log(sing);
    EDIT_BTN.style.display = 'none';
    ADD_BTN.style.display = 'block';

    let r = TBODY.children.length;
    for (let i = r - 1; i > 0; i--) {
        TBODY.children[i].remove();
    }
    for (let i = 0; i < sing.length; i++) {
        render(i + 1, sing[i].login, sing[i].password, sing[i].email);
    }
    F1.elements[0].value = '';
    F1.elements[1].value = '';
    F1.elements[2].value = '';
};