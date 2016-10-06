var Planet = function(){
  return{
      clockwise_translation: Math.round(Math.random()),//movimiento sentido las manecillas=1 contra=0
      size: Math.random() * (100 - 10) + 10,//tamaño random entre 10 y 100 donde el min es 10
      speed: Math.random() * (10 - 1) + 1,//px->sec velocidad
      color: "#AAA",
      orbit_size: Math.random() * (400 - 200) + 200 ,//tamaño de la orbita
      orbit_position: Math.random() * 360,//posición del planeta en la orbita
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
        var planet_li = document.createElement("li");//variable para crear elementos planeta li
        var planet_span = document.createElement("span");//vartiable para crear elementos planeta span
        planet_span.setAttribute("class" , "planet");//asignamos la clase planet al elemento planeta span
        planet_li.appendChild(planet_span);//el elemento span es hijo del elemento li
        planet_span.style.width = this.getSize();// asignamos ancho al elemento
        planet_span.style.height = this.getSize();//asignamos alto al elemento
        planet_li.style.width = this.getOrbitSize();
        planet_li.style.height = this.getOrbitSize();
        planet_li.style.position = "relative";//asignamos posicion relativa al elemento
        planet_li.style.width = this.orbit_size;//
        planet_span.style.position = "adsolute";
        planet_span.style.bottom = 0;
        planet_span.style.right = 0;
        dom_parent.appendChild(planet_li);
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
  var planetary_system = document.querySelector(".planets");
  for(var planet_pos in planets){
    planets[planet_pos].pushDOMElement(planetary_system);
  }
});
