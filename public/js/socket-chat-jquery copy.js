var params = new URLSearchParams(window.location.search); 

var nombre = params.get('nombre');
var sala = params.get('sala');

// var divUsuarios = document.querySelector("#divUsuarios")
// var formEnviar = document.querySelector("#formEnviar")
// var txtMensaje = document.querySelector("#txtMensaje")
// var divChatbox = document.querySelector("#divChatbox")
// var openPanel = document.querySelector(".open-panel")
// var chatLeftAside = document.querySelector(".chat-left-aside")


var divUsuarios = $('#divUsuarios');
var formEnviar = $('#formEnviar');
var txtMensaje = $('#txtMensaje');
var divChatbox = $('#divChatbox');
var openPanel = $('.open-panel');
var chatLeftAside = $('.chat-left-aside');

function renderizarUsuarios(personas){

    var html = '';


html += '<li>';
html += '    <a href="javascript:void(0)" class="active"> Chat de <span> '+ sala+' </span></a>';
html += '</li>';

for (let index = 0; index < personas.length; index++) {
    
    html += '<li>';
    html += '    <a data-id="'+ personas[index].id+'" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>'+personas[index].nombre+'<small class="text-success">online</small></span></a>';
    html += '</li>';
}

divUsuarios.innerHtml = html;
}

chatLeftAside.on('change', function() {
   var ancho = chatLeftAside.css('width')

   console.log(ancho)
  });


openPanel.on('click', function(){
    var ancho = chatLeftAside.css('width')
    console.log('hola', ancho)
   // chatLeftAside.css('position', 'relative')
    chatLeftAside.css('z-index', '10')
    chatLeftAside.css('left', '5%')
    chatLeftAside.css('height', '90%')
    chatLeftAside.css('width', '90%')
    openPanel.children('i').removeClass("ti-angle-right")
    openPanel.children('i').addClass("ti-angle-left")

    console.log(chatLeftAside[0]["clientWidth"])
    console.log(chatLeftAside.css('width')=== "250px")

})


function renderizarMensajes(mensaje, yo = true){
    var html = '';
    var fecha = new Date(mensaje.fecha);
    var hora = fecha.getHours() + ':' + fecha.getMinutes();
    var adminClass = 'info';

    if(mensaje.nombre === 'Administrador'){
        adminClass = 'danger';
    }

    if(yo){

        html += '<li class="reverse">';
        html += '        <div class="chat-content">';
        html += '            <h5>'+mensaje.nombre+'</h5>';
        html += '            <div class="box bg-light-inverse">'+mensaje.mensaje+'</div>';
        html += '        </div>';
        html += '    <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
        html += '    <div class="chat-time">'+hora+'</div>';
        html += '</li>';

    }else{

        html += '<li class="animated fadeIn">';
        if(mensaje.nombre !== 'Administrador'){
            html += '    <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
        }
        html += '        <div class="chat-content">';
        html += '            <h5>'+mensaje.nombre+'</h5>';
        html += '            <div class="box bg-light-'+adminClass+'">'+mensaje.mensaje+'</div>';
        html += '        </div>';
        html += '    <div class="chat-time">'+hora+'</div>';
        html += '</li>';
    }




    divChatbox.textContent = html
}

function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}

divUsuarios.on('click', 'a', function(){
    var id = $(this).data('id');

    if(id){
        console.log(id)
    }
})
formEnviar.on('submit', function(e){

    e.preventDefault();

    if(txtMensaje.val().trim().length === 0){
        return;
    }

    socket.emit('crearMensaje', {
            nombre,
            mensaje: txtMensaje.val()
        }, function(mensaje) {
            txtMensaje.val('').focus();
            renderizarMensajes(mensaje);
            scrollBottom();
        });

})


