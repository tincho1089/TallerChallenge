import '@testing-library/jest-dom';

// Polyfill for requestSubmit
if (!HTMLFormElement.prototype.requestSubmit) {
  HTMLFormElement.prototype.requestSubmit = function() {
    if (this.checkValidity()) {
      this.submit();
    }
  };
}
