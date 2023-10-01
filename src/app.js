import __dirname from './utils.js';
import path from 'path';
import express from 'express';
import {engine} from 'express-handlebars';
import mongoose from 'mongoose';
import{productoRouter} from './routes/productoRouter.js'
import{carRouter} from './routes/carRouter.js'
import { messageModelo } from './daos/models/messagesModelo.js';
import {Server} from 'socket.io'
const PORT=3000;

const app=express();

app.engine('handlebars', engine({

}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname,'./views'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'./public')));

app.use('/api/productos',productoRouter);
app.use('/api/cars',carRouter);

// app.get('/',(req,res)=>{
//     res.setHeader('Content-Type','text/html');
//     res.status(200).render('realTimeProducts');
// })
app.get('/chat',(req,res)=>{
    res.setHeader('Content-Type','text/html');
    res.status(200).render('chat');
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

export const io= new Server(server)


let usuarios= [];
let dbMensaje= []

// const chats =  messageModelo.create({
//     email: usuarios.nombre,
//     message: mensajes           
// });

io.on('connection', socket=>{
    console.log(`Se ha conectado un cliente con id ${socket.id}`)
    
    
    socket.on('id', async email=>{        
    socket.emit('bienvenida', await(messageModelo.find()))
        usuarios.push({
            id: socket.id,
            email
    })
    socket.broadcast.emit('nuevoUsuario', email)

    })
    socket.on('nuevoMensaje',async (mensaje)=>{
        await (messageModelo.create(mensaje))
        console.log(mensaje)    
        io.emit('llegoMensaje',mensaje)
    });


    socket.on('disconnect', function () {
        let indice= usuarios.findIndex(usuario=>usuario.id===socket.id);
        let usuario= usuarios[indice];
    io.emit('usuarioDesconectado', usuario);

    usuarios.splice(indice,1);
        
    });
})
try{
    await mongoose.connect('mongodb+srv://coderhouse:coderhouse@cluster0.v5z515m.mongodb.net/?retryWrites=true&w=majority&dbName=ecommerce')
    console.log('DB Conectada')
}catch(err){
    console.log(`Error al conectarse con el servidor de BD: ${err}`)
};
    