import { PageState } from "./classes/pageState.js";

import CreatePage from "./classes/createPage.js";
import HomeState from "./classes/homePage.js";
import PostState from "./classes/postState.js";

import Post from "./classes/general/post.js";
import UI from "./classes/general/ui.js";
import Logic from "./classes/general/logic.js";
import Storage from "./classes/general/storage.js";

//----------------------------------//

document.addEventListener("DOMContentLoaded", function () {
  const storage = new Storage();
  const logic = new Logic();
  const userInterface = new UI();

  const page = new PageState();
  page.initState();
  storage.verifyMemory();

  homePageEvents(storage, logic, userInterface);

  const home = document.querySelector("#home");
  const create = document.querySelector("#create");

  home.addEventListener("click", function (e) {
    page.change(new HomeState());

    homePageEvents(storage, logic, userInterface);
    const postClicked = document.querySelector(".every-post");
    postClicked.addEventListener("click", (e) => {
      page.change(new PostState());
      PostPageEvents(e, storage, userInterface);
      e.preventDefault();
    });
  });

  const postClicked = document.querySelector(".every-post");
  postClicked.addEventListener("click", (e) => {
    e.preventDefault();

    page.change(new PostState());
    PostPageEvents(e, storage, userInterface);
  });

  create.addEventListener("click", function (e) {
    page.change(new CreatePage());
    createPageEvents(storage, logic, userInterface);

    e.preventDefault();
  });
});

function createPageEvents(storage, logic, userInterface) {
  const postForm = document.querySelector(".post-form");
  postForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const title = document.querySelector("#title").value;
    const content = document.querySelector("#content").value;
    const tags = document.querySelector("#tags").value;
    const image = document.querySelector("#img").files[0];

    const reader = new FileReader();
    reader.onload = async () => {
      let formData = {
        id: Date.now(),
        title: title,
        content: content,
        tags: tags.toUpperCase().split(',').map(function (value) {
          return value.trim();
       }),
        image: reader.result,
      };

      let newPost = new Post(
        formData.id,
        formData.image,
        formData.title,
        formData.content,
        formData.tags
      );
      
      let saved = await logic.addPost(newPost.getPost(), storage);
      if (saved) {
        userInterface.clearForm();
        userInterface.displayMessage("Post added successfully", "#DFF2BF");
      } else {
        userInterface.displayMessage("Post not added", "#FFBABA");
      }
    };
    reader.readAsDataURL(image);
  });
  userInterface.displayAllItems_Edit(storage);

  let previousClick = "";
  document.querySelector(".all-Posts").addEventListener("click", (e) => {
    if (e.target.innerText == "Edit") {
      userInterface.enableEditPost(e, this);
      if (previousClick !== "") {
        userInterface.disableEditPost(previousClick);
      }
      previousClick = e;
    } else if (e.target.innerText == "Done") {
      userInterface.saveDone(e, storage);
      userInterface.disableEditPost(e);
      previousClick = "";
    } else if (e.target.innerText == "Delete") {
      if (confirm("Are you sure you want to delete this post?")) {
        userInterface.deletePost(e, storage);
      }
    }
  });
}

function homePageEvents(storage, logic, userInterface) {
  userInterface.displayTagsMenu(storage.getTags());
  userInterface.displayFirstSection(storage);
  userInterface.displayRemainingPosts(storage);

  const tagsMenu = document.querySelector(".tag-container");
  tagsMenu.addEventListener("click", async function (e) {
    let tag = e.target.textContent;
    userInterface.displayTagPosts(tag, storage);
  });

  let timer;
  let waitTime = 1000;
  let searchInput = document.querySelector(".searchField");
  searchInput.addEventListener("keyup", (e) => {
    const text = e.currentTarget.value;

    clearTimeout(timer);
    timer = setTimeout(() => {
      userInterface.searchByName(text, storage);
    }, waitTime);
  });
}

function PostPageEvents(e, storage, userInterface) {
  let post = e.target.parentElement;

  let img = document.querySelector(".fullPost-img");
  let title = document.querySelector(".fullPost-title");
  let content = document.querySelector(".fullPost-content");
  let tags = document.querySelector(".fullPost-tags");

  img.innerHTML = `<img src="${post.querySelector(".post-img").src}">`;
  title.textContent = post.querySelector(".post-title").textContent;
  content.textContent = post.querySelector(".post-content").textContent;
  tags.textContent = post.querySelector(".post-tags").textContent;
}
