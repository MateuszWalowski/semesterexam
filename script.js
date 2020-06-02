function galleries() {
  const gallery = "http://mawadesign.eu/wordpress/wp-json/wp/v2/gallery?_embed";
  fetch(gallery)
    .then(res => res.json())
    .then(handleData)

  function handleData(posts) {
    console.log(posts);
    posts.forEach(showevent);

  }

  function showevent(gallery) {
    console.log(gallery);
    const template = document.querySelector(".gallery").content;
    const copy = template.cloneNode(true);
    copy.querySelector(".galleryname").textContent = gallery.title.rendered;
    copy.querySelector(".otherworkdescription").innerHTML = gallery.content.rendered;


    document.querySelector("main").appendChild(copy);

    data = gallery.images;
    data.forEach(function (obj) {
      var img = document.createElement("img");
      img.src = obj.guid;
      img.alt = obj.post_title;
      img.onclick = function NewTab() {
        window.open(
          obj.guid, "_blank");
      }
      document.querySelector(".hereiswheretheimagesgo").appendChild(img);


    })

  }
}

function blog()

{
  const blog = "http://mawadesign.eu/wordpress/wp-json/wp/v2/posts";
  fetch(blog)
    .then(res => res.json())
    .then(handleData)

  function handleData(posts) {
    console.log(posts);
    posts.forEach(showevent);

  }

  function showevent(blog) {
    console.log(blog);
    const template = document.querySelector(".blogtemplate").content;
    const copy = template.cloneNode(true);
    copy.querySelector(".postname").textContent = blog.title.rendered;
    copy.querySelector(".postdate").innerHTML = blog.modified;
    copy.querySelector(".posttext").innerHTML = blog.content.rendered;
    document.querySelector("main").appendChild(copy);



  }
}

function portfolio() {


  const gallery = " http://mawadesign.eu/wordpress/wp-json/wp/v2/portfolio_project?_embed";
  fetch(gallery)
    .then(res => res.json())
    .then(handleData)

  function handleData(posts) {
    // console.log(posts);
    posts.forEach(showevent);

  }

  function showevent(portfolio) {
    // console.log(portfolio);
    const template = document.querySelector(".portfolio").content;
    const copy = template.cloneNode(true);
    copy.querySelector(".projectdate").textContent = portfolio.projectdate;
    copy.querySelector(".client_name").textContent = portfolio.client_name;
    copy.querySelector(".portfoliodesc").innerHTML = portfolio.content.rendered;
    copy.querySelector(".featuredimage img").src = portfolio._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url
    copy.querySelector(".name").textContent = portfolio.title.rendered;

    document.querySelector(".portfoliostuff").appendChild(copy);

    // copy.querySelector("iframe").src = portfolio.content.youtube;


  }
}

// var allportfolios = document.querySelectorAll('div')[4].getElementsByClassName('thissetsthepositionofportfolio');
// console.log(allportfolios);

// allportfolios.forEach(element => console.log(element));

// allportfolios.forEach(function (posts) {
//   posts.addEventListener('onClick', makeitbig);

//   });
// document.querySelectorAll("portfoliogallery").addEventListener("click", makeitbig);


//   function makeitbig(e){
// console.log("click");
// console.log(e.target);
// var element = document.getElementsByClassName("portfoliogallery");
// element.classList.add("bigportfolio");

// }


//   var allportfolios = document.querySelectorAll("portfoliogallery");
//   console.log(allportfolios.length);

// for (var i = 0; i < allportfolios.length; i++) {
//     var self = allportfolios[i];

//     self.addEventListener('click', function (event) {  
//         // prevent browser's default action
//         event.preventDefault();


//         // call your awesome function here
//         makeitbig(this); // 'this' refers to the current button on for loop
//     }, false);
// }


//   function makeitbig(e){
// console.log("click");
//     console.log(e.currentTarget);
//     var element = document.getElementsByClassName("portfoliogallery");
//     element.classList.add("bigportfolio");

//   }


const modal = document.querySelector(".modal-background");
modal.addEventListener("click", () => {
  modal.classList.add("hide");
});





function getProducts() {
  fetch("https://kea-alt-del.dk/t5/api/productlist")
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      showData(data)
    })
}

function showData(jsonData) {
  console.log(jsonData)
  jsonData.forEach(showSingleDish)
}

function showSingleDish(dish) {

  const template = document.querySelector("#dishTemplate").content;

  const copy = template.cloneNode(true);

  copy.querySelector("h3").textContent = dish.name;
  copy.querySelector("h4").textContent = dish.shortdescription;


  const imageName = dish.image; // this would be dynamic
  const base = "https://kea-alt-del.dk/t5/site/imgs/";
  const mediumImg = base + "medium/" + imageName + "-md.jpg";

  copy.querySelector("img").src = mediumImg;


  if (dish.discount) {
    copy.querySelector(".price-discount span").textContent = dish.price;
    const newPrice = Math.round(dish.price - dish.price * dish.discount / 100);
    copy.querySelector(".price-full span").textContent = newPrice;

  } else {
    copy.querySelector(".price-discount").remove()
    copy.querySelector(".price-full span").textContent = dish.price
  }




  copy.querySelector("button").addEventListener("click", () => {
    console.log("click", dish)
    fetch(`https://kea-alt-del.dk/t5/api/product?id=${dish.id}`)
      .then(res => res.json())
      .then(showDetails);
  });


  console.log(`#${dish.category}`)
  document.querySelector(`#${dish.category}`).appendChild(copy);


}

function showDetails(data) {
  modal.querySelector(".modal-name").textContent = data.name;
  modal.querySelector(".modal-description-short").textContent = data.shortdescription;
  modal.querySelector(".modal-description").textContent = data.longdescription;
  modal.querySelector(".modal-soldout").textContent = data.soldout;
  modal.querySelector(".modal-vege").textContent = data.vegetarian;
  //...
  modal.classList.remove("hide");
}