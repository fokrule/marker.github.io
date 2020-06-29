$(function() {
    	var i = 0;
  	  $.fn.setMarker = function(e, o) {
        if ((state.length<1)) {
          alert('Select marking type first');
        }
        if (state == 'star') {
          i++;
    	    if (o == undefined) {
    	      o = $("<i>", {
    	        class: "fa fa-star"
    	      }).html("<span class='number' style='color:red;'>"+i+"<span>");
    	    }
          var border = '';
        }

        if (state == 'resize-box') { 
          if (o == undefined) {
            o = $("<i>", {
              class: "resize-div"
            }).html("<span class='number' style='color:red;'>This is box<span>");
          }
          var border = '2px solid red';
        }

        if (state == 'delete') {
          if (o == undefined) {
            if ($(this).attr("id") != 'image') {
              $(this).remove();
            }
          }
        }

        if ( (state != 'delete') && (state.length>0) ) {
    	    var self = $(this);
    	    var marker = o.appendTo(self.parent()).css({
    	      top: (e.pageY - self.offset().top) + "px",
    	      left: (e.pageX - self.offset().left) + "px",
            border : border
    	    });
    	  }
      }   


    $.fn.setMarkerSub = function(e, o) {
      if (state == 'star') {
        i++;
        if (o == undefined) {
          o = $("<i>", {
            class: "fa fa-star"
          }).html("<span class='number' style='color:red;'>"+i+"<span>");
        }
        var border = '';
      }

      if (state == 'delete') {
        if (o == undefined) {
          if ($(this).attr("id") != 'image') {
            $(this).remove();
          }
        }
      }

      if ( (state != 'delete') && (state == 'star') ) {
        var self = $(this);
        var marker = o.appendTo(self).css({
          top: (e.pageY - self.offset().top) + "px",
          left: (e.pageX - self.offset().left) + "px",
          border : border
        });
      }
    }

  $('#main-div').on("click", "img#image", function(e) {
    $(this).setMarker(e);
  });
  $('#main-div').on("click", "i", function(e) {
    $(this).setMarkerSub(e);
  });
});
window.state = '';
$("#star").click(function(){
  window.state = 'star';
});
$("#box").click(function(){
  window.state = 'resize-box';
});
$("#delete").click(function(){
  window.state = 'delete';
});
$("#convert").click(function(){
  var editedCode = $('#main-div').html();
  localStorage.setItem("imageData", editedCode);
  if (window.confirm('Your edit has been saved. If you click "ok" you would be redirected to edit page. Cancel will keep you in this page ')) 
{
  window.location.href='edit.html';
};
  //convertImageToString();
});

$("#start-editing").click(function(e){
  $(this).prev().attr('id','image');
  $("#mark-type-button").removeClass('d-none');
  $(this).addClass('d-none');
});

function convertImageToString () {
    var canvas = document.createElement('canvas');
    var image = document.getElementById('image');
    canvas.height = image.naturalHeight;
    canvas.width = image.naturalWidth;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    var base64String = canvas.toDataURL();
    console.log(base64String);
}