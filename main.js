SC.initialize({
  client_id: 'aa06b0630e34d6055f9c6f8beb8e02eb'
});
document.querySelector('.buscaCanciones').addEventListener('submit', function (event) {
  event.preventDefault();
  SC.get('/tracks', {
      q: event.target.buscar.value
    })
    .then(function (res) {
      document.querySelector('.cancionElegida').innerHTML="";
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
        contentBox.append(imagen);
        document.querySelector('.cancionElegida').append(contentBox);

      }
    })
  //     function play(){
  //     var sound = SC.stream("/tracks/"+id, function(sound){
  //         sound.play();
  //     });
  // }

  // function nextIt(){
  //       var sound =SC.stream("/tracks/"+id, function(sound){
  //             sound.next();
  //         });
  //     }

  // function prevIt(){
  //     var sound =SC.stream("/tracks/"+id, function(sound){
  //         sound.prev();
  //     });
  // }

})
//drag&drop
function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
  event.preventDefault();
  var data = event.dataTransfer.getData("text");
  event.target.appendChild(document.getElementById(data));
  console.log(data);
  SC.stream('/tracks/' + data).then(function (event) {
    event.play();
  });

}