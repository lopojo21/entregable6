const socket= io();

// const cargaCelulares=()=>{
//     fetch('/realTimeProducts')
//     .then(data=>{
//         return data.json()
//     })
//     .then(producto=>{
//         let ul=''
//         producto.forEach(producto=>{
//             ul+=`<li>${producto.marca}</li>`+
//                 `<li>${producto.modelo}</li>`+
//                 `<li>${producto.precio}</li>`+
//                 `<li>${producto.id}</li>`+'<br>'
//         })
//         let ulProd=document.getElementById('celulares')
//         ulProd.innerHTML=ul
//     }) 
// };
// socket.on('newProduct',(producto, productos)=>{
    
//         console.log(`se dio de alta a ${producto.modelo}`)
//         cargaCelulares();
// })

// socket.on('deleteProduct',(producto, productos)=>{
    
//     console.log(`se dio de baja a ${producto.modelo}`)
//     cargaCelulares();
// })





// cargaCelulares();