document.addEventListener("DOMContentLoaded", () => {
  let opened = false;
  // document.getElementById("hover-rounded-field").addEventListener("mouseover",()=>{
  //   $("#hover-rounded-field").removeClass("is-rounded");
  // })

  // document.getElementById("hover-rounded-field").addEventListener("mouseleave",()=>{
  //   $("#hover-rounded-field").addClass("is-rounded");
  // })

  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );

  // Add a click event on each of them
  $navbarBurgers.forEach((el) => {
    el.addEventListener("click", () => {
      // Get the target from the "data-target" attribute
      const target = el.dataset.target;
      const $target = document.getElementById(target);

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      el.classList.toggle("is-active");
      $target.classList.toggle("is-active");
    });
  });

  var iframe = document.createElement("iframe");
  // Create a floating div containing the iframe
  var div = document.createElement("div");
  div.id = "snap";
  div.style.position = "fixed";
  div.style.bottom = "0";
  div.style.right = "0";
  div.style.display = "none";
  div.style.zIndex = "9999";
  div.className = "box mr-5 mb-5";
  document.body.appendChild(div);

  var button = document.createElement("Button");
  button.innerHTML = '<i class="fa-sharp fa-solid fa-angle-up"></i> &nbsp; Chiedi al Presidente della Repubblica';
  button.className = "button is-primary is-rounded mr-5 mb-5 is-hidden-mobile";
  button.style.position = "fixed";
  button.style.bottom = "0";
  button.style.right = "0";
  button.style.zIndex = "9998";
  document.body.appendChild(button);
  let created = false;
  var title = document.createElement("h1");
  // Add a click event on the button
  button.addEventListener("click", function () {
    //if (div.style.display == "none") {
    div.style.display = "block";
    let interval = setInterval(() => {
      if ($("#snap").css("display") == "block") {
        if (!created) {
          iframe.src ="https://snap.berkeley.edu/embed?projectname=PER_SITO_Lettura_articoli_completo&username=costituzione2023";
          iframe.id="frame";
          title.innerHTML = "Chiedi al Presidente della Repubblica";
        }
        created = true;
        opened = true;
        clearInterval(interval);
      }
    }, 10);

    /*} else {
      div.style.display = "none";
    }*/
  });

  // Hide the button when the user opens the div

  // Add a closing button to the div
  var close = document.createElement("Button");
  close.innerHTML = "X";
  close.className = "button is-danger is-small float is-rounded";
  div.appendChild(close);

  // Add a click event on the closing button
  close.addEventListener("click", function () {
    div.style.display = "none";
  });

  // Create a title for the div
  title.className = "title is-4";
  title.style.textAlign = "center";
  div.appendChild(title);

  // create an iframe inside the div basing of this code <iframe width="480" height="390" frameBorder=0 allowfullscreen allow="geolocation; microphone;camera" src="https://snap.berkeley.edu/embed?projectname=PER_SITO_Lettura_articoli_%20per_keyword&username=costituzione2023"></iframe>
  iframe.width = "480";
  iframe.height = "390";
  iframe.allowfullscreen = "true";
  iframe.allow = "geolocation; microphone;camera";
  div.appendChild(iframe);
  // When the user clicks anywhere outside of the div, close it
  window.onclick = function (event) {
    if (event.target != button && event.target != div && opened) {
      div.style.display = "none";
      opened = false;
    }
  };
});
