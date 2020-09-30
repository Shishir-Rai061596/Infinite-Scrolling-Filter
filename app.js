const LOADING = document.querySelector('.loader');
const FILTER = document.querySelector('.filter');
const POSTSCONTAINER = document.querySelector('.posts-container')

let limit = 5;
let page = 1;


const addToDOM = posts => {
    posts.forEach(post => {
        const div = document.createElement('div');
        div.classList.add('post')
        div.innerHTML = `
        <div class="number">${post.id}</div>
        <div class="post-info">
        <h2 class="post-title">${post.title}</h2>
        <p class="post-body">
        ${post.body}</p>
        </div>`
        POSTSCONTAINER.appendChild(div)
    })
}
const loadPosts = async page => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
    const post = await res.json();
    addToDOM(post)
}

const showLoading = () => {
    LOADING.classList.add('show');
    setTimeout(() => {
        LOADING.classList.remove('show');
        setTimeout(() => {
            page++;
            loadPosts(page)
        }, 300);
    }, 1000)

}
const handleFilterInput = () => {
    const input = FILTER.value.toUpperCase();
    const posts = document.querySelectorAll('.post');
    posts.forEach(post => {
        const title = post.querySelector('.post-title').innerText.toUpperCase();
        const body = post.querySelector('.post-body').innerText.toUpperCase();
        if (title.indexOf(input) > -1 || body.indexOf(input) > -1) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    })
}


loadPosts();

FILTER.addEventListener('input', handleFilterInput)


window.addEventListener('scroll', () => {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 5) {
        showLoading();
    }
})
