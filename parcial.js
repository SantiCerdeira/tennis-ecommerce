'use strict';

/*
 *  CERDEIRA
 */

// Variables
const d = document;
const divProductos = d.getElementById('productos');
const btnAdd = d.querySelectorAll('.add');
const filtros = d.querySelectorAll('#filtros a');
const itemsAgregados = d.getElementById('minicarrito').firstElementChild.firstElementChild;
const precioTotal = d.getElementById('minicarrito').firstElementChild.nextElementSibling.firstElementChild;
const body = d.querySelector('body');
const btnCarrito = d.querySelector('#carrito');
const banner = d.querySelector('#banner');


let carrito = {
    prodIds : [],
    cantidades : [],
    total : 0,
};

let productos = [
    {
        id: 1,
        nombre: 'Raqueta Babolat',
        descripcion: 'Raqueta de tenis Babolat azul y negra tamaño adulto',
        precio: 11000,
        imagen: 'img/raqueta-babolat.jpeg',
        imagen2: 'img/raqueta-babolat-2.jpeg',
        imagen3:  'img/raqueta-babolat-3.jpeg',
        categoria: 1,
        fondo: 'img/imagen-fondo.png',
    },
    {
        id: 2,
        nombre: 'Remera Nike',
        descripcion: 'Remera deportiva Nike color negro',
        precio: 7000,
        imagen: 'img/remera-nike.jpeg',
        imagen2: 'img/remera-nike-2.jpeg',
        imagen3: 'img/remera-nike-3.jpeg',
        categoria: 2,
    },
    {
        id: 3,
        nombre: 'Tubo de Pelotas Wilson',
        descripcion: 'Tubo de 3 pelotas de tenis marca Wilson',
        precio: 1500,
        imagen: 'img/tubo-pelotas-wilson.jpeg',
        imagen2: 'img/tubo-pelotas-wilson-2.jpeg',
        imagen3: 'img/tubo-pelotas-wilson-3.jpeg',
        categoria: 3,
    },
    {
        id: 4,
        nombre: 'Short Nike',
        descripcion: 'Short deportivo Nike color negro',
        precio: 9500,
        imagen: 'img/short-nike.jpeg',
        imagen2: 'img/short-nike-2.jpeg',
        imagen3: 'img/short-nike-3.jpeg',
        categoria: 2,
    },
    {
        id: 5,
        nombre: 'Tubo de pelotas Head',
        descripcion: 'Tubo de 3 pelotas de tenis marca Head',
        precio: 1400,
        imagen: 'img/tubo-pelotas-head.jpeg',
        imagen2: 'img/tubo-pelotas-head-2.jpeg',
        imagen3: 'img/tubo-pelotas-head-3.jpeg',
        categoria: 3,
    },
    {
        id: 6,
        nombre: 'Raqueta Wilson',
        descripcion: 'Raqueta de tenis marca Wilson negra y azul tamaño adulto',
        precio: 12000,
        imagen: 'img/raqueta-wilson.jpeg',
        imagen2: 'img/raqueta-wilson-2.jpg',
        imagen3: 'img/raqueta-wilson-3.jpeg',
        categoria: 1,
    },
    {
        id: 7,
        nombre: 'Tubo de pelotas Penn',
        descripcion: 'Tubo de 3 pelotas de tenis marca Penn',
        precio: 1200,
        imagen: 'img/tubo-pelotas-penn.jpeg',
        imagen2: 'img/tubo-pelotas-penn-2.jpeg',
        imagen3: 'img/tubo-pelotas-penn-3.jpeg',
        categoria: 3,
    },
    {
        id: 8,
        nombre: 'Zapatillas Nike',
        descripcion: 'Zapatillas deportivas Nike color negro',
        precio: 10000,
        imagen: 'img/zapatilla-nike.jpeg',
        imagen2: 'img/zapatilla-nike-2.jpeg',
        imagen3: 'img/zapatilla-nike-3.jpeg',
        categoria: 2,
    },
    {
        id: 9,
        nombre: 'Raqueta Head',
        descripcion: 'Raqueta de tenis marca Head negra y blanco tamaño adulto',
        precio: 12500,
        imagen: 'img/raqueta-head.png',
        imagen2: 'img/raqueta-head-2.jpeg',
        imagen3: 'img/raqueta-head-3.jpeg',
        categoria: 1,
    },
];

let mostrarEnVivo = () => {
    itemsAgregados.innerHTML = carrito.cantidades.reduce((acum, n) => acum + n, 0);
    precioTotal.innerHTML = carrito.total;
    localStorage.total = carrito.total;
    localStorage.itemsAgregados = carrito.cantidades.reduce((acum, n) => acum + n, 0);
}

