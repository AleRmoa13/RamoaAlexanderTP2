document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById('searchInput');
    const resultList = document.getElementById('resultList');
    let autos = [];
    
    fetch('autos.js')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el archivo JSON');
            }
            return response.json();
        })
        .then(data => {
            autos = data;
          
            mostrarResultados(autos);
        })
        .catch(error => {
            console.error('Error cargando los autos:', error);
            
        });

    function mostrarResultados(resultados) {
        resultList.innerHTML = '';
        if (resultados.length === 0) {
            resultList.innerHTML = '<li class="list-group-item">No se encontraron resultados</li>';
            return;
        }
        resultados.forEach(auto => {
            const li = document.createElement('li');
            li.classList.add('list-group-item');
            li.textContent = `${auto.nombre} - ${auto.descripcion} (Categoría: ${auto.categoria})`;
            resultList.appendChild(li);
        });
    }

    searchInput.addEventListener('input', () => {
        if (autos.length === 0) {
            return; 
        
        }

        const query = searchInput.value.toLowerCase();
        const resultadosFiltrados = autos.filter(auto => 
            auto.nombre.toLowerCase().includes(query) || 
            auto.categoria.toLowerCase().includes(query)
        );
        mostrarResultados(resultadosFiltrados);
    });
});