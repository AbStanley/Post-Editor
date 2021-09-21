
import{PageState} from './classes/pageState.js';

import CreatePage from "./classes/createPage.js";
import HomeState from './classes/homePage.js';
import PostState from './classes/postState.js';

import Post from './classes/general/post.js';
import UI from './classes/general/ui.js';
import Logic from './classes/general/logic.js';
import Storage from './classes/general/storage.js';

//----------------------------------//

document.addEventListener('DOMContentLoaded', function() {
    const storage = new Storage();
    const logic = new Logic();
    const userInterface = new UI();

    const page = new PageState();
    page.initState();
    storage.verifyMemory();

    /* INITIALIZE THE FUNCTION EVENT FOR THE MAIN PAGE */
    homePageEvents(storage, logic, userInterface);
    
/*
    if(page.currentState.constructor.name == 'CreatePage'){
        
    };  
    */
    
    const home = document.querySelector('#home');
    const create = document.querySelector('#create');
    
    
    home.addEventListener('click', function (e) {
        
        page.change(new HomeState());
        
        homePageEvents(storage, logic, userInterface);
            const postClicked = document.querySelector('.every-post');
            postClicked.addEventListener('click', (e) =>{

            
            page.change(new PostState);
            PostPageEvents(e, storage, userInterface);
            e.preventDefault();
        
    });
        

        
    });

    const postClicked = document.querySelector('.every-post');
            postClicked.addEventListener('click', (e) =>{
                e.preventDefault();

            
            page.change(new PostState);
            PostPageEvents(e,  storage, userInterface);
            
            });

    //console.log(page.currentState.constructor.name);
   /* if(page.currentState.constructor.name == 'HomeState' ||
    page.currentState.constructor.name == 'PostState'
    ){*/
    
    
    

    create.addEventListener('click', function (e) {
        page.change(new CreatePage);
        createPageEvents(storage, logic, userInterface);

        e.preventDefault();
    });

    
    
    
});

function createPageEvents(storage, logic, userInterface){
    const postForm = document.querySelector('.post-form');
        postForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const title = document.querySelector('#title').value;
        const content = document.querySelector('#content').value;
        const tags = document.querySelector('#tags').value;
        const image = document.querySelector('#img').files[0];
        
        const reader = new FileReader(); 
        reader.onload = async () => {      
                
            
            let formData = {
                id: Date.now(),
                title: title,
                content: content,
                tags: tags.toUpperCase().split(','),
                image: reader.result
            };

            
            let newPost = new Post(formData.id, formData.image, formData.title, formData.content, formData.tags);
            console.log(newPost);
            let saved = await logic.addPost(newPost.getPost(), storage);
            if(saved) {
                userInterface.clearForm();
                userInterface.displayMessage('Post added successfully', 'green');
            } else {
                userInterface.displayMessage('Post not added', 'red');
            }  
        };  
        reader.readAsDataURL(image);    
        
    });
    userInterface.displayAllItems_Edit(storage);

    let previousClick = '';
    document.querySelector('.all-Posts').addEventListener('click', (e) =>{
        
        if(e.target.innerText == 'Edit'){             
            userInterface.enableEditPost(e, this);
            if (previousClick !== ''){
                userInterface.disableEditPost(previousClick);
            }   
            previousClick = e;
        }
        else if (e.target.innerText == 'Done'){
            userInterface.saveDone(e, storage);
            userInterface.disableEditPost(e);
            previousClick = '';
        }
        else if (e.target.innerText == 'Delete'){
            userInterface.deletePost(e, storage);
        }
    }); 

    
         
    

}

function homePageEvents(storage, logic, userInterface){
    
    /*console.log(storage.getTags());*/
    userInterface.displayTagsMenu(storage.getTags());
    userInterface.displayFirstSection(storage);
    userInterface.displayRemainingPosts(storage);

    const tagsMenu = document.querySelector('.tag-container');
    tagsMenu.addEventListener('click', async function(e) {
        let tag = e.target.textContent;
        console.log(tag);
        userInterface.displayTagPosts(tag, storage);
    }); 

    let timer;
    let waitTime  = 1000;    
    let searchInput = document.querySelector('.searchField');
    searchInput.addEventListener('keyup', (e) =>{
        const text = e.currentTarget.value;
        
        clearTimeout(timer);
        timer = setTimeout(() => {
            userInterface.searchByName(text, storage);
        }, waitTime);

    });

    
}

function PostPageEvents(e, storage, userInterface){
    let post = e.target.parentElement;    

    //console.log(post.querySelector('.post-title').textContent);
    let img = document.querySelector('.fullPost-img');
    let title = document.querySelector('.fullPost-title');
    let content = document.querySelector('.fullPost-content');
    let tags = document.querySelector('.fullPost-tags');

    img.innerHTML = `<img src="${post.querySelector('.post-img').src}">`;
    title.textContent = post.querySelector('.post-title').textContent;
    content.textContent = post.querySelector('.post-content').textContent;
    tags.textContent = post.querySelector('.post-tags').textContent;


}