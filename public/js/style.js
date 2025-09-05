const form = document.getElementById('formRegistro');
    const tipoEntidad = document.getElementById('tipoEntidad');
    const personaFields = document.querySelectorAll('.persona-field');
    const empresaFields = document.querySelectorAll('.empresa-field');
    const preview = document.getElementById('preview');

    tipoEntidad.addEventListener('change', () => {
      if (tipoEntidad.value === 'empresa') {
        personaFields.forEach(f => f.classList.add('d-none'));
        empresaFields.forEach(f => f.classList.remove('d-none'));
      } else {
        personaFields.forEach(f => f.classList.remove('d-none'));
        empresaFields.forEach(f => f.classList.add('d-none'));
      }
    });

    form.addEventListener('input', () => {
      const data = {
        tipoEntidad: tipoEntidad.value,
        tipoId: document.getElementById('tipoId').value,
        numeroId: document.getElementById('numeroId').value,
        nombres: document.getElementById('nombres').value,
        apellidos: document.getElementById('apellidos').value,
        nit: document.getElementById('nit').value,
        razonSocial: document.getElementById('razonSocial').value,
        correo: document.getElementById('correo').value,
        telefono: document.getElementById('telefono').value,
        direccion: document.getElementById('direccion').value,
        municipio: document.getElementById('municipio').value
      };
      preview.textContent = JSON.stringify(data, null, 2);
    });