// Creo los divs que irán dentro del div#productos
let crearProducto = () => {
    for (let producto of productos) {
    //Creo el div contendedor de cada producto que contiene la imagen
    let div1 = d.createElement('div');
    let img = d.createElement('img');
    img.src = producto.imagen;
    img.alt = producto.nombre;
    img.style.cssText = ('border-radius:20px;')
    img.addEventListener('click', (e) => {
        let div = d.createElement('div');
        div.className = ('modal');
        div.id = ('modalProducto');

        let cerrar = d.createElement('a');
        cerrar.className = ('cerrar');
        cerrar.href = ('javascript:void(0)');
        cerrar.innerHTML = ('X');
        cerrar.addEventListener ('click', (e) => {
            d.getElementById('modalProducto').remove();
        })
        div.append(cerrar);

        window.addEventListener ('keydown', (e) =>{
            if (e.key == 'Escape'){
                d.getElementById('modalProducto').remove();
            }
        });

        let imagencita = d.createElement('img');
        imagencita = e.target.cloneNode();
        imagencita.style.cssText = ('margin-top:10rem; width:450px; height:450px; border-radius : 20px;')
        div.append(imagencita);

        let divImgs = d.createElement('div');
        divImgs.id = ('galeria');
        divImgs.style.margin = ('1rem')
        let img1 = d.createElement('img');
        img1.src = producto.imagen;
        img1.style.cssText = ('width: 100px; height: 100px; border-radius: 5px; margin: 5px 1rem;');
        img1.addEventListener('click', (e) =>{
            imagencita.src = producto.imagen;
        });
        divImgs.append(img1);
        let img2 = d.createElement('img');
        img2.src = producto.imagen2;
        img2.style.cssText = ('width: 100px; height: 100px; border-radius: 5px; margin: 5px 1rem;');
        img2.addEventListener('click', (e) =>{
            imagencita.src = producto.imagen2;
        });
        divImgs.append(img2);
        let img3 = d.createElement('img');
        img3.src = producto.imagen3;
        img3.style.cssText = ('width: 100px; height: 100px; border-radius: 5px; margin: 5px 1rem;');
        img3.addEventListener('click', (e) =>{
            imagencita.src = producto.imagen3;
        });
        divImgs.append(img3);
        div.append(divImgs);

        window.addEventListener ('keydown', (e) =>{
            if (e.key == 'ArrowRight' && imagencita.src == img1.src){
                    imagencita.src = img2.src;
            } else if (e.key == 'ArrowRight' && imagencita.src == img2.src){
                imagencita.src = img3.src;
            }
            else if (e.key == 'ArrowRight' && imagencita.src == img3.src){
                imagencita.src = img1.src;
            }

            if (e.key == 'ArrowLeft' && imagencita.src == img1.src){
                imagencita.src = img3.src;
            } else if (e.key == 'ArrowLeft' && imagencita.src == img3.src){
                imagencita.src = img2.src;
            }
            else if (e.key == 'ArrowLeft' && imagencita.src == img2.src){
                imagencita.src = img1.src;
            }
        });

        let titulo = d.createElement('h3');
        titulo.innerHTML = producto.nombre;        
        div.append(titulo);
        
        let precio = d.createElement('p');
        precio.innerHTML = `$ ${producto.precio}`;
        div.append(precio);

        let descripcion = d.createElement('p');
        descripcion.innerHTML = producto.descripcion;
        descripcion.style.minWidth = ('100%');
        div.append(descripcion);

        let categoria = d.createElement('p');
        if (producto.categoria == 1) {
            categoria.innerHTML = 'Categoría: Raquetas';
        } else if (producto.categoria == 2) {
            categoria.innerHTML = 'Categoría: Indumentaria';
        } else {
            categoria.innerHTML = 'Categoría: Pelotas';
        }
        div.append(categoria);

        let boton = d.createElement('button');
        boton.dataset.id = producto.id;
        boton.dataset.precio = producto.precio;
        boton.dataset.cat = producto.categoria;
        boton.className = 'add';
        boton.addEventListener ('click', (e) => {
            let idProducto = +e.target.dataset.id; 
            let precioProducto = +e.target.dataset.precio;
            let indiceProducto = carrito.prodIds.indexOf(idProducto);
            if (indiceProducto == -1) {
                carrito.prodIds.push(idProducto);
                carrito.cantidades.push(1);
            } else {
                carrito.cantidades[indiceProducto]++;
            }
            carrito.total += precioProducto;
            mostrarEnVivo();
        })
        boton.innerHTML = 'Agregar al carrito';
        div.append(boton); 

        body.append(div);

        window.addEventListener('keypress', (e) => {
             d.getElementById('modalProducto').remove();
        })
    })
    div1.append(img);
    
    // Creo el segundo div que es el que contiene la información y el botón
    let div2 = d.createElement('div');
    let titulo = d.createElement('h3');
    titulo.innerHTML = producto.nombre;
    div2.append(titulo);

    let descripcion = d.createElement('p');
    descripcion.innerHTML = producto.descripcion;
    div2.append(descripcion);

    let precio = d.createElement('p');
    precio.innerHTML = `$ ${producto.precio}`;
    div2.append(precio);

    let categoria = d.createElement('p');
        if (producto.categoria == 1) {
            categoria.innerHTML = 'Categoría: Raquetas';
        } else if (producto.categoria == 2) {
            categoria.innerHTML = 'Categoría: Indumentaria';
        } else {
            categoria.innerHTML = 'Categoría: Pelotas';
        }
    div2.append(categoria);

    let boton = d.createElement('button');
    boton.dataset.id = producto.id;
    boton.dataset.precio = producto.precio;
    boton.dataset.cat = producto.categoria;
    boton.className = 'add';
    boton.addEventListener ('click', (e) => {
        let idProducto = +e.target.dataset.id; 
        let precioProducto = +e.target.dataset.precio;
        let indiceProducto = carrito.prodIds.indexOf(idProducto);
        if (indiceProducto == -1) {
            carrito.prodIds.push(idProducto);
            carrito.cantidades.push(1);
        } else {
            carrito.cantidades[indiceProducto]++;
        }
        carrito.total += precioProducto;
        mostrarEnVivo();
    })
    boton.innerHTML = 'Agregar al carrito';
    div2.append(boton);
    div2.style.cssText = ('display:flex; flex-direction:column;')
    div1.append(div2);
    
    div1.className = ('col-10 col-lg-3 mx-lg-2 mb-3 py-3 px-2 border border-dark border-2 rounded-3 colo m-3 color');
    divProductos.append(div1);
    divProductos.className = ('d-flex flex-wrap row justify-content-evenly m-0 p-3');
    }
}
crearProducto();


