document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formularioCitasMedicas');
    const botonGuardar = document.getElementById('botonGuardar');
    const botonLimpiar = document.getElementById('botonLimpiar');
    const botonFiltar = document.getElementById('botonFiltar');
    const botonMostrarTodo = document.getElementById('botonMostrarTodo');
    const filtrarCedulaInput = document.getElementById('filtrarCedula');
    const tablaCitasMedicas = document.getElementById('tablaCitasMedicas').querySelector('tbody');

    let Citas = JSON.parse(localStorage.getItem('Citas')) || [];

    const guardarCitaMedica = () => {
        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const cedula = document.getElementById('cedula').value;
        const fecha = document.getElementById('fecha').value;
        const sintomas = document.getElementById('sintomas').value;

        const nuevaCita = { nombre, apellido, cedula, fecha, sintomas };
        Citas.push(nuevaCita);

        localStorage.setItem('Citas', JSON.stringify(Citas));
        renderCitas();
        formulario.reset();
    };

    const limpiarFormulario = () => {
        formulario.reset();
    };

    const renderCitas = (filtradoCitas = Citas) => {
        tablaCitasMedicas.innerHTML = '';

        filtradoCitas.forEach(({ nombre, apellido, cedula, fecha, sintomas }, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${nombre}</td>
                <td>${apellido}</td>
                <td>${cedula}</td>
                <td>${fecha}</td>
                <td>${sintomas}</td>
                <td><button class="botonEliminar" data-index="${index}">❌</button></td>
            `;
            tablaCitasMedicas.appendChild(row);
        });

        document.querySelectorAll('.botonEliminar').forEach(button => {
            button.addEventListener('click', eliminarCitaMedica);
        });
    };

    const eliminarCitaMedica = (event) => {
        const index = event.target.getAttribute('data-index');
        Citas.splice(index, 1);
        sessionStorage.setItem('Citas', JSON.stringify(Citas));
        renderCitas();
    };

    const fitrarCitaMedica = () => {
        const filtradoCedula = filtrarCedulaInput.value;
        const filtradoCitas = Citas.filter(appointment => appointment.cedula.includes(filtradoCedula));
        renderCitas(filtradoCitas);
    };

    botonGuardar.addEventListener('click', guardarCitaMedica);
    botonLimpiar.addEventListener('click', limpiarFormulario);
    botonFiltar.addEventListener('click', fitrarCitaMedica);
    botonMostrarTodo.addEventListener('click', () => renderCitas());

    renderCitas();
});