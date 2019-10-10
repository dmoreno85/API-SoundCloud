SC.initialize({
  client_id: 'aa06b0630e34d6055f9c6f8beb8e02eb'
});
document.querySelector('.buscaCanciones').addEventListener('submit', function (event) {
  event.preventDefault();

  // console.log( event.target.buscar.value );
  SC.get('/tracks', {
      q: event.target.buscar.value
    })


    .then(function (res) {
      for (let i = 0; i < res.length; i++) {
        let contentBox = document.createElement('div');
        contentBox.className = 'boxImage'
        let imagen = document.createElement('img');
        imagen.className = 'imgCreated'

        // const genre = res[i].genre;
        // contentBox.innerHTML = "<h3>'" + genre + "'</h3> "
        imagen.src = res[i].artwork_url;
        imagen.id = res[i].id;
        imagen.setAttribute("draggable", 'true');
        imagen.setAttribute("ondragstart", 'drag(event)');
        // imagen.setAttribute("width", '100');
        // imagen.setAttribute("heigth", '100');

        contentBox.append(imagen);

        document.querySelector('.cancionElegida').append(contentBox);

        //Autoplay de cancion al buscarla

        // SC.stream('/tracks/'+id).then(function (e) {
        //   e.play();

        // });
      }

    })


  //     function playIt(){
  //     var sound = SC.stream("/tracks/"+id, function(sound){
  //         sound.play();
  //     });
  // }

  // function nextIt(){
  //     var sound =SC.stream("/tracks/"+id, function(sound){
  //         sound.next();
  //     });
  // }

  // function prevIt(){
  //     var sound =SC.stream("/tracks/"+id, function(sound){
  //         sound.prev();
  //     });
  // }

})
//drag&drop

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}