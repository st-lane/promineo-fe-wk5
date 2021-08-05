// Add common header - just to be fancy.
document.addEventListener('DOMContentLoaded', ()=>{
    // add H1 using content form doc title
    // let header1 = document.createElement("H1");
    // header1.textContent = document.title ? document.title : "Update document title";
    // document.body.prepend(header1);

    let footer = document.createElement("FOOTER");
    footer.className = "container-flex";
    footer.textContent = "© 2021 Lane Webstuff - all rights reserved.";
    document.body.append(footer);
    
    let thisPageName = window.location.pathname.split("/").pop();
    // console.log(thisPageName);

    function makeMenuItem(text,href){
        let navItem = document.createElement("LI");
        navItem.classList.add("nav-item");
        if (href !== thisPageName) {
            let navLink = document.createElement("A");
            navLink.classList.add("nav-link");
            navLink.href=href;
            navLink.textContent = text;
            navItem.appendChild(navLink);
        } else {
            navItem.innerText = text;
            navItem.classList.add("nav-link");
            navItem.classList.add("active");
        }
        return navItem;
    }

    // create the nav
    let navOuterWrapper = document.createElement("DIV");
    navOuterWrapper.className = "container-flex";

    let elemNav = document.createElement("NAV");
    elemNav.className = "navbar navbar-expand-lg navbar-dark bg-primary";
    
    // create the inner wrapper
    let navWrapper = document.createElement("DIV");
    navWrapper.className = "container-fluid";

    // create the branding element
    let navBrand = document.createElement("SPAN");
    navBrand.className="navbar-brand mb-0 h1";
    //    navBrand.innerHTML = "<h1>" + document.title ? document.title : "Update document title" + "</h1>";
    let brandContent = document.createElement("H1");
    brandContent.innerText = document.title ? document.title : "Update document title";
    navBrand.append(brandContent);

    // create hamburger button
    let btnBurger = document.createElement("BUTTON")
    btnBurger.className="navbar-toggler collapsed";
    btnBurger.setAttribute("type","button");
    btnBurger.setAttribute("data-bs-toggle","collapse");
    btnBurger.setAttribute("data-bs-target","navbarNav");
    btnBurger.setAttribute("aria-controls","navbarNav");
    btnBurger.setAttribute("aria-expanded","false");
    btnBurger.setAttribute("aria-label","Toggle navigation");
    // Apparently missed the boat on JS setup, so wire up home-style click event.
    btnBurger.addEventListener("click", function(){
        console.log(this);
        let target = document.getElementById('navbarNav');
        target.classList.toggle("show");
    });

    let btnContent = document.createElement("SPAN");
    btnContent.className="navbar-toggler-icon";
    btnBurger.append(btnContent);


    // navList container
    let navWrapper1 = document.createElement("DIV");
    navWrapper1.className="collapse navbar-collapse";
    navWrapper1.id = "navbarNav";

    // List of nav elements
    let navList = document.createElement("UL");
    navList.className = "navbar-nav me-auto mb-2 mb-lg-0";
    /*
    navList.appendChild( makeMenuItem("Home","index.html") );
    navList.appendChild( makeMenuItem("A Table","table.html") );
    navList.appendChild( makeMenuItem("A Form","form.html") );
    navList.appendChild( makeMenuItem("Carousel","carousel.html") );
    navList.appendChild( makeMenuItem("The Quiz","quiz.html") );
    */ 
    
    // put it all toghether
    // list in the wrapper
    navWrapper1.append(navList);
    // brand elem and list go in overall wrapper
    navWrapper.append(navBrand);
    // navWrapper.append(btnBurger);
    navWrapper.append(navWrapper1)
    // main wrapper in nav elem
    elemNav.append(navWrapper);
    navOuterWrapper.append(elemNav);

    // add to body elem.
    document.body.prepend(navOuterWrapper);

  } );