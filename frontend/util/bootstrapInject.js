render()
function render() {

    const scriptPath = new URL(import.meta.url).href;
    const scriptDirectory = scriptPath.substring(0, scriptPath.lastIndexOf('/'));


    const headerPath = `${scriptDirectory}/../injection/bootstrapInject.html`;

    fetch(headerPath)
        .then(response => response.text())
        .then(data => {
            document.head.insertAdjacentHTML('beforeend', data);
        })
        .catch(error => console.error('Erro ao carregar o header:', error));

}
