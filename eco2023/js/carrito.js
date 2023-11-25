const llenarCarrito = ()=> {
    modalContainer.innerHTML= "";
    modalContainer.style.display="flex";
   const modalHeader= document.createElement ("div");
   modalHeader.className= "modal-header";
   modalHeader.innerHTML=`
   <h1 class="modal-header-title">Carrito.</h1>
   `;
   modalContainer.append(modalHeader);

   const modalButton = document.createElement("h1");
   modalButton.innerText ="x";
   modalButton.className="modal-header-button";

   modalButton.addEventListener("click",() =>{
    modalContainer.style.display = "none";
   });

   modalHeader.append(modalButton);
   
   carrito.forEach((product)=>{
    let carritoContent = document.createElement("div");
   carritoContent.className = "modal-content";
   carritoContent.innerHTML=`
          <img src="${product.img}">
          <h3> ${product.nombre}</h3>
          <p>${product.precio}$</p>
          <span class ="restar"> - </span>
          <p>Cantidad: ${product.cantidad}<p>
          <span class ="sumar"> + </span>
          <p>Total : ${product.cantidad * product.precio}$</p>
     `;
    modalContainer.append(carritoContent);

    let restar= carritoContent.querySelector(".restar");

    restar.addEventListener ("click", () =>{
        if (product.cantidad !==1) {
            product.cantidad--;
        }

        llenarCarrito ();

    
    });


    let sumar= carritoContent.querySelector(".sumar");
    
    sumar.addEventListener ("click", () =>{
            product.cantidad ++;
            llenarCarrito();
    });
   
    

    let eliminar = document.createElement("span");
   eliminar.innerText = "Eliminar";
   eliminar.className= "delete-product";
   carritoContent.append(eliminar);
   eliminar.addEventListener("click",eliminarProducto);
   });
   const total = carrito.reduce((acc, el ) => acc + el.precio * el.cantidad, 0);
   const totalBuying = document.createElement("div");
   totalBuying.className= "total-content";
   totalBuying.innerHTML= ` total a pagar : ${total}$`;
   modalContainer.append(totalBuying);
};
verCarrito.addEventListener("click", llenarCarrito);
const eliminarProducto= ()=>{
    const foundId= carrito.find(( element) => element.id);
carrito =carrito.filter(( carritoId) =>{
    return carritoId !== foundId ;
    });
    carritoCounter();
    saveLocal();
    llenarCarrito();
};
const carritoCounter =()=>{
    cantidadCarrito.style.display= "block";
    cantidadCarrito.innerText = carrito.length;
   const carritoLength = carrito.length;
   localStorage.setItem("carritoLength", JSON.stringify(carritoLength));
   cantidadCarrito.innerText =JSON.parse(localStorage.getItem("carritoLength"));
   
};
carritoCounter();
