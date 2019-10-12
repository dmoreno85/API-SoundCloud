SC.initialize({
  client_id: 'aa06b0630e34d6055f9c6f8beb8e02eb'
});
document.querySelector('.buscaCanciones').addEventListener('submit', function (event) {
  event.preventDefault();
  SC.get('/tracks', {
      q: event.target.buscar.value
    })
    .then(function (res) {
    

        document.querySelector('.cancionElegida').innerHTML = "";
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
      
      return console.log('hey')
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
  event.dataTransfer.setData( "image", event.target.src );

}
function drop( event ) {
  event.preventDefault();
  var id = event.dataTransfer.getData( "text" );
  var src = event.dataTransfer.getData( "image" );
  document.querySelector( '.play' ).innerHTML = "<img src='"+ src+"' id ='"+id+"' draggable='true' ondragstart='drag(event)'' class='img_caratula'>";

  SC.stream( '/tracks/' + id ).then( function ( event ) {
      event.play();
  } );

}
