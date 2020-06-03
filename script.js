// function galleries() {
//   const gallery = "http://mawadesign.eu/wordpress/wp-json/wp/v2/gallery?_embed";
//   fetch(gallery)
//     .then(res => res.json())
//     .then(handleData)

//   function handleData(posts) {
//     console.log(posts);
//     posts.forEach(showevent);

//   }

//   function showevent(gallery) {
//     console.log(gallery);
//     const template = document.querySelector(".gallery").content;
//     const copy = template.cloneNode(true);
//     copy.querySelector(".galleryname").textContent = gallery.title.rendered;
//     copy.querySelector(".otherworkdescription").innerHTML = gallery.content.rendered;


//     document.querySelector("main").appendChild(copy);

//     data = gallery.images;
//     data.forEach(function (obj) {
//       var img = document.createElement("img");
//       img.src = obj.guid;
//       img.alt = obj.post_title;
//       img.onclick = function NewTab() {
//         window.open(
//           obj.guid, "_blank");
//       }
//       document.querySelector(".hereiswheretheimagesgo").appendChild(img);


//     })

//   }
// }

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
    document.querySelector("main .postcontainer").appendChild(copy);



  }
}




const modal = document.querySelector(".modal-background");
// modal.addEventListener("click", () => {
//   modal.classList.add("hide");
// });



fetch("https://mawadesign.eu/wordpress/wp-json/wp/v2/portfolio_project?_embed")
  .then(function (response) {
    return response.json()
  })
  .then(function (data) {
    showData(data)
  })

function showData(jsonData) {
  // console.log(jsonData)
  jsonData.forEach(showSingleDish)
}

function showSingleDish(portfolio) {
  const template = document.querySelector(".portfolio").content;
  const copy = template.cloneNode(true);
  copy.querySelector(".featuredimage img").src = portfolio._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url;
  copy.querySelector(".name").textContent = portfolio.title.rendered;
  copy.querySelector(".featuredimage").addEventListener("click", () => {
    console.log("click", portfolio)
    fetch(`http://mawadesign.eu/wordpress/wp-json/wp/v2/portfolio_project/${portfolio.id}`)
      .then(res => res.json())
      .then(showDetails);
  });

  document.querySelector(".portfoliostuff").appendChild(copy);
}

function showDetails(data) {
  console.log(data);
  modal.classList.remove("hide");

  modal.querySelector(".modal-name").textContent = data.title.rendered;
  modal.querySelector(".projectdescription").innerHTML = data.content.rendered;
  modal.querySelector(".projectdate").innerHTML = data.projectdate;

  if (data.client_name) {
    modal.querySelector(".client_name").textContent = "Client: " +  data.client_name;
    modal.querySelector(".client_name").style.display = "block";

  } else {
    modal.querySelector(".client_name").style.display = "none";
  }


  if (data.youtube) {
    modal.querySelector("iframe").src = data.youtube;
    modal.querySelector(".youtube").style.display = "block";
    console.log("fetching " + data.youtube)

  } else {
    modal.querySelector(".youtube").style.display = "none";
  }


  if (data.gallery) {
    modal.querySelector(".modal-gallery").style.display = "flex";

    modal.querySelector(".modal-gallery").innerHTML = "";;
    images  = data.gallery
    console.log(images);
    images.forEach(function (obj) {
        var img = document.createElement("img");
        img.src = obj.guid;
        img.alt = obj.post_title;
        img.onclick = function NewTab() {
          window.open(
            obj.guid, "_blank");
    }
          document.querySelector(".modal-gallery").appendChild(img);
        } )
      }

    
    else {
      modal.querySelector(".modal-gallery").innerHTML = "";;
      modal.querySelector(".modal-gallery").style.display = "none";

    }


  }
  closemodal  = document.querySelector(".closemodal");
closemodal.addEventListener("click", () => {
  document.querySelector(".modal-background").classList.add("hide");
});
  