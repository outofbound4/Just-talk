
function Ajax() {
  this.processPOST = function (url, data, postFunction) {
    $.ajax({
      type: 'POST',
      url: url,
      data: data,
      success: function (data, status, xhr) {
        //do something with the data via front-end framework
        // location.reload();
        postFunction(data);
      },
      error: function (xhr, textStatus, errorMessage) {
        // error callback 
        switch (xhr.status) {
          case 403: alert("Error status : " + xhr.status + "   Forbidden...."); break;
          case 404: alert("Error status : " + xhr.status + "   Page not found...."); break;
          default: alert("Error status : " + xhr.status + "    somthing went wrong...");
        }
      }
    });
  };

  this.processGET = function (url, urldata, postFunction) {
    $.ajax({
      type: 'GET',
      url: url,
      data: urldata,
      success: function (data, status, xhr) {
        //do something with the data via front-end framework
        // location.reload();
        postFunction(data);
      },
      error: function (xhr, textStatus, errorMessage) {
        // error callback 
        switch (xhr.status) {
          case 403: alert("Error status : " + xhr.status + "   Forbidden...."); break;
          case 404: alert("Error status : " + xhr.status + "   Page not found...."); break;
          default: alert("Error status : " + xhr.status + "    somthing went wrong...");
        }
      }
    });
  };

  this.create_url_data = function (form_id) {
    //alert("AJAX :: " + form_id);
    var elements = document.getElementById(form_id).elements;
    var url = "";
    var i;
    for (i = 0; i < elements.length; i++) {
      if (elements[i].name == "") continue;
      if (i != 0) url += "&";
      url += elements[i].name + "=" + elements[i].value;
    }
    return url;
  };

}