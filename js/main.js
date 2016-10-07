var planets_names = ["earth", "pluton", "futurama", "homero jay simpson",
"colombia jugando y yo aqui", "namekusei", "death star", "gatito"];//arreglo de nombres de planetas
var Planet = function(){
  return{
      //Atributos
      clockwise_translation: Math.round(Math.random()),//movimiento sentido las manecillas=1 contra=0
      size: Math.random() * (100 - 10) + 10,//tamaño random entre 10 y 100 donde el min es 10
      speed: Math.random() * (10 - 1) + 1,//px->sec velocidad deg/seg
      color: "#AAA",
      orbit_size: Math.random() * (300 - 200) + 200 ,//tamaño de la orbita
      orbit_position: Math.random() * 360,//posición del planeta en la orbita
      name: planets_names.pop(),//esta instruccion toma el último elemento del arreglo y se lo asigna a name
      dom_orbit: null,//variable que almacena el elemento dom de planet_orbit
      dom_planet: null,//variable que almacena el elemento dom de planet_body
      dom_sun : null,
      rotation_process_id : null,
      //Metodos
      getSize : function(){//transforma los valores en pixeles
          return this.size + "px";
      },
      getSpeed : function(){//transforma los valores en pixeles
          return this.speed + "deg";
      },
      getOrbitSize : function(){
        return this.orbit_size + "px";
      },
      pushDOMElement : function(dom_parent){//creamos los elementos html desde el javascript
        var planet_orbit = document.createElement("li");//variable para crear elementos planeta li
        var planet_body = document.createElement("span");//vartiable para crear elementos planeta span
        var sun_body = document.createElement("span");
        planet_body.setAttribute("class" , "planet");//asignamos la clase planet al elemento planeta span
        planet_orbit.appendChild(planet_body);//el elemento span es hijo del elemento li
        planet_body.style.width = this.getSize();// asignamos ancho al elemento
        planet_body.style.height = this.getSize();//asignamos alto al elemento
        planet_orbit.style.position = "absolute";//asignamos posicion  al elemento
        planet_orbit.style.width = this.getOrbitSize();//asigna ancho de orbita
        planet_orbit.style.height = this.getOrbitSize();//asigna alto de orbita
        planet_orbit.style.transform = "rotate("+this.orbit_position+"deg)";//rotamos la posicion de los planetas
        planet_orbit.style.transformOrigin = "top left";//el origen o ancla de rotacion esta en la parte superior izquierda
        planet_orbit.style.top = 0;
        planet_orbit.style.left = 0;
        planet_body.style.position = "absolute";
        planet_body.style.bottom = 0;
        planet_body.style.right = 0;
        planet_body.textContent = this.name;//asigna los nombres a los planetas
        dom_parent.appendChild(planet_orbit);
        this.dom_orbit = planet_orbit;//guardo en las variales los elementos dom planet_orbit
        this.dom_planet = planet_body;//guardo en las variales los elementos dom planet_body
        this.dom_sun = sun_body;
      },
      startRotation : function(){
          var self = this;//guarda el objeto que estoy creando "es planeta porque esta dentro planeta" siempre se define a nivel de mi funcion
          var freq = 10;
          self.rotation_process_id = setInterval(function(){//Recibe dos parametros funcion + tiempo ->funcion del lenguaje que ejecuta la funcion indefinidamente que se pase como parametro cada cierto tiempo
            if(self.clockwise_translation === 1){
              self.orbit_position += self.speed/freq;//sumamos la velocidad para que corra en sentido
            }else {
              self.orbit_position -= self.speed/freq;//restamos la velocidad para que corra en el otro sentido
            }
            self.dom_orbit.style.transform = "rotate("+self.orbit_position+"deg)";
          },500/freq);
      },
      AddEventHandlerToStop : function(){//Definiendo metodo par detener planeta
        var self = this;
        this.dom_planet.addEventListener("mouseover", function(){
            clearInterval(self.rotation_process_id);
        });
      },
      AddEventHandlerToSunMovePlanets : function(){//Definiendo metodo par detener planeta
        var self = this;
        this.dom_sun.addEventListener("mouseover", function(){
            startRotation(self.rotation_process_id);//duda
        });
      },
  };
};

var number_of_planets = 8;
var planets = [];
while(number_of_planets-- > 0){
  planets.push(Planet());
}
console.log(planets);
document.addEventListener("DOMContentLoaded" , function(){
  var planetary_system = document.querySelector(".planets");//creamos planetas
  for(var planet_pos in planets){//recorre todos los planetas
    planets[planet_pos].pushDOMElement(planetary_system);//pinta los planetas
    planets[planet_pos].startRotation();
    planets[planet_pos].AddEventHandlerToStop();

  }


});
