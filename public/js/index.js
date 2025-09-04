// Variables globales para almacenar datos
let ingresos = []
let egresos = []
const jornales = []
const cosechas = []
const ventas = []

// Función para mostrar secciones
function showSection(sectionId) {
  // Ocultar todas las secciones
  const sections = document.querySelectorAll(".content-section")
  sections.forEach((section) => section.classList.remove("active"))

  // Remover clase active de todos los botones
  const buttons = document.querySelectorAll(".nav-btn")
  buttons.forEach((btn) => btn.classList.remove("active"))

  // Mostrar la sección seleccionada
  document.getElementById(sectionId).classList.add("active")

  // Activar el botón correspondiente
  event.target.classList.add("active")
}

// Función para formatear números como moneda
function formatCurrency(amount) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(amount)
}

// Función para formatear fechas
function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString("es-CO")
}

// Inicializar fecha actual en los formularios
function initializeDates() {
  const today = new Date().toISOString().split("T")[0]
  const dateInputs = document.querySelectorAll('input[type="date"]')
  dateInputs.forEach((input) => {
    if (!input.value) {
      input.value = today
    }
  })
}

// Formulario de Ingresos
document.getElementById("form-ingresos").addEventListener("submit", function (e) {
  e.preventDefault()

  const ingreso = {
    id: Date.now(),
    tipo: document.getElementById("tipo-ingreso").value,
    fecha: document.getElementById("fecha-ingreso").value,
    cliente: document.getElementById("cliente-ingreso").value,
    cantidad: Number.parseFloat(document.getElementById("cantidad-ingreso").value) || 0,
    precioUnitario: Number.parseFloat(document.getElementById("precio-unitario").value) || 0,
    monto: Number.parseFloat(document.getElementById("monto-ingreso").value),
    descripcion: document.getElementById("descripcion-ingreso").value,
  }

  ingresos.push(ingreso)
  updateIngresosTable()
  updateDashboard()
  this.reset()
  initializeDates()

  showAlert("Ingreso registrado exitosamente", "success")
})

// Formulario de Egresos
document.getElementById("form-egresos").addEventListener("submit", function (e) {
  e.preventDefault()

  const egreso = {
    id: Date.now(),
    tipo: document.getElementById("tipo-egreso").value,
    fecha: document.getElementById("fecha-egreso").value,
    proveedor: document.getElementById("proveedor-egreso").value,
    monto: Number.parseFloat(document.getElementById("monto-egreso").value),
    descripcion: document.getElementById("descripcion-egreso").value,
  }

  egresos.push(egreso)
  updateEgresosTable()
  updateDashboard()
  this.reset()
  initializeDates()

  showAlert("Egreso registrado exitosamente", "success")
})

// Formulario de Jornales
document.getElementById("form-jornales").addEventListener("submit", function (e) {
  e.preventDefault()

  const jornal = {
    id: Date.now(),
    empleado: document.getElementById("empleado-jornal").value,
    fecha: document.getElementById("fecha-jornal").value,
    horas: Number.parseFloat(document.getElementById("horas-trabajadas").value),
    tarifa: Number.parseFloat(document.getElementById("tarifa-hora").value),
    actividad: document.getElementById("actividad-jornal").value,
    total: Number.parseFloat(document.getElementById("total-jornal").value),
  }

  jornales.push(jornal)
  updateJornalesTable()
  updateDashboard()
  this.reset()
  initializeDates()

  showAlert("Jornal registrado exitosamente", "success")
})

// Formulario de Cosechas
document.getElementById("form-cosechas").addEventListener("submit", function (e) {
  e.preventDefault()

  const cosecha = {
    id: Date.now(),
    fecha: document.getElementById("fecha-cosecha").value,
    lote: document.getElementById("lote-cosecha").value,
    kilos: Number.parseFloat(document.getElementById("kilos-cosechados").value),
    calidad: document.getElementById("calidad-cafe").value,
    empleados: document.getElementById("empleados-cosecha").value,
    observaciones: document.getElementById("observaciones-cosecha").value,
  }

  cosechas.push(cosecha)
  updateCosechasTable()
  updateDashboard()
  this.reset()
  initializeDates()

  showAlert("Cosecha registrada exitosamente", "success")
})

// Formulario de Ventas
document.getElementById("form-ventas").addEventListener("submit", function (e) {
  e.preventDefault()

  const venta = {
    id: Date.now(),
    fecha: document.getElementById("fecha-venta").value,
    cliente: document.getElementById("cliente-venta").value,
    kilos: Number.parseFloat(document.getElementById("kilos-vendidos").value),
    precio: Number.parseFloat(document.getElementById("precio-venta").value),
    calidad: document.getElementById("calidad-vendida").value,
    total: Number.parseFloat(document.getElementById("total-venta").value),
    formaPago: document.getElementById("forma-pago").value,
  }

  ventas.push(venta)
  updateVentasTable()
  updateDashboard()
  this.reset()
  initializeDates()

  showAlert("Venta registrada exitosamente", "success")
})

