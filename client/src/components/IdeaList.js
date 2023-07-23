import IdeasAPI from "../services/IdeasAPI";

class IdeaList {
    #IdeaListEl = document.querySelector('#idea-list');
    #ideas = [];

    constructor() {
        this.getIdeas();
    }

    async getIdeas() {
        try {
            const res = await IdeasAPI.getIdeas();
            this.#ideas = res.data.value;
            this.render();

        } catch (error) {
            console.log(error);
        }
    }

    async deleteIdea(ideaId) {
        try {
            const res = await IdeasAPI.deleteIdea(ideaId);
            this.getIdeas();

        } catch (error) {
            alert('You can not delete this idea');
            console.log(error);
        }
    }

    render() {
        const localUsername = localStorage.getItem('username');

        this.#IdeaListEl.innerHTML = this.#ideas.map((idea) => {
            return `
            <div class="card" data-id="${idea._id}">
            ${localUsername === idea.username
                    ? '<button class="delete"><i class="fas fa-times"></i></button>'
                    : ''
                }
                <h3>${idea.text}</h3>
                <p class="tag tag-${idea.tag.toLowerCase()}">${idea.tag.toUpperCase()}</p>
                <p>
                    Posted on <span class="date">${idea.date}</span> by
                    <span class="author">${idea.username}</span>
                </p>
            </div>
            `;
        }).join('');

        this.addEventListeners();
    }

    addEventListeners() {
        document.addEventListener('click', (e) => {

            if (e.target.classList.contains('fa-times')) {
                e.stopImmediatePropagation();

                const ideaId = e.target.parentElement.parentElement.dataset.id;
                this.deleteIdea(ideaId);
            };
        });
    }
}

export default IdeaList;