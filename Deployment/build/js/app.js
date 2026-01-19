document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
});
 
function iniciarApp() {
    crearGaleria();
    scrollNav();
    navegacionFija();
}

function navegacionFija() {
    const barra = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');
    const body = document.querySelector('body');

    window.addEventListener('scroll', function() {
        if( sobreFestival.getBoundingClientRect().bottom < 90 ) {
            barra.classList.add('fijo');
            body.classList.add('body-scroll');
        } else {
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');
        }
    });
}

function scrollNav() {
    const enlaces = document.querySelectorAll('.navegacion-principal a');

    enlaces.forEach( enlace => {
        enlace.addEventListener('click', function(e) {
            e.preventDefault();

            const seccionScroll = e.target.attributes.href.value;
            const seccion = document.querySelector(seccionScroll);
            seccion.scrollIntoView({behavior: "smooth"});
        });
    });
}
 
function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes');
 
    for (let i = 1; i <= 12; i++) {
        const pictureElement = document.createElement('picture');
        const imagen = document.createElement('img'); // Crear elemento img
 
        // Configurar atributos de la imagen
        imagen.src = `build/img/thumb/${i}.jpg`;
        imagen.alt = `imagen imagen galeria ${i}`;
        imagen.loading = 'lazy';
 
        // Crear y configurar elementos source
        const sourceAvif = document.createElement('source');
        sourceAvif.srcset = `build/img/thumb/${i}.avif`;
        sourceAvif.type = 'image/avif';
 
        const sourceWebp = document.createElement('source');
        sourceWebp.srcset = `build/img/thumb/${i}.webp`;
        sourceWebp.type = 'image/webp';
 
        // Adjuntar elementos source a pictureElement
        pictureElement.appendChild(sourceAvif);
        pictureElement.appendChild(sourceWebp);
 
        // Imagen grande
        imagen.onclick = function() {
            mostrarImagen(i);
        }

        // Adjuntar imagen a pictureElement
        pictureElement.appendChild(imagen);
 
        galeria.appendChild(pictureElement);
    }
}

function mostrarImagen(id) {
    const imagen = document.createElement('picture');
    imagen.innerHTML = `
        <source srcset="build/img/grande/${id}.avif" type="image/avif">
        <source srcset="build/img/grande/${id}.webp" type="image/webp">
        <img loading="lazy" src="src/img/grande/${id}.jpg" alt="Imagen Galeria ${id}">
            
    `;

// Crear el Overlay con la Imagen

    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');
    overlay.onclick = function() {
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }

// Boton para cerrar el Modal

    const cerrarModal = document.createElement('P');
    cerrarModal.textContent = 'X';
    cerrarModal.classList.add('btn-cerrar');
    cerrarModal.onclick = function() {
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }
    overlay.appendChild(cerrarModal);

// Anadir al HTML

    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');
}