// Calcular total de jornal automáticamente
document.getElementById("horas-trabajadas").addEventListener("input", calcularTotalJornal)
document.getElementById("tarifa-hora").addEventListener("input", calcularTotalJornal)

function calcularTotalJornal() {
  const horas = Number.parseFloat(document.getElementById("horas-trabajadas").value) || 0
  const tarifa = Number.parseFloat(document.getElementById("tarifa-hora").value) || 0
  const total = horas * tarifa
  document.getElementById("total-jornal").value = total.toFixed(2)
}

// Calcular total de venta automáticamente
document.getElementById("kilos-vendidos").addEventListener("input", calcularTotalVenta)
document.getElementById("precio-venta").addEventListener("input", calcularTotalVenta)

function calcularTotalVenta() {
  const kilos = Number.parseFloat(document.getElementById("kilos-vendidos").value) || 0
  const precio = Number.parseFloat(document.getElementById("precio-venta").value) || 0
  const total = kilos * precio
  document.getElementById("total-venta").value = total.toFixed(2)
}

// Calcular monto total de ingreso automáticamente
document.getElementById("cantidad-ingreso").addEventListener("input", calcularMontoIngreso)
document.getElementById("precio-unitario").addEventListener("input", calcularMontoIngreso)

function calcularMontoIngreso() {
  const cantidad = Number.parseFloat(document.getElementById("cantidad-ingreso").value) || 0
  const precio = Number.parseFloat(document.getElementById("precio-unitario").value) || 0
  const monto = cantidad * precio
  document.getElementById("monto-ingreso").value = monto.toFixed(2)
}

// Actualizar tablas
function updateIngresosTable() {
  const tbody = document.getElementById("tabla-ingresos")
  tbody.innerHTML = ""

  ingresos.forEach((ingreso) => {
    const row = tbody.insertRow()
    row.innerHTML = `
            <td>${formatDate(ingreso.fecha)}</td>
            <td>${ingreso.tipo}</td>
            <td>${ingreso.cliente}</td>
            <td>${ingreso.cantidad} kg</td>
            <td>${formatCurrency(ingreso.precioUnitario)}</td>
            <td>${formatCurrency(ingreso.monto)}</td>
            <td>
                <button onclick="editarIngreso(${ingreso.id})" style="background: #28a745; color: white; border: none; padding: 5px 10px; border-radius: 3px; margin-right: 5px;">Editar</button>
                <button onclick="eliminarIngreso(${ingreso.id})" style="background: #dc3545; color: white; border: none; padding: 5px 10px; border-radius: 3px;">Eliminar</button>
            </td>
        `
  })
}

function updateEgresosTable() {
  const tbody = document.getElementById("tabla-egresos")
  tbody.innerHTML = ""

  egresos.forEach((egreso) => {
    const row = tbody.insertRow()
    row.innerHTML = `
            <td>${formatDate(egreso.fecha)}</td>
            <td>${egreso.tipo}</td>
            <td>${egreso.proveedor}</td>
            <td>${formatCurrency(egreso.monto)}</td>
            <td>${egreso.descripcion}</td>
            <td>
                <button onclick="editarEgreso(${egreso.id})" style="background: #28a745; color: white; border: none; padding: 5px 10px; border-radius: 3px; margin-right: 5px;">Editar</button>
                <button onclick="eliminarEgreso(${egreso.id})" style="background: #dc3545; color: white; border: none; padding: 5px 10px; border-radius: 3px;">Eliminar</button>
            </td>
        `
  })
}

function updateJornalesTable() {
  const tbody = document.getElementById("tabla-jornales")
  tbody.innerHTML = ""

  jornales.forEach((jornal) => {
    const row = tbody.insertRow()
    row.innerHTML = `
            <td>${formatDate(jornal.fecha)}</td>
            <td>${jornal.empleado}</td>
            <td>${jornal.horas} hrs</td>
            <td>${formatCurrency(jornal.tarifa)}</td>
            <td>${jornal.actividad}</td>
            <td>${formatCurrency(jornal.total)}</td>
            <td><span style="background: #28a745; color: white; padding: 3px 8px; border-radius: 3px; font-size: 0.8em;">Pagado</span></td>
        `
  })
}

function updateCosechasTable() {
  const tbody = document.getElementById("tabla-cosechas")
  tbody.innerHTML = ""

  cosechas.forEach((cosecha) => {
    const row = tbody.insertRow()
    row.innerHTML = `
            <td>${formatDate(cosecha.fecha)}</td>
            <td>${cosecha.lote}</td>
            <td>${cosecha.kilos} kg</td>
            <td>${cosecha.calidad}</td>
            <td>${cosecha.empleados}</td>
            <td><span style="background: #17a2b8; color: white; padding: 3px 8px; border-radius: 3px; font-size: 0.8em;">Procesado</span></td>
            <td>
                <button onclick="verDetalleCosecha(${cosecha.id})" style="background: #17a2b8; color: white; border: none; padding: 5px 10px; border-radius: 3px;">Ver</button>
            </td>
        `
  })
}

