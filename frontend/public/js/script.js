//ExternaL Javascript for Form Validation to check whether the fields are left vacant or not ...
function validation(event) {

    let username = document.forms['ContactsForms']['username'].value;
    let email = document.forms['ContactsForms']['email'].value;
    let password = document.forms['ContactsForms']['password'].value;


    if (username == "" || email == "" || password == "") {
        alert("Vacant Fields Detected...Please fill the form!!");// alert messages is sent for vacant posts
        event.preventDefault();
    }

    else {
        alert("Thank you for signing.")// alert message is sent for proper feedbacks
    }

}
function valid(event) {
    let logemail = document.forms['LContactsForms']['logemail'].value;
    let logpass = document.forms['LContactsForms']['logpass'].value;

    if (logemail == "" || logpass == "") {
        alert("Vacant Fields Detected...Please fill the form!!");// alert messages is sent for vacant posts
        event.preventDefault();
    }
    else {
        alert("You are logged in.")// alert message is sent for proper feedbacks
    }
}