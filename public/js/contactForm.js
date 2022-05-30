function getContactForm(){
    const contactForm = document.querySelector('.contact-form')
    let sender = document.querySelector('#name')
    let email = document.querySelector('#email')
    let subject = document.querySelector('#subject')
    let message = document.querySelector('#message')
    var test = false

    function validateName(){
        let nameBlock = document.querySelector('#name-block p')
        console.log(sender.value)
        if (sender.value == ''){
            nameBlock.textContent = 'You didn\'t write your name!'
            nameBlock.style.color = 'tomato'
            return false
        } else {
            nameBlock.textContent = 'Hello,'
            nameBlock.style.color = 'green'
            return true
        }
        
    }

    function validateEmail(){
        let emailBlock = document.querySelector('#email-block p')
        var regExp = /^([\w\.\+]{1,})([^\W])(@)([\w]{1,})(\.[\w]{1,})+$/;
        console.log(email.value)
        if(regExp.test(email.value) ){
            emailBlock.textContent = 'Sending your Email...'
            emailBlock.style.color = 'green'
            return true
          } else {
            emailBlock.textContent = 'You didn\'t write a valid email!'
            emailBlock.style.color = 'tomato'
            return false
          }
    }

    function validateSubject(){
        let subjectBlock = document.querySelector('#subject-block p')
        console.log(subject.value)
        if (subject.value == ''){
            subjectBlock.textContent = 'You didn\'t write any subject!'
            subjectBlock.style.color = 'tomato'
            return false
        } else {
            subjectBlock.textContent = 'Sending your subject...'
            subjectBlock.style.color = 'green'
            return true
        }
        
    }

    contactForm.addEventListener('submit', (e) => {

        let validatedName = validateName()
        let validatedEmail = validateEmail()
        let validatedSubject = validateSubject()
        

        e.preventDefault()
        if(validatedName &&  validatedEmail && validatedSubject){

            let formData = {
                name: sender.value,
                email: email.value,
                subject: subject.value,
                message: message.value,
            }

            let xhr = new XMLHttpRequest();

            xhr.open('POST', '/contact')

            xhr.setRequestHeader('content-type', 'application/json')

            xhr.onload = function(){
                console.log(xhr.responseText)
                if(xhr.responseText == 'success'){
                    alert('Coming Back to you soon');
                    sender.value = ''
                    email.value = ''
                    subject.value = ''
                    message.value = ''
                } else {
                    alert('Something went wrong')
                }
            }

            xhr.send(JSON.stringify(formData))

            console.log(formData)
        } else {
            console.log('failed');
        }
    })
}

export default getContactForm