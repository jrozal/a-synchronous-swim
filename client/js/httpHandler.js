(function() {

  const serverUrl = 'http://127.0.0.1:3000';

  //
  // TODO: build the swim command fetcher here
  //
  let counter = 0;
  const ajaxRandomSwimMove = () => {
    $.ajax({
      type: 'GET',
      url: serverUrl,
      success: (data) => {
        console.log('GET successful');
        let requests = setTimeout(ajaxRandomSwimMove, 2000);
        if(data === 'empty') {
          clearTimeout(requests);
        } else {
          SwimTeam.move(data)
        }
      },
      error: () => {
        console.log('the GET request has failed');
      }
    });
  }
  ajaxRandomSwimMove();

  /////////////////////////////////////////////////////////////////////
  // The ajax file uplaoder is provided for your convenience!
  // Note: remember to fix the URL below.
  /////////////////////////////////////////////////////////////////////

  const ajaxFileUplaod = (file) => {
    var formData = new FormData();
    formData.append('file', file);
    $.ajax({
      type: 'POST',
      data: formData,
      url: serverUrl,
      cache: false,
      contentType: false,
      processData: false,
      success: (data) => {
        // reload the page
        window.location = window.location.href;
      },
      error: () => {
        console.log('the POST request has failed');
      }
    });
  };

  $('form').on('submit', function(e) {
    e.preventDefault();

    var form = $('form .file')[0];
    if (form.files.length === 0) {
      console.log('No file selected!');
      return;
    }

    var file = form.files[0];
    if (file.type !== 'image/jpeg') {
      console.log('Not a jpg file!');
      return;
    }

    ajaxFileUplaod(file);

  });

})();
