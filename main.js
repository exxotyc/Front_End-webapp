$(function () {

  // CARGA DE DATOS EN TABLA

  $('#cargarDatos').on('click', () => {
    const tipoSeleccionado = $('#selector').val();
    const endpoint = `https://jsonplaceholder.typicode.com/${tipoSeleccionado}`;

    $.getJSON(endpoint, (respuesta) => {
      const columnas = Object.keys(respuesta[0]).map((clave) => ({
        title: clave[0].toUpperCase() + clave.slice(1),
        data: clave
      }));

      $('#tablaDatos').DataTable({
        destroy: true,
        data: respuesta,
        columns: columnas
      });
    });
  });

  // VALIDACIONES GENÉRICAS
  
  const validarCampo = (id, condicion, mensaje) => {
    const $campo = $(`#${id}`);
    $campo.removeClass('error').next('.error-message').remove();

    if (!condicion) {
      $campo.addClass('error').after(`<div class="error-message">${mensaje}</div>`);
      return 1;
    }
    return 0;
  };

  const limpiarFormulario = (formId) => {
    $(`#${formId}`)[0].reset();
    $(`#${formId} .error`).removeClass('error');
    $(`#${formId} .error-message`).remove();
  };

  // FORMULARIO USUARIO

  if ($('#formUsuario').length) {
    $('#formUsuario').on('submit', function (e) {
      e.preventDefault();
      let errores = 0;

      errores += validarCampo('nombre', $('#nombre').val().trim() !== '', 'El nombre es obligatorio.');
      errores += validarCampo('usuario', $('#usuario').val().trim() !== '', 'El usuario es obligatorio.');
      errores += validarCampo('fecha', /^\d{2}\/\d{2}\/\d{4}$/.test($('#fecha').val()), 'Fecha inválida (dd/MM/yyyy).');
      errores += validarCampo('email', /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($('#email').val()), 'Correo inválido.');

      if (errores === 0) {
        alert('Usuario creado con éxito.');
        limpiarFormulario('formUsuario');
      }
    });

    $('#cancelarUsuario').on('click', () => limpiarFormulario('formUsuario'));
  }

  // FORMULARIO OTRO OBJETO
 
  if ($('#formOtro').length) {
    $('#formOtro').on('submit', function (e) {
      e.preventDefault();
      let errores = 0;

      errores += validarCampo('titulo', $('#titulo').val().trim() !== '', 'El título es obligatorio.');

      if (errores === 0) {
        alert('Objeto creado exitosamente.');
        limpiarFormulario('formOtro');
      }
    });

    $('#cancelarOtro').on('click', () => limpiarFormulario('formOtro'));
  }

  // FORMULARIO PUBLICACIÓN

  if ($('#formPublicacion').length) {
    $('#formPublicacion').on('submit', function (e) {
      e.preventDefault();
      let errores = 0;

      errores += validarCampo('titulo', $('#titulo').val().trim() !== '', 'El título es obligatorio.');
      errores += validarCampo('contenido', $('#contenido').val().trim() !== '', 'El contenido es obligatorio.');

      if (errores === 0) {
        alert('Publicación guardada correctamente.');
        limpiarFormulario('formPublicacion');
      }
    });

    $('#cancelarPublicacion').on('click', () => limpiarFormulario('formPublicacion'));
  }
});