// Filtros de categorias
for (let filtro of filtros) {
    filtro.addEventListener ('click', (e) => {
        let catId = +e.target.dataset.cat;
        divProductos.innerHTML = '';
        banner.innerHTML = '';

        if (catId != 0) {
            for (let producto of productos) {
                if (catId == producto.categoria) {
                //Creo el div contendedor de cada producto que contiene la imagen
                let div1 = d.createElement('div');
                let img = d.createElement('img');
                img.src = producto.imagen;
                img.alt = producto.nombre;
                img.style.cssText = ('border-radius:20px;')
                img.addEventListener('click', (e) => {
                    let div = d.createElement('div');
                    div.className = ('modal');
                    div.id = ('modalProducto');
            
                    let cerrar = d.createElement('a');
                    cerrar.className = ('cerrar');
                    cerrar.href = ('javascript:void(0)');
                    cerrar.innerHTML = ('X');
                    cerrar.addEventListener ('click', (e) => {
                        d.getElementById('modalProducto').remove();
                    })
                    div.append(cerrar);
            
                    let imagencita = d.createElement('img');
                    imagencita = e.target.cloneNode();
                    imagencita.style.cssText = ('margin-top:10rem; width:450px; height:450px; border-radius : 20px;')
                    div.append(imagencita);

                    let divImgs = d.createElement('div');
                    divImgs.id = ('galeria');
                    divImgs.style.margin = ('1rem')
                    let img1 = d.createElement('img');
                    img1.src = producto.imagen;
                    img1.style.cssText = ('width: 100px; height: 100px; border-radius: 5px; margin: 5px 1rem;');
                    img1.addEventListener('click', (e) =>{
                        imagencita.src = producto.imagen;
                    });
                    divImgs.append(img1);
                    let img2 = d.createElement('img');
                    img2.src = producto.imagen2;
                    img2.style.cssText = ('width: 100px; height: 100px; border-radius: 5px; margin: 5px 1rem;');
                    img2.addEventListener('click', (e) =>{
                        imagencita.src = producto.imagen2;
                    });
                    divImgs.append(img2);
                    let img3 = d.createElement('img');
                    img3.src = producto.imagen3;
                    img3.style.cssText = ('width: 100px; height: 100px; border-radius: 5px; margin: 5px 1rem;');
                    img3.addEventListener('click', (e) =>{
                        imagencita.src = producto.imagen3;
                    });
                    divImgs.append(img3);
                    div.append(divImgs);

                    window.addEventListener ('keydown', (e) =>{
                        if (e.key == 'ArrowRight' && imagencita.src == img1.src){
                                imagencita.src = img2.src;
                        } else if (e.key == 'ArrowRight' && imagencita.src == img2.src){
                            imagencita.src = img3.src;
                        }
                        else if (e.key == 'ArrowRight' && imagencita.src == img3.src){
                            imagencita.src = img1.src;
                        }
            
                        if (e.key == 'ArrowLeft' && imagencita.src == img1.src){
                            imagencita.src = img3.src;
                        } else if (e.key == 'ArrowLeft' && imagencita.src == img3.src){
                            imagencita.src = img2.src;
                        }
                        else if (e.key == 'ArrowLeft' && imagencita.src == img2.src){
                            imagencita.src = img1.src;
                        }
                    });

                    let titulo = d.createElement('h3');
                    titulo.innerHTML = producto.nombre;        
                    div.append(titulo);
                    
                    let precio = d.createElement('p');
                    precio.innerHTML = `$ ${producto.precio}`;
                    div.append(precio);
            
                    let descripcion = d.createElement('p');
                    descripcion.innerHTML = producto.descripcion;
                    descripcion.style.minWidth = ('100%');
                    div.append(descripcion);
            
                    let categoria = d.createElement('p');
                    if (producto.categoria == 1) {
                        categoria.innerHTML = 'Categoría: Raquetas';
                    } else if (producto.categoria == 2) {
                        categoria.innerHTML = 'Categoría: Indumentaria';
                    } else {
                        categoria.innerHTML = 'Categoría: Pelotas';
                    }
                    div.append(categoria);
            
                    let boton = d.createElement('button');
                    boton.dataset.id = producto.id;
                    boton.dataset.precio = producto.precio;
                    boton.dataset.cat = producto.categoria;
                    boton.className = 'add';
                    boton.addEventListener ('click', (e) => {
                        let idProducto = +e.target.dataset.id; 
                        let precioProducto = +e.target.dataset.precio;
                        let indiceProducto = carrito.prodIds.indexOf(idProducto);
                        if (indiceProducto == -1) {
                            carrito.prodIds.push(idProducto);
                            carrito.cantidades.push(1);
                        } else {
                            carrito.cantidades[indiceProducto]++;
                        }
                        carrito.total += precioProducto;
                        mostrarEnVivo();
                    })
                    boton.innerHTML = 'Agregar al carrito';
                    div.append(boton); 
            
                    body.append(div);
                })
                div1.append(img);
                
                // Creo el segundo div que es el que contiene la información y el botón
                let div2 = d.createElement('div');
                let titulo = d.createElement('h3');
                titulo.innerHTML = producto.nombre;
                div2.append(titulo);
            
                let descripcion = d.createElement('p');
                descripcion.innerHTML = producto.descripcion;
                div2.append(descripcion);
            
                let precio = d.createElement('p');
                precio.innerHTML = `$ ${producto.precio}`;
                div2.append(precio);
            
                let categoria = d.createElement('p');
                    if (producto.categoria == 1) {
                        categoria.innerHTML = 'Categoría: Raquetas';
                    } else if (producto.categoria == 2) {
                        categoria.innerHTML = 'Categoría: Indumentaria';
                    } else {
                        categoria.innerHTML = 'Categoría: Pelotas';
                    }
                div2.append(categoria);
            
                let boton = d.createElement('button');
                boton.dataset.id = producto.id;
                boton.dataset.precio = producto.precio;
                boton.dataset.cat = producto.categoria;
                boton.className = 'add';
                boton.addEventListener ('click', (e) => {
                    let idProducto = +e.target.dataset.id; 
                    let precioProducto = +e.target.dataset.precio;
                    let indiceProducto = carrito.prodIds.indexOf(idProducto);
                    if (indiceProducto == -1) {
                        carrito.prodIds.push(idProducto);
                        carrito.cantidades.push(1);
                    } else {
                        carrito.cantidades[indiceProducto]++;
                    }
                    carrito.total += precioProducto;
                    mostrarEnVivo();
                })
                boton.innerHTML = 'Agregar al carrito';
                div2.append(boton);
                div2.style.cssText = ('display:flex; flex-direction:column;')
                div1.append(div2);
                
                div1.className = ('col-10 col-lg-3 mx-lg-2 mb-3 py-3 px-2 border border-dark border-2 rounded-3 colo m-3 color');
                divProductos.append(div1);
                divProductos.className = ('col-12 d-flex flex-wrap row justify-content-evenly m-0 p-3');
            }
        } 
    } else {
        crearProducto();
    }

    if (catId == 1) {
        let a = d.createElement('a');
        a.id = 'bannercito';
        a.href = '#productos';
        let imagen = d.createElement('img');
        imagen.src = 'img/Nadal_banner.jpg';
        imagen.className = ('col-12 mt-5');
        a.append(imagen);
        banner.append(a);
        
        setTimeout (function() {
            d.getElementById('bannercito').remove();
        }, 10000);
    } else if (catId == 2) {
        let a = d.createElement('a');
        a.id = 'bannercito';
        a.href = '#productos';
        let imagen = d.createElement('img');
        imagen.src = 'img/djokovic.jpg';
        imagen.className = ('col-12 mt-5');
        a.append(imagen);
        banner.append(a);
        
        setTimeout (function() {
            d.getElementById('bannercito').remove();
        }, 10000);
    } else if (catId == 3) {
        let a = d.createElement('a');
        a.id = 'bannercito';
        a.href = '#productos';
        let imagen = d.createElement('img');
        imagen.src = 'img/pelota-tenis.jpg';
        imagen.className = ('col-12 mt-5');
        a.append(imagen);
        banner.append(a);
        
        setTimeout (function() {
            d.getElementById('bannercito').remove();
        }, 10000);
        }
})}

