import IdeasAPI from "../services/IdeasAPI";
import IdeaList from "./IdeaList";

class IdeaForm {
    #formModal = document.querySelector('#form-modal');
    #form;

    constructor() {
        this.render();
    }

    addEventListeners() {
        this.#form.addEventListener('submit', this.getIdea.bind(this));
    }

    render() {
        this.#formModal.innerHTML = `
        <form id="idea-form">
            <div class="form-control">
                <label for="idea-text">Enter a Username</label>
                <input type="text" name="username" id="username" value="${localStorage.getItem('username') || '' }"
                 />
            </div>
            <div class="form-control">
                <label for="idea-text">What's Your Idea?</label>
                <textarea name="text" id="idea-text"></textarea>
            </div>
            <div class="form-control">
                <label for="tag">Tag</label>
                <input type="text" name="tag" id="tag" />
            </div>
            <button class="btn" type="submit" id="submit">Submit</button>
        </form>
      `;

        this.#form = document.querySelector('#idea-form');
        this.addEventListeners();
    }

    async getIdea(e) {
        e.preventDefault();

        if (
            !this.#form.elements.tag.value ||
            !this.#form.elements.text.value ||
            !this.#form.elements.username.value
        ) {
            alert("Please enter all fields");
            return;
        }

        // Save user to local storage
        localStorage.setItem('username', this.#form.elements.username.value);

        const idea = {
            tag: this.#form.elements.tag.value,
            text: this.#form.elements.text.value,
            username: this.#form.elements.username.value,
        }

        // Add an idea to server
        const newIdea = await IdeasAPI.createIdea(idea);

        // Show all ideas in the list
        const ideaList = new IdeaList();
        ideaList.getIdeas();

        this.clearFields();
        this.render();

        document.dispatchEvent(new Event('closeModal'));
    }

    clearFields() {
        this.#form.elements.tag.value = '';
        this.#form.elements.text.value = '';
        this.#form.elements.username.value = '';
    }
}

export default IdeaForm;