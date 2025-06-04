class NavigationDropdown extends HTMLElement {
  constructor() {
    super();
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  handleOutsideClick(event) {
    // Close all menus if clicked outside this component
    if (!this.contains(event.target)) {
      this.closeAllMenus();
    }
  }

  closeAllMenus() {
    this.querySelectorAll('.submenu').forEach((item) => {
      item.classList.remove('underlined');
    });

    this.querySelectorAll('.submenu + ul').forEach((ul) => {
      ul.classList.remove('open');
      ul.classList.add('closed');
    });
  }

  connectedCallback() {
    document.addEventListener('click', this.handleOutsideClick);

    this.querySelectorAll('.submenu').forEach((item) => {
      item.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent click from bubbling to document

        const ul = item.nextElementSibling;
        const isOpen = ul.classList.contains('open');

        // Close all menus first
        this.closeAllMenus();

        if (!isOpen) {
          // Reopen only the clicked one
          item.classList.add('underlined');
          ul.classList.add('open');
          ul.classList.remove('closed');
        }
      });
    });
  }

  disconnectedCallback() {
    document.removeEventListener('click', this.handleOutsideClick);
  }
}

customElements.define('navigation-dropdown', NavigationDropdown);