let crearModal = () => {
    let div = d.createElement('div');
    div.className = ('modal');
    div.id = ('modalCarrito');

    let cerrar = d.createElement('a');
        cerrar.className = ('cerrar');
        cerrar.href = ('javascript:void(0)');
        cerrar.innerHTML = ('X');
        cerrar.addEventListener ('click', (e) => {
            d.getElementById('modalCarrito').remove();
        })
    div.append(cerrar);

    window.addEventListener ('keydown', (e) =>{
        if (e.key == 'Escape'){
            d.getElementById('modalCarrito').remove();
        }
    });

    let p = d.createElement('p');
    p.innerHTML = `Items: `
    
    let spanItems = d.createElement('span');
    spanItems.innerHTML = carrito.cantidades.reduce((acum, n) => acum + n, 0);
    p.append(spanItems);

    p.innerHTML += ` - Total: $`;

    let spanTotal = d.createElement('span');
    spanTotal.innerHTML = carrito.total;
    p.append(spanTotal);
    
    div.append(p);

    let hr = d.createElement('hr');
    div.append(hr);

    
    if (carrito.total == 0) {
        let vacio = d.createElement('p');
        vacio.innerHTML = 'El carrito está vacío';
        div.append(vacio);
        // return;
    }
    
    let ul = d.createElement('ul');
    
    carrito.prodIds.forEach ((productoId, indice) => {
        let li = d.createElement('li');
        
        let infoProducto = productos.filter((producto => producto.id == productoId))[0];
        li.innerHTML = `${infoProducto.nombre} `;

        let spanPrecio = d.createElement('span');
        spanPrecio.innerHTML = `$${infoProducto.precio}`;
        li.append(spanPrecio);

        let spanCantidad = d.createElement('span');
        spanCantidad.innerHTML = `${carrito.cantidades[indice]} items`;
        li.append(spanCantidad);

        let subtotal = d.createElement('span');
        subtotal.innerHTML = `Subtotal: $${infoProducto.precio*carrito.cantidades[indice]}`;
        li.append(subtotal);
        
        let a = d.createElement('a');
        a.href = '#';
        a.innerHTML = '-';
        a.dataset.id = infoProducto.id;
        a.dataset.precio = infoProducto.precio;
        
        a.addEventListener('click', (e) => {
            let idDelProducto = +e.target.dataset.id;
            let precioDelProducto = +e.target.dataset.precio;
            let indiceDelProducto = carrito.prodIds.indexOf(idDelProducto);
            if (indiceDelProducto != -1) {
                if (carrito.cantidades[indiceDelProducto] > 0){
                    spanCantidad.innerHTML = `${carrito.cantidades[indice]-1} items`;
                    carrito.cantidades[indiceDelProducto]--;
                    carrito.total -= precioDelProducto;
                    a.href = '#';
                    a.innerHTML = '-';
                    a.dataset.id = infoProducto.id;
                    a.dataset.precio = infoProducto.precio;
                    subtotal.innerHTML = `Subtotal: $${infoProducto.precio*carrito.cantidades[indice]}`;
                    mostrarEnVivo();
                    p.innerHTML = `Items: `
                    
                    spanItems.innerHTML = carrito.cantidades.reduce((acum, n) => acum + n, 0);
                    p.append(spanItems);
                    
                    p.innerHTML += ` - Total: $`;
                    
                    spanTotal.innerHTML = carrito.total;
                    p.append(spanTotal);
                }
                if (carrito.cantidades[indiceDelProducto] == 0){
                    e.preventDefault();
                    carrito.prodIds.splice(indiceDelProducto, 1);
                    carrito.cantidades.splice(indiceDelProducto, 1);
                    li.remove();
                    mostrarEnVivo();
                    p.innerHTML = `Items: `
                    
                    spanItems.innerHTML = carrito.cantidades.reduce((acum, n) => acum + n, 0);
                    p.append(spanItems);
                    
                    p.innerHTML += ` - Total: $`;
                    
                    spanTotal.innerHTML = carrito.total;
                    p.append(spanTotal);
                }
            }
            if (carrito.total == 0) {
                let vacio = d.createElement('p');
                vacio.innerHTML = 'El carrito está vacío';
                ul.append(vacio);
            }
            if (carrito.prodIds.length == 1) {
                spanCantidad.innerHTML = `${carrito.cantidades.reduce((acum, n) => acum + n, 0)} items`;
            }
        })
        li.append(a);
        ul.append(li);
        div.append(ul);



    let aSumar = d.createElement('a');
    aSumar.href = '#';
    aSumar.innerHTML = '+';
    aSumar.dataset.id = infoProducto.id;
    a.dataset.precio = infoProducto.precio;

    aSumar.addEventListener('click', (e) => {
        let idDelProducto = +e.target.dataset.id;
        let precioDelProducto = +e.target.dataset.precio;
        let indiceDelProducto = carrito.prodIds.indexOf(idDelProducto);
        if (indiceDelProducto != -1) {
            if (carrito.cantidades[indiceDelProducto] > 0){
                spanCantidad.innerHTML = `${carrito.cantidades[indice]+1} items`;
                carrito.cantidades[indiceDelProducto]++;
                carrito.total += infoProducto.precio;
                aSumar.href = '#';
                aSumar.innerHTML = '+';
                aSumar.dataset.id = infoProducto.id;
                aSumar.dataset.precio = infoProducto.precio;
                subtotal.innerHTML = `Subtotal: $${infoProducto.precio*carrito.cantidades[indice]}`;
                mostrarEnVivo();
                p.innerHTML = `Items: `
                
                spanItems.innerHTML = carrito.cantidades.reduce((acum, n) => acum + n, 0);
                p.append(spanItems);
                
                p.innerHTML += ` - Total: $`;
                
                spanTotal.innerHTML = carrito.total;
                p.append(spanTotal);
                console.log(idDelProducto);
            }
        }
        if (carrito.prodIds.length == 1) {
            spanCantidad.innerHTML = `${carrito.cantidades.reduce((acum, n) => acum + n, 0)} items`;
        }
    })
    li.append(aSumar);
    ul.append(li);
    div.append(ul);

    let eliminar = d.createElement('a');
    eliminar.href = '#';
    eliminar.innerHTML = 'Eliminar';
    eliminar.dataset.id = infoProducto.id;
    eliminar.dataset.precio = infoProducto.precio;

    eliminar.addEventListener('click', (e) => {
        let idDelProducto = +e.target.dataset.id;
        let precioDelProducto = +e.target.dataset.precio;
        let indiceDelProducto = carrito.prodIds.indexOf(idDelProducto);
        if (indiceDelProducto != -1) {
            if (carrito.cantidades[indiceDelProducto] > 0){
                e.preventDefault();
                    let precioTotal = infoProducto.precio*carrito.cantidades[carrito.prodIds.indexOf(idDelProducto)];
                    carrito.total -= precioTotal;
                    carrito.prodIds.splice(indiceDelProducto, 1);
                    carrito.cantidades.splice(indiceDelProducto, 1);
                    li.remove();
                    mostrarEnVivo();
                    p.innerHTML = `Items: `
                    
                    spanItems.innerHTML = carrito.cantidades.reduce((acum, n) => acum + n, 0);
                    p.append(spanItems);
                    
                    p.innerHTML += ` - Total: $`;
                    
                    spanTotal.innerHTML = carrito.total;
                    p.append(spanTotal);
            }
        }
        if (carrito.total == 0){
            let vacio = d.createElement('p');
            vacio.innerHTML = 'El carrito está vacío';
            ul.append(vacio);
        }
    });

    li.append(eliminar);
    ul.append(li);
    div.append(ul);
    })

        
    let botonVaciar = d.createElement('button');
    botonVaciar.innerHTML = 'Vaciar carrito';
    botonVaciar.addEventListener ('click', (e) =>{
        carrito.prodIds = [];
        carrito.cantidades = [];
        carrito.total = 0;
        p.innerHTML = `Items: `
        
        spanItems.innerHTML = carrito.cantidades.reduce((acum, n) => acum + n, 0);
        p.append(spanItems);

        p.innerHTML += ` - Total: $`;

        spanTotal.innerHTML = carrito.total;
        p.append(spanTotal);

        ul.innerHTML = '';

        if (carrito.total == 0) {
            let vacio = d.createElement('p');
            vacio.innerHTML = 'El carrito está vacío';
            ul.append(vacio);
        }

        mostrarEnVivo();
        })
        div.append(botonVaciar);

        let botonCheckout = d.createElement('button');
        botonCheckout.innerHTML = 'Pasar al checkout';
        div.append(botonCheckout);

        botonCheckout.addEventListener('click', (e) =>{
            let div = d.createElement('div');
            div.className = ('modal');
            div.id = ('modalCompra');

            let cerrar = d.createElement('a');
            cerrar.className = ('cerrar');
            cerrar.href = ('javascript:void(0)');
            cerrar.innerHTML = ('X');
            cerrar.addEventListener ('click', (e) => {
            d.getElementById('modalCompra').remove();
        })
        div.append(cerrar);

        window.addEventListener ('keydown', (e) =>{
            if (e.key == 'Escape'){
                d.getElementById('modalCompra').remove();
            }
        });

        let divForm = d.createElement('div');
        divForm.id = ('formulario');


        let cliente = d.createElement('h2');
        cliente.innerHTML = 'Información del cliente';
        cliente.style.color = 'white';
        divForm.append(cliente);

        let nombre = d.createElement('label');
        nombre.innerHTML = 'Nombre:';
        nombre.style.color = 'white';
        divForm.append(nombre);

        let nombre2 = d.createElement('textarea');
        nombre2.placeholder = 'Ingrese su nombre';
        divForm.append(nombre2);

        let errorNombre = d.createElement('p');
        errorNombre.innerHTML = 'Este campo es obligatorio'
        errorNombre.className = ('fs-3 text-white fw-bold d-none');
        divForm.append(errorNombre);

        let telefono = d.createElement('label');
        telefono.innerHTML = 'Telefono:';
        telefono.style.color = 'white';
        divForm.append(telefono);

        let telefono2 = d.createElement('input');
        telefono2.type = 'number';
        telefono2.placeholder = 'Ingrese su número de telefono';
        divForm.append(telefono2);

        let errorTelefono = d.createElement('p');
        errorTelefono.innerHTML = 'Este campo es obligatorio'
        errorTelefono.className = ('fs-3 text-white fw-bold d-none');
        divForm.append(errorTelefono);

        let email = d.createElement('label');
        email.innerHTML = 'Email:';
        email.style.color = 'white';
        divForm.append(email);

        let email2 = d.createElement('input');
        email2.type = 'email';
        email2.placeholder = 'Ingrese su email';
        divForm.append(email2);

        let errorEmail = d.createElement('p');
        errorEmail.innerHTML = 'Este campo es obligatorio'
        errorEmail.className = ('fs-3 text-white fw-bold d-none');
        divForm.append(errorEmail);

        let lugar = d.createElement('label');
        lugar.innerHTML = 'Dirección de entrega:';
        lugar.style.color = 'white';
        divForm.append(lugar);

        let lugar2 = d.createElement('textarea');
        lugar2.placeholder = 'Ingrese el destino del envío';
        divForm.append(lugar2);

        let errorLugar = d.createElement('p');
        errorLugar.innerHTML = 'Este campo es obligatorio'
        errorLugar.className = ('fs-3 text-white fw-bold d-none');
        divForm.append(errorLugar);

        let fecha = d.createElement('label');
        fecha.innerHTML = 'Fecha de entrega:';
        fecha.style.color = 'white';
        divForm.append(fecha);

        let fecha2 = d.createElement('input');
        fecha2.type = 'date';
        fecha2.placeholder = 'Ingrese la fecha del envío';
        divForm.append(fecha2);

        let errorFecha = d.createElement('p');
        errorFecha.innerHTML = 'Este campo es obligatorio'
        errorFecha.className = ('fs-3 text-white fw-bold d-none');
        divForm.append(errorFecha);

        let pago = d.createElement('h2');
        pago.innerHTML = 'Información del pago';
        pago.style.color = 'white';
        divForm.append(pago);

        let metodo = d.createElement('label');
        metodo.innerHTML = 'Método de pago:';
        metodo.style.color = 'white';
        divForm.append(metodo);

        let metodo2 = d.createElement('select');
        metodo2.placeholder = 'Ingrese el método de pago';
        let opcion1 = d.createElement('option');
        opcion1.innerHTML = 'Tarjeta de crédito / débito';
        metodo2.append(opcion1);
        let opcion2 = d.createElement('option');
        opcion2.innerHTML = 'Paypal';
        metodo2.append(opcion2);
        let opcion3 = d.createElement('option');
        opcion3.innerHTML = 'Transferencia';
        metodo2.append(opcion3);
        let opcion4 = d.createElement('option');
        opcion4.innerHTML = 'Bitcoin';
        metodo2.append(opcion4);
        divForm.append(metodo2);


        let cuotas = d.createElement('label');
        cuotas.innerHTML = 'Cantidad de cuotas:';
        cuotas.style.color = 'white';
        divForm.append(cuotas);

        let cuotas2 = d.createElement('select');
        cuotas2.placeholder = 'Ingrese el método de pago';
        let opcion5 = d.createElement('option');
        opcion5.innerHTML = `1 cuota de $${(carrito.total/1).toFixed(2)}`;
        cuotas2.append(opcion5);
        let opcion6 = d.createElement('option');
        opcion6.innerHTML = `3 cuotas de $${(carrito.total/3).toFixed(2)}`;
        cuotas2.append(opcion6);
        let opcion7 = d.createElement('option');
        opcion7.innerHTML = `6 cuotas de $${(carrito.total/6).toFixed(2)}`;
        cuotas2.append(opcion7);
        let opcion8 = d.createElement('option');
        opcion8.innerHTML = `12 cuotas de $${(carrito.total/12).toFixed(2)}`;
        cuotas2.append(opcion8);
        divForm.append(cuotas2);

        
        div.append(divForm);
        
        let confirmar = d.createElement('button');
        confirmar.innerHTML = 'Confirmar compra';
        div.append(confirmar);

        confirmar.addEventListener('click', (e) =>{
            confirmar.className = ('mt-5')
            let error1, error2, error3, error4, error5;
            if (nombre2.value.length == 0) {
                nombre2.style.backgroundColor = 'rgba(238, 124, 104, 0.982)';
                errorNombre.className = ('fs-3 text-white fw-bold d-block')
            } else {
                nombre2.style.backgroundColor = 'white';
                error1 = false;
                errorNombre.className = ('d-none')
            }
            if (telefono2.value.length == 0) {
                telefono2.style.backgroundColor = 'rgba(238, 124, 104, 0.982)';
                errorTelefono.className = ('fs-3 text-white fw-bold d-block')
            } else {
                telefono2.style.backgroundColor = 'white';
                error2 = false;
                errorTelefono.className = ('d-none')
            }
            if (email2.value.length == 0) {
                email2.style.backgroundColor = 'rgba(238, 124, 104, 0.982)';
                errorEmail.className = ('fs-3 text-white fw-bold d-block')
            } else {
                email2.style.backgroundColor = 'white';
                error3 = false;
                errorEmail.className = ('d-none')
            }
            if (lugar2.value.length == 0) {
                lugar2.style.backgroundColor = 'rgba(238, 124, 104, 0.982)';
                errorLugar.className = ('fs-3 text-white fw-bold d-block')
            } else {
                lugar2.style.backgroundColor = 'white';
                error4 = false;
                errorLugar.className = ('d-none')
            }
            if (fecha2.value.length == 0) {
                fecha2.style.backgroundColor = 'rgba(238, 124, 104, 0.982)';
                errorFecha.className = ('fs-3 text-white fw-bold d-block')
            } else {
                fecha2.style.backgroundColor = 'white';
                error5 = false;
                errorFecha.className = ('d-none')
            }

            if (error1 == false && error2 == false && error3 == false && error4 == false && error5 == false) {
            let gracias = d.createElement('div');
            gracias.className = ('modal');
            div.id = ('modalAgradecimiento');

            let confirmacion = d.createElement('div');
            confirmacion.id = ('confirmacion');

            let titulo = d.createElement('h2');
            titulo.innerHTML = 'Muchas gracias por tu compra!';
            confirmacion.append(titulo);

            let emoji = d.createElement('span');
            emoji.innerHTML = '😀';
            emoji.style.fontSize = '20rem';
            emoji.style.textAlign = 'center';
            confirmacion.append(emoji);

            carrito.prodIds = [];
            carrito.cantidades = [];
            carrito.total = 0;

            let volver = d.createElement('button');
            volver.innerHTML = 'Volver a la tienda';
            confirmacion.append(volver);
            
            volver.addEventListener('click', (e) => {
                window.location.reload();
            });

            gracias.append(confirmacion);
            body.append(gracias);
         }
        });

        body.append(div);
        });

    body.append(div);
}

btnCarrito.addEventListener('click', crearModal);

