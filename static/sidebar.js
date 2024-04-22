let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let searchBtn = document.querySelector(".bx-search");
let materielBtn = document.querySelector(".bx-folder");
let subMenu = document.querySelector(".sub-menu");

function menuBtnChange() {
  if (sidebar.classList.contains("open")) {
    closeBtn.classList.replace("bx-menu", "bx-menu-alt-right"); //replacing the iocns class
    subMenu.style.display = "block"; // Afficher les sous-menus
  } else {
    closeBtn.classList.replace("bx-menu-alt-right", "bx-menu"); //replacing the iocns class
    subMenu.style.display = "none";
  }
}

closeBtn.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  menuBtnChange(); //calling the function(optional)
});

searchBtn.addEventListener("click", () => {
  // Sidebar open when you click on the search iocn
  sidebar.classList.toggle("open");
  menuBtnChange(); //calling the function(optional)
});

materielBtn.addEventListener("click", () => {
  // Sidebar open when you click on the search iocn
  sidebar.classList.toggle("open");
  menuBtnChange(); //calling the function(optional)
});




// following are the code to change sidebar button(optional)


//document.addEventListener("DOMContentLoaded", function() {
//  let materialLink = document.querySelector(".nav-list li:nth-child(6) a"); // Sélectionnez le lien "Matériel"
//  let sidebar = document.querySelector(".sidebar");
  //let subMenu = document.querySelector(".sub-menu");

  //materialLink.addEventListener("click", function(event) {
    //  event.preventDefault(); // Empêcher le comportement par défaut du lien
      //if (!sidebar.classList.contains("open")) { // Vérifier si la sidebar est fermée
        //  sidebar.classList.add("open"); // Ouvrir la sidebar
          //subMenu.style.display = "block"; // Afficher les sous-menus
      //}
  //});
//});

