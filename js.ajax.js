function sendForm(e){
   e.preventDefault();
   // document.getElementById('preloader').classList.add('showed'); //show preloader
   
   var dataToSend = new FormData(this);
   dataToSend.append('id', this.id);
   var uniqID = this.id.split("_");
   uniqID.pop();
   uniqID = uniqID.join("_");
//   alert(uniqID);
   var request = new XMLHttpRequest();
   var urlrequest = location.href;
   request.open('POST', urlrequest, true);
   request.send(dataToSend);
   
   request.onload = function() {
      if (this.status >= 200 && this.status < 400) {

         var responseDOM = new DOMParser(); //pobieranie odpowiedzi serwera
         var responseHTML = responseDOM.parseFromString(this.responseText, 'text/html'); //przetwarzanie odpowiedzi na dokument HTML
         
         document.querySelector('#'+uniqID+'_response').outerHTML = responseHTML.querySelector('#'+uniqID+'_response').outerHTML;
         document.getElementById('preloader').classList.remove('showed'); //hide preloader

      } else {
         alert('połączenie ajax nieudane');
         console.warn('Połączenie AJAX nieudane! Skontaktuj się z Fisiem, aby pomógł');
      }
   }
   
}

var myForms = document.querySelectorAll("[data-ajax]");
for (i = 0; i < myForms.length; i++) { myForms[i].addEventListener('submit', sendForm); }