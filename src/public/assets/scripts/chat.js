const socket= io();


let nombre=''
let divMensajes=document.getElementById('mensajes')
let inputMenajes=document.getElementById('mensaje')

inputMenajes.addEventListener('keyup',evt=>{
    // console.log(evt)

    if(evt.key==='Enter'){
        if(evt.target.value.trim()!=='')
        {socket.emit('nuevoMensaje',{email:email,message:evt.target.value.trim()})}
         evt.target.value=``;
        inputMenajes.focus()
    
        }
    })

Swal.fire({
    title:"Identifiquese",
    input:"text",
    text:"Ingrese su email",
    inputValidator: (value)=>{
        return !value && "Debe ingresar un email...!!!"
    },
    allowOutsideClick:false
}).then(result=>{
    email= result.value

    document.title=email
    inputMenajes.focus()

    socket.emit('id', email)
})
socket.on('bienvenida',mensajes=>{
    let txt=''

    mensajes.forEach(mensaje => {
        txt+=`<p class="mensaje"><strong>${mensaje.email}: </strong><i>${mensaje.message}</i></p><br>`
        });
        txt.toString();
    divMensajes.innerHTML=txt;
    divMensajes.scrollTop=divMensajes.scrollHeight;
    })
socket.on('nuevoUsuario',email=>{
    Swal.fire({
        text:`${email} se ha conectado...!!!`,
        toast:true,
        position:"top-right"
        })
    })
socket.on('llegoMensaje',mensaje=>{
        let txt=''
        txt+=`<p class="mensaje"><strong>${mensaje.email}: </strong><i>${mensaje.message}</i></p><br>`
        
        txt.toString();
        divMensajes.innerHTML+=txt;
        divMensajes.scrollTop=divMensajes.scrollHeight;
    });
    
socket.on('usuarioDesconectado', usuario=>{
    Swal.fire({
        text:`${usuario.email} se ha desconectado...!!!`,
        toast:true,
        position:"top-right"
        })
    })