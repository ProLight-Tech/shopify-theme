class ProductCollectionPreview extends HTMLElement {
  constructor() {
    super();
    this.selectedVariant = null;
    this.previousNode = null;
  }

  connectedCallback() {
    const linkButton = this.querySelector('.link-to-product');
    const skuNode = this.querySelector('.sku');
    const variantNode = this.querySelector('.product-variant');
    const skuContainer = this.querySelector('.sku-container');

    this.querySelectorAll('.product-preview-picker-button').forEach((button, index) => {
      if (index === 0) {
        this.selectedVariant = button.getAttribute('data-variant-id');
        this.previousNode = button;
      }

      button.addEventListener('click', () => {
        const productUrl = button.getAttribute('data-product-url');
        const variant = button.getAttribute('data-variant-id');
        const variantName = button.getAttribute('data-variant-name');
        const sku = button.getAttribute('data-variant-sku');

        if (this.selectedVariant !== variant) {
          this.selectedVariant = variant;
          this.previousNode.classList.remove('swatch-active');
          button.classList.add('swatch-active');
          this.previousNode = button;

          if (sku !== '') {
            skuContainer.innerHTML = `
              <p class="text-body">SKU:</p>
              <span class="sku text-body">${sku}</span>
            `;
            skuNode.textContent = sku;
          } else {
            skuContainer.innerHTML = '';
          }
          variantNode.textContent = variantName;
          linkButton.setAttribute('href', `${productUrl}?variant=${variant}`);
        }
      });
    });
  }
}

customElements.define('product-collection-preview', ProductCollectionPreview);