function updateVentasTable() {
  const tbody = document.getElementById("tabla-ventas")
  tbody.innerHTML = ""

  ventas.forEach((venta) => {
    const row = tbody.insertRow()
    row.innerHTML = `
            <td>${formatDate(venta.fecha)}</td>
            <td>${venta.cliente}</td>
            <td>${venta.kilos} kg</td>
            <td>${formatCurrency(venta.precio)}</td>
            <td>${venta.calidad}</td>
            <td>${formatCurrency(venta.total)}</td>
            <td>${venta.formaPago}</td>
        `
  })
}

// Actualizar dashboard
function updateDashboard() {
  const totalIngresos = ingresos.reduce((sum, ingreso) => sum + ingreso.monto, 0)
  const totalEgresos = egresos.reduce((sum, egreso) => sum + egreso.monto, 0)
  const totalCosechado = cosechas.reduce((sum, cosecha) => sum + cosecha.kilos, 0)
  const totalVendido = ventas.reduce((sum, venta) => sum + venta.kilos, 0)

  document.getElementById("ingresos-mes").textContent = formatCurrency(totalIngresos)
  document.getElementById("egresos-mes").textContent = formatCurrency(totalEgresos)
  document.getElementById("cafe-cosechado").textContent = totalCosechado + " kg"
  document.getElementById("cafe-vendido").textContent = totalVendido + " kg"
}

// Función para mostrar alertas
function showAlert(message, type) {
  const alertDiv = document.createElement("div")
  alertDiv.className = `alert alert-${type}`
  alertDiv.textContent = message

  const container = document.querySelector(".container")
  container.insertBefore(alertDiv, container.firstChild)

  setTimeout(() => {
    alertDiv.remove()
  }, 3000)
}

// Funciones de edición y eliminación (placeholder)
function editarIngreso(id) {
  alert("Función de edición en desarrollo")
}

function eliminarIngreso(id) {
  if (confirm("¿Está seguro de eliminar este ingreso?")) {
    ingresos = ingresos.filter((ingreso) => ingreso.id !== id)
    updateIngresosTable()
    updateDashboard()
    showAlert("Ingreso eliminado exitosamente", "success")
  }
}

function editarEgreso(id) {
  alert("Función de edición en desarrollo")
}

function eliminarEgreso(id) {
  if (confirm("¿Está seguro de eliminar este egreso?")) {
    egresos = egresos.filter((egreso) => egreso.id !== id)
    updateEgresosTable()
    updateDashboard()
    showAlert("Egreso eliminado exitosamente", "success")
  }
}

function verDetalleCosecha(id) {
  const cosecha = cosechas.find((c) => c.id === id)
  if (cosecha) {
    alert(
      `Detalle de Cosecha:\nFecha: ${cosecha.fecha}\nLote: ${cosecha.lote}\nKilos: ${cosecha.kilos}\nCalidad: ${cosecha.calidad}\nObservaciones: ${cosecha.observaciones}`,
    )
  }
}

// Formulario de reportes
document.getElementById("form-reportes").addEventListener("submit", (e) => {
  e.preventDefault()

  const tipoReporte = document.getElementById("tipo-reporte").value
  const fechaInicio = document.getElementById("fecha-inicio").value
  const fechaFin = document.getElementById("fecha-fin").value
  const formato = document.getElementById("formato-reporte").value

  showAlert(`Generando reporte ${tipoReporte} desde ${fechaInicio} hasta ${fechaFin} en formato ${formato}`, "success")
})

// Inicializar la aplicación
document.addEventListener("DOMContentLoaded", () => {
  initializeDates()
  updateDashboard()

  // Datos de ejemplo
  const ejemploIngresos = [
    {
      id: 1,
      tipo: "venta-cafe",
      fecha: "2024-01-15",
      cliente: "Café Premium S.A.",
      cantidad: 150,
      precioUnitario: 3600,
      monto: 540000,
      descripcion: "Venta de café premium",
    },
  ]

  const ejemploEgresos = [
    {
      id: 1,
      tipo: "insumos",
      fecha: "2024-01-14",
      proveedor: "Agroquímicos del Valle",
      monto: 350000,
      descripcion: "Compra de fertilizantes",
    },
  ]

  ingresos.push(...ejemploIngresos)
  egresos.push(...ejemploEgresos)

  updateIngresosTable()
  updateEgresosTable()
  updateDashboard()
})
function editarIngreso(boton) {
    const fila = boton.closest("tr");
    alert("Editar registro de: " + fila.cells[0].textContent);
    // Aquí puedes abrir un modal o formulario de edición
  }

  function eliminarIngreso(boton) {
    const fila = boton.closest("tr");
    if (confirm("¿Seguro que deseas eliminar este registro?")) {
      fila.remove();
    }
  }