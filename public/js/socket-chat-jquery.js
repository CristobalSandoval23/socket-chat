var params = new URLSearchParams(window.location.search); 

var nombre = params.get('nombre');
var sala = params.get('sala');

var divUsuarios = document.querySelector("#divUsuarios")
var formEnviar = document.querySelector("#formEnviar")
var txtMensaje = document.querySelector("#txtMensaje")
var divChatbox = document.querySelector("#divChatbox")
var openPanel = document.querySelector(".open-panel")
var chatLeftAside = document.querySelector(".chat-left-aside")


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

divUsuarios.innerHTML = html;
}

openPanel.addEventListener('click', ()=>{
    
    var clase = openPanel.firstElementChild.className; 
    if(clase === 'ti-angle-right'){
        
        chatLeftAside.style.zIndex = "10"
        chatLeftAside.style.left = "5%"
        chatLeftAside.style.width = "90%"
        openPanel.firstElementChild.classList.replace('ti-angle-right', 'ti-angle-left')
        
    }else{
        
        chatLeftAside.style.zIndex = "1"
        chatLeftAside.style.left = "0"
        chatLeftAside.style.width = "0"
        openPanel.firstElementChild.classList.replace('ti-angle-left', 'ti-angle-right')
    }

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
    divChatbox.insertAdjacentHTML("beforeend", html);
}

divChatbox.addEventListener('scroll', (e)=>{

    
})


function scrollBottom() {

    var newMessage = divChatbox.lastElementChild;
    // heights
    var clientHeight = divChatbox.clientHeight;
    var scrollTop = divChatbox.scrollTop;
    var scrollHeight = divChatbox.scrollHeight;
    var newMessageHeight = newMessage.scrollHeight;
    var lastMessageHeight = newMessage.scrollHeight;
    var altura = clientHeight + scrollTop + newMessageHeight + lastMessageHeight
    if ( altura >= scrollHeight) {
        divChatbox.scrollTop  = scrollHeight;
    }
}

divUsuarios.addEventListener('click', (e)=>{
    var id = e.target.closest("a").dataset;

    if(id){
        console.log(id)

    }
})
formEnviar.addEventListener('submit', (e)=>{

    e.preventDefault();

    if (txtMensaje.value.length === 0) {
        return;
    }
    socket.emit('crearMensaje', {
            nombre,
            mensaje: txtMensaje.value
        }, function(mensaje) {
            txtMensaje.value = '';
            renderizarMensajes(mensaje);
            scrollBottom();
        });

})


