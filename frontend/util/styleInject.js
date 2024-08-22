render();
function render() {
    const scriptPath = new URL(import.meta.url).href;
    const scriptDirectory = scriptPath.substring(0, scriptPath.lastIndexOf('/'));

    const headerPath = `${scriptDirectory}/../injection/bootstrapInject.html`;

    const cssPath = `${scriptDirectory}/../style/style.css`;

    fetch(headerPath)
        .then(response => response.text())
        .then(data => {
            document.head.insertAdjacentHTML('beforeend', data);
        })
        .catch(error => console.error('Erro ao carregar o header:', error));

    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = cssPath;
    document.head.appendChild(linkElement);
}