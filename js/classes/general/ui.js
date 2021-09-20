class UI {
    getFormData(image) {
        
        const title = document.querySelector('#title').value;
        const content = document.querySelector('#content').value;
        const tags = document.querySelector('#tags').value;

        let infoImg = image;
        
        return {
            id: Date.now(),
            infoImg,
            title,
            content,
            tags
        }
    }


    clearForm() {
        document.querySelector('#title').value = '';
        document.querySelector('#content').value = '';
        document.querySelector('#tags').value = '';
    }

    displayMessage(message, color, attachmentTag){

        const div = document.createElement('div');
        div.classList.add('alert');

        div.style.backgroundColor = color;

        div.textContent = message;

        document.querySelector('.upperMenu').appendChild(div);

        setTimeout(() => {
            div.remove();
            location.reload();
        }, 3000);
    }
    
    displayTagsMenu(tags){
        
        const tagsMenu = document.querySelector('.tag-container');
        tagsMenu.style.cursor = 'pointer';

        const ul = document.createElement('ul');
        ul.classList.add('tags-group');
        tagsMenu.appendChild(ul);

        tags.filter((e, index, arr) => arr.indexOf(e) == index)
            .sort((a, b) => a.localeCompare(b))
            .map(tag => {
            const li = document.createElement('li');
            li.classList.add('tag');
            li.textContent = tag;
            ul.appendChild(li);
        });
    }

    displayTagPosts(tag, storage){
        document.querySelector('.content').innerHTML = '';
        document.querySelector('.content').style.cursor = 'pointer';

        let tagPosts = storage.getPostsByTag(tag);
        tagPosts.filter((e, i, arr) => arr.indexOf(e) == i);
                
        tagPosts.map(post => {
            const postDiv = document.createElement('div');
            postDiv.classList.add('post');

            console.log(post);

            const postImg = document.createElement('img');
            postImg.classList.add('post-img');
            
            postImg.src = post.image;
            postDiv.appendChild(postImg);

            postDiv.innerHTML = this.postInsertHTML(post);
            document.querySelector('.content').appendChild(postDiv);
        });
    }

    displayFirstSection(storage){
        document.querySelector('.last-five-posts').innerHTML = '';
        document.querySelector('.last-five-posts').style.backgroundColor = '#f5f5f5';
        document.querySelector('.last-five-posts').style.cursor = 'pointer';
        let posts = storage.getPosts();
        posts = posts.sort((a, b) => b.id  - a.id)
        posts = posts.slice(0, 5);
        
        posts.map(post => {
            const postDiv = document.createElement('div');
            postDiv.classList.add('recent-post');
   
            postDiv.innerHTML = this.postInsertHTML(post);      
            document.querySelector('.last-five-posts').appendChild(postDiv);
        });
    }

    displayRemainingPosts(storage){
        document.querySelector('.remaining-posts').innerHTML = '';
        document.querySelector('.remaining-posts').style.backgroundColor = '#d8f8f8';
        document.querySelector('.remaining-posts').style.cursor = 'pointer';

        let posts = storage.getPosts();
        posts = posts.sort((a, b) => b.id  - a.id)
        posts = posts.slice(5);
        posts.map(post => {
            const postDiv = document.createElement('div');
            postDiv.classList.add('remaining');
            // add info
            postDiv.innerHTML = this.postInsertHTML(post);         
            document.querySelector('.remaining-posts').appendChild(postDiv);
        });
    }

    displayAllItems(storage){
        document.querySelector('.all-Posts').innerHTML = '';
        document.querySelector('.all-Posts').style.backgroundColor = '#f5f5f5';
        document.querySelector('.all-Posts').style.cursor = 'pointer';

        let posts = storage.getPosts();
        posts = posts.sort((a, b) => b.id  - a.id)
        posts.map(post => {
            const postDiv = document.createElement('div');
            postDiv.classList.add('post');
            // add info
            postDiv.innerHTML = this.postInsertHTML(post);     
            document.querySelector('.all-Posts').appendChild(postDiv);
        });
    }

    displayAllItems_Edit(storage){
        document.querySelector('.all-Posts').innerHTML = '';
        document.querySelector('.all-Posts').style.backgroundColor = '#f5f5f5';
        

        let posts = storage.getPosts();
        posts = posts.sort((a, b) => b.id  - a.id)
        posts.map(post => {
            const postDiv = document.createElement('div');
            postDiv.classList.add(post.id);
            // add info
            postDiv.innerHTML = this.postInsertHTML(post);
            postDiv.innerHTML += `
                <button class="edit-post" data-id="${post.id}">Edit</button>
                <button class="delete-post" data-id="${post.id}">Delete</button>
            `;            
            document.querySelector('.all-Posts').appendChild(postDiv);
        });
    }

    enableEditPost(e){
        let post = e.target.parentElement;

        //create input file
        let inputFile = document.createElement('input');
        inputFile.type = 'file';
        inputFile.classList.add('input-change');
        inputFile.name = 'image';
        inputFile.accept = 'image/*';

        // append
        post.appendChild(inputFile);

        
        let title = post.querySelector(".post-title");
        title.contentEditable = true;
        title.style.color = "#5C5C5C";

        let content = post.querySelector(".post-content");
        content.contentEditable = true;
        content.style.color = "#5C5C5C";

        let tags = post.querySelector(".post-tags");
        tags.contentEditable = true;
        tags.style.color = "#5C5C5C";

        e.target.innerText = "Done";
    }

    disableEditPost(e){
        let post = e.target.parentElement;

        let inputFile = post.querySelector('.input-change');
        post.removeChild(inputFile);

        let title = post.querySelector(".post-title");
        title.contentEditable = false;
        title.removeAttribute("style");

        let content = post.querySelector(".post-content");
        content.contentEditable = false;
        content.removeAttribute("style");

        let tags = post.querySelector(".post-tags");
        tags.contentEditable = false;
        tags.removeAttribute("style");

        e.target.innerText = "Edit";
    }

    saveDone(e, storage){
        let post = e.target.parentElement;
         let id = post.className;
        console.log(post.className);
        let image = post.querySelector('.input-change').files[0];
        let title = post.querySelector(".post-title").innerText;
        let content = post.querySelector(".post-content").innerText;
        let tags = post.querySelector(".post-tags").innerText;

        if (image != undefined){
        const reader = new FileReader(); 
        reader.onload = async () => {
            let imageUrl = reader.result;
            let posts = storage.getPosts();
        
            posts.map(post => {
                if(post.id == id){
                    post.image = imageUrl;
                    post.title = title;
                    post.content = content;
                    post.tags = tags;
                    document.querySelector('.post-img').src = imageUrl;
                }
            });
            storage.savePosts(posts);            
        };
        reader.readAsDataURL(image); 

        } else{
            let posts = storage.getPosts();
            posts.map(post => {
                if(post.id == id){
                    post.title = title;
                    post.content = content;
                    post.tags = tags;
                }
            });
            storage.savePosts(posts);
        }
    }

    deletePost(e, storage){
        let post = e.target.parentElement;
        let id = post.className;
        let posts = storage.getPosts();
        posts = posts.filter(post => post.id != id);
        storage.savePosts(posts);
        storage.setPosts(posts);
        post.remove();
    }

    searchByName(value, storage){
        console.log(value);
        let posts = storage.getPosts();
        posts = posts.filter(post => post.title.toLowerCase().includes(value.toLowerCase()));
        this.displayFilteredItems(posts, storage);
    }

    displayFilteredItems(filteredPosts, storage){

        document.querySelector('.content').innerHTML = '';
        document.querySelector('.content').style.backgroundColor = '#f5f5f5';
        document.querySelector('.content').style.cursor = 'pointer';

        filteredPosts.map(post => {
            const postDiv = document.createElement('div');
            postDiv.classList.add('post');         
            
            postDiv.innerHTML = this.postInsertHTML(post);
                     
            document.querySelector('.content').appendChild(postDiv);
        });
    }

    postInsertHTML(post){
        return `   
            <img class="post-img" src="${post.image}" style="max-height: 400px; max-width: 200px;" alt="">
            <h3 class="post-title">${post.title}</h3>
            <p class="post-content">${post.content}</p>
            <p class="post-tags">${post.tags}</p>
            `;   
    };



}

export default UI;