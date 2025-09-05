let empleados = JSON.parse(localStorage.getItem('empleados')) || [];

function guardarEmpleados() {
  localStorage.setItem('empleados', JSON.stringify(empleados));
}

function renderTablaEmpleados() {
  const tbody = document.getElementById('tabla-empleados');
  tbody.innerHTML = '';
  empleados.forEach((emp, idx) => {
    tbody.innerHTML += `
      <tr>
        <td>${emp.nombre}</td>
        <td>${emp.horas}</td>
        <td>
          <span style="background: ${emp.estado === 'Activo' ? '#28a745' : '#dc3545'}; color: white; padding: 3px 8px; border-radius: 3px;">
            ${emp.estado}
          </span>
        </td>
        <td>
          <button class="btn btn-sm btn-warning me-1" onclick="editarEmpleado(${idx})">Editar Empleado</button>
        </td>
      </tr>
    `;
  });
}

document.addEventListener('DOMContentLoaded', function() {
  renderTablaEmpleados();
  document.getElementById('btnAgregarEmpleado').addEventListener('click', function() {
    document.getElementById('modalEmpleadoLabel').textContent = 'Agregar Empleado';
    document.getElementById('formEmpleado').reset();
    document.getElementById('empleadoId').value = '';
    new bootstrap.Modal(document.getElementById('modalEmpleado')).show();
  });

  document.getElementById('formEmpleado').addEventListener('submit', function(e) {
    e.preventDefault();
    const id = document.getElementById('empleadoId').value;
    const nuevoEmpleado = {
      nombre: document.getElementById('nombreEmpleado').value,
      horas: document.getElementById('horasEmpleado').value,
      estado: document.getElementById('estadoEmpleado').value
    };
    if (id === '') {
      empleados.push(nuevoEmpleado);
    } else {
      empleados[id] = nuevoEmpleado;
    }
    guardarEmpleados();
    bootstrap.Modal.getInstance(document.getElementById('modalEmpleado')).hide();
    renderTablaEmpleados();
  });
});

window.editarEmpleado = function(idx) {
  const emp = empleados[idx];
  document.getElementById('modalEmpleadoLabel').textContent = 'Editar Empleado';
  document.getElementById('empleadoId').value = idx;
  document.getElementById('nombreEmpleado').value = emp.nombre;
  document.getElementById('horasEmpleado').value = emp.horas;
  document.getElementById('estadoEmpleado').value = emp.estado;
  new bootstrap.Modal(document.getElementById('modalEmpleado')).show();
};

window.getEmpleadosRegistrados = function() {
  return empleados;
};

window.renderTablaEmpleados = renderTablaEmpleados;
