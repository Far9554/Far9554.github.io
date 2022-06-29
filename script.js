const ESCAPE = document.getElementById('ESCAPE');
const CUBELETS = document.getElementById('CUBELETS');
const TTD = document.getElementById('TTD');

const Proyectos = document.getElementById('Projects');
const Carrer = document.getElementById('Carrer');
const Skills = document.getElementById('Skills');

ESCAPE.style.display = "none";
CUBELETS.style.display = "none";
TTD.style.display = "none";

function EnseñarProyecto(pro) {
    switch(pro) {
        case "1": 
            ESCAPE.style.display = "block";
            CUBELETS.style.display = "none";
            TTD.style.display = "none";
        break;
        case "2": 
            ESCAPE.style.display = "none";
            CUBELETS.style.display = "block";
            TTD.style.display = "none";
        break;
        case "3": 
            ESCAPE.style.display = "none";
            CUBELETS.style.display = "none";
            TTD.style.display = "block";
        break;
    }
}

Proyectos.style.display = "none";
Carrer.style.display = "none";
Skills.style.display = "none";

function EnseñarCategoria(Cat) {
    switch(Cat) {
        case "1":
            Proyectos.style.display = "block";
            Carrer.style.display = "none";
            Skills.style.display = "none";
        break;
        case "2":
            Proyectos.style.display = "none";
            Carrer.style.display = "block";
            Skills.style.display = "none";
        break;
        case "3":
            Proyectos.style.display = "none";
            Carrer.style.display = "none";
            Skills.style.display = "block";
        break;
    }
}