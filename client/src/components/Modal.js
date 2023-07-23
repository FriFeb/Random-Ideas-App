class Modal {
    #modal = document.querySelector('#modal');
    #modalBtn = document.querySelector('#modal-btn');

    constructor() {
        this.addEventListeners();
    }

    addEventListeners() {
        this.#modalBtn.addEventListener('click', this.openForm.bind(this));
        window.addEventListener('click', this.clickOutside.bind(this));
        document.addEventListener('closeModal', () => this.closeForm());
    }

    openForm() {
        this.#modal.style.display = 'block';
    }

    closeForm() {
        this.#modal.style.display = 'none';
    }

    clickOutside(e) {
        if (e.target === this.#modal) {
            this.closeForm();
        }
    }
}

export default Modal;