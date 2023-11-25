const shopcontenido = document.getElementById("shopcontenido");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const cantidadCarrito = document.getElementById ("cantidadCarrito");

let carrito= JSON.parse (localStorage.getItem("carrito")) || []; 



const getProducts = async ()=>{
    const response = await fetch ("data.json");
    const data= await response.json ();
    data.forEach((product)=>{
        let content = document.createElement("div");
        content.className= "card";
        content.innerHTML= `
        <img src="${product.img}">
        <h3> ${product.nombre} </h3>
        <p class ="price"> ${product.precio} $</p>
        `;
        shopcontenido.append(content);
        let comprar = document.createElement("button");
        comprar.innerText= "comprar";
        comprar.className="comprar";
    
        content.append(comprar);
        comprar.addEventListener("click", ()=>{
            const repeat = carrito.some((repeatProduct)=> repeatProduct.id === product.id);
                if (repeat) {
                    carrito.map((prod)=>{
                        if (prod.id === product.id) {
                            prod.cantidad++;
                        }
                            
                    });
                } else{
            carrito.push({
                id: product.id,
                img: product.img,
                nombre:product.nombre,
                precio: product.precio,
                cantidad:product.cantidad,
            });
        }
            console.log(carrito);
            carritoCounter();
            saveLocal ();
        });
    
    
    });
     

};
getProducts ();
const saveLocal =()=> {
    localStorage.setItem("carrito", JSON.stringify(carrito));
};

JSON.parse(localStorage.getItem("carrito"))


verCarrito.addEventListener("click", ()=> {
    modalContainer.innerHTML= "";
    modalContainer.style.display="flex";
   const modalHeader= document.createElement ("div");
   modalHeader.className= "modal-header"
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
    `;
    modalContainer.append(carritoContent);
   });
   const total = carrito.reduce((acc, el ) => acc + el.precio, 0);
   const totalBuying = document.createElement("div");
   totalBuying.className= "total-content";
   totalBuying.innerHTML= ` total a pagar : ${total}$`;
   modalContainer.append(totalBuying);

});