import { useState } from 'react'
import './App.css'

function App() {
  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [sesionIniciada, setSesionIniciada] = useState(false)

  const usuariosPrueba = [
  {
    correo: 'paciente@biocheck.com',
    contrasena: 'Paciente123',
    rol: 'paciente'
  },
  {
    correo: 'medico@biocheck.com',
    contrasena: 'Medico123',
    rol: 'medico'
  }
]

  const [pantalla, setPantalla] = useState('inicio')
  const [areaSeleccionada, setAreaSeleccionada] = useState(null)
  const [estudiosAbiertos, setEstudiosAbiertos] = useState({})

  const [origenDetalle, setOrigenDetalle] = useState('resultados')
  const [estudioHistorico, setEstudioHistorico] = useState(null)

  const [mostrarGraficas, setMostrarGraficas] = useState(false)
  const [estudioGraficas, setEstudioGraficas] = useState('')
  const [indiceGrafica, setIndiceGrafica] = useState(0)

  const pruebasPorEstudio = {
  'Biometría Hemática': ['Hemoglobina', 'Hematocrito', 'Leucocitos', 'Plaquetas'],
  'Química Sanguínea': ['Glucosa', 'Urea', 'Creatinina', 'Ácido úrico'],
  'Perfil de Lípidos': ['Colesterol total', 'HDL', 'LDL', 'Triglicéridos'],
  'Electrolitos Séricos': ['Sodio', 'Potasio', 'Cloro'],
  'Perfil Tiroideo': ['TSH', 'T4 Libre']
  }

  const pruebasGraficas = pruebasPorEstudio[estudioGraficas] || []

  const [mostrarRegistro, setMostrarRegistro] = useState(false)
  const [nombreRegistro, setNombreRegistro] = useState('')
  const [correoRegistro, setCorreoRegistro] = useState('')
  const [contrasenaRegistro, setContrasenaRegistro] = useState('')
  const [rolRegistro, setRolRegistro] = useState('paciente')

  const valoresHistoricos = {
    'Biometría Hemática': {
      '15/08/2026': [13.6, 40, 7200, 245000],
      '10/06/2026': [13.4, 39, 7500, 238000],
      '20/04/2026': [13.1, 38, 6900, 252000],
      '12/02/2026': [12.9, 37, 8100, 230000],
      '05/12/2025': [13.2, 39, 7400, 241000]
    },
    'Química Sanguínea': {
      '15/08/2026': [89, 26, 0.85, 4.8],
      '10/06/2026': [94, 29, 0.91, 5.1],
      '20/04/2026': [91, 27, 0.88, 5.0],
      '12/02/2026': [97, 31, 0.94, 5.4],
      '05/12/2025': [95, 28, 0.90, 5.2]
    },
    'Perfil de Lípidos': {
      '15/08/2026': [175, 57, 92, 125],
      '10/06/2026': [184, 53, 99, 145],
      '20/04/2026': [190, 50, 105, 155],
      '12/02/2026': [195, 48, 110, 170],
      '05/12/2025': [202, 46, 116, 180]
    },
    'Electrolitos Séricos': {
      '15/08/2026': [140, 4.2, 102],
      '10/06/2026': [138, 4.1, 100],
      '20/04/2026': [139, 4.4, 103],
      '12/02/2026': [137, 4.0, 101],
      '05/12/2025': [141, 4.3, 104]
    },
    'Perfil Tiroideo': {
      '15/08/2026': [2.0, 1.2],
      '10/06/2026': [2.3, 1.1],
      '20/04/2026': [2.5, 1.0],
      '12/02/2026': [2.8, 1.1],
      '05/12/2025': [3.1, 0.9]
    }
  }

  const obtenerValor = (nombreEstudio, indice, valorActual) => {
    if (origenDetalle !== 'historial') {
      return valorActual
    }

    return (
      valoresHistoricos[nombreEstudio]?.[areaSeleccionada?.fecha]?.[indice] ??
      valorActual
    )
  }

  const paciente = {
    id: 'FNVO-24042001',
    nombre: 'Fernanda Nataly Vallejo Olmos'
  }

  const registrarUsuario = (event) => {
    event.preventDefault()

    if (
      nombreRegistro !== '' &&
      correoRegistro !== '' &&
      contrasenaRegistro !== '' &&
      rolRegistro !== ''
    ) {
    alert(
      `¡Registro realizado correctamente como ${rolRegistro}!`
    )

    setNombreRegistro('')
    setCorreoRegistro('')
    setContrasenaRegistro('')
    setRolRegistro('paciente')
    setMostrarRegistro(false)
    } else {
    alert('¡No olvides completar todos los campos!')
    }
  }
  
  const iniciarSesion = (event) => {
  event.preventDefault()

  if (correo.trim() === '' || contrasena === '') {
    alert('¡No olvides completar todos los campos!')
    return
  }

  const usuarioEncontrado = usuariosPrueba.find(
    (usuario) =>
      usuario.correo === correo.trim() &&
      usuario.contrasena === contrasena
  )

  if (usuarioEncontrado) {
    setSesionIniciada(true)
    setPantalla('inicio')
  } else {
    alert('Correo electrónico o contraseña incorrectos.')
  }
  }

  const cerrarSesion = () => {
    setSesionIniciada(false)
    setCorreo('')
    setContrasena('')
    setPantalla('inicio')
    setAreaSeleccionada(null)
  }

  const verDetalleArea = (area) => {
    setOrigenDetalle('resultados')
    setEstudioHistorico(null)
    setAreaSeleccionada(area)
    setPantalla('detalle')
  }

  const verResultadoHistorico = (area, estudio, registro) => {
    const tiposArea = {
      'Hematología': 'hematologia',
      'Química Clínica': 'quimica',
      'Hormonas': 'hormonas'
    }

    setOrigenDetalle('historial')
    setEstudioHistorico(estudio)

    setAreaSeleccionada({
      area,
      tipo: tiposArea[area],
      fecha: registro.fecha,
      folio: registro.folio,
      pdf: null
    })

    setPantalla('detalle')
  }

  if (mostrarRegistro) {
  return (
    <div className="login-page">
      <div className="login-card">
        <h1>BioCheck</h1>

        <p className="subtitle">
          Tu salud al alcance de un clic
        </p>

        <h2>Crear cuenta</h2>

        <form onSubmit={registrarUsuario}>
          <label>
            Nombre completo
          </label>

          <input
            type="text"
            placeholder="Ingresa tu nombre completo"
            value={nombreRegistro}
            onChange={(event) =>
              setNombreRegistro(event.target.value)
            }
          />

          <label>
            Correo electrónico
          </label>

          <input
            type="email"
            placeholder="ejemplo@correo.com"
            value={correoRegistro}
            onChange={(event) =>
              setCorreoRegistro(event.target.value)
            }
          />

          <label>
            Contraseña
          </label>

          <input
            type="password"
            placeholder="Crea una contraseña"
            value={contrasenaRegistro}
            onChange={(event) =>
              setContrasenaRegistro(event.target.value)
            }
          />

          <label>
            Tipo de usuario
          </label>

          <select
            value={rolRegistro}
            onChange={(event) =>
              setRolRegistro(event.target.value)
            }
          >
            <option value="paciente">
              Paciente
            </option>

            <option value="medico">
              Médico
            </option>
          </select>

          <div className="botones-registro">
            <button
            type="button"
            className="boton-regresar"
            onClick={() => setMostrarRegistro(false)}
            >
              Regresar al inicio de sesión
            </button>

            <button type="submit">
              Crear cuenta
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

  if (
    sesionIniciada &&
    pantalla === 'detalle' &&
    areaSeleccionada
  ) {
    return (
      <div className="dashboard-page">
        <header className="dashboard-header">
          <div>
            <h1>BioCheck</h1>
            <p>Laboratorio de Análisis Clínicos</p>
          </div>

          <button
            className="cerrar-sesion"
            onClick={cerrarSesion}
          >
            Cerrar sesión
          </button>
        </header>

        <main className="dashboard-content">
          <button
            className="boton-regresar"
            onClick={() => setPantalla(origenDetalle)}
          >
            {origenDetalle === 'historial'
              ? 'Regresar al historial'
              : 'Regresar a mis resultados'}
          </button>

          <section className="detalle-resultado">
            <h2>{areaSeleccionada.area}</h2>

            <div className="datos-estudio">
              <p>
                <strong>ID del paciente:</strong> {paciente.id}
              </p>

              <p>
                <strong>Paciente:</strong> {paciente.nombre}
              </p>

              <p>
                <strong>Fecha:</strong> {areaSeleccionada.fecha}
              </p>

              <p>
                <strong>Folio:</strong> {areaSeleccionada.folio}
              </p>

              <p>
                <strong>Estado:</strong> Liberado
              </p>
            </div>

            <h3>Resultados</h3>

            {areaSeleccionada.tipo === 'hematologia' && (
              <div className="tabla-resultados">
                <div className="titulo-estudio">
                  Biometría Hemática
                </div>

                <div className="tabla-fila tabla-encabezado">
                  <span>Prueba</span>
                  <span>Resultado</span>
                  <span>Unidades</span>
                  <span>Valor de referencia</span>
                </div>

                <div className="tabla-fila">
                  <span>Hemoglobina</span>
                  <span>{obtenerValor('Biometría Hemática', 0, 13.8)}</span>
                  <span>g/dL</span>
                  <span>12 - 16</span>
                </div>

                <div className="tabla-fila">
                  <span>Hematocrito</span>
                  <span>{obtenerValor('Biometría Hemática', 1, 41)}</span>
                  <span>%</span>
                  <span>36 - 46</span>
                </div>

                <div className="tabla-fila">
                  <span>Leucocitos</span>
                  <span>{obtenerValor('Biometría Hemática', 2, 7500).toLocaleString('en-US')}</span>
                  <span>/µL</span>
                  <span>4,500 - 11,000</span>
                </div>

                <div className="tabla-fila">
                  <span>Plaquetas</span>
                  <span>{obtenerValor('Biometría Hemática', 3, 250000).toLocaleString('en-US')}</span>
                  <span>/µL</span>
                  <span>150,000 - 450,000</span>
                </div>
              </div>
            )}

            {areaSeleccionada.tipo === 'quimica' && (
              <div className="tabla-resultados">
                
              {(origenDetalle !== 'historial' ||
              estudioHistorico === 'Química Sanguínea') && (
              <>

                <div className="titulo-estudio">
                  Química Sanguínea
                </div>

                <div className="tabla-fila tabla-encabezado">
                  <span>Prueba</span>
                  <span>Resultado</span>
                  <span>Unidades</span>
                  <span>Valor de referencia</span>
                </div>

                <div className="tabla-fila">
                  <span>Glucosa</span>
                  <span>{obtenerValor('Química Sanguínea', 0, 92)}</span>
                  <span>mg/dL</span>
                  <span>70 - 100</span>
                </div>

                <div className="tabla-fila">
                  <span>Urea</span>
                  <span>{obtenerValor('Química Sanguínea', 1, 28)}</span>
                  <span>mg/dL</span>
                  <span>15 - 40</span>
                </div>

                <div className="tabla-fila">
                  <span>Creatinina</span>
                  <span>{obtenerValor('Química Sanguínea', 2, 0.90).toFixed(2)}</span>
                  <span>mg/dL</span>
                  <span>0.60 - 1.20</span>
                </div>

                <div className="tabla-fila">
                  <span>Ácido úrico</span>
                  <span>{obtenerValor('Química Sanguínea', 3, 5.2)}</span>
                  <span>mg/dL</span>
                  <span>2.5 - 7.2</span>
                </div>

              </>
              )}

              {(origenDetalle !== 'historial' ||
              estudioHistorico === 'Perfil de Lípidos') && (
              <>

                <div className="titulo-estudio">
                  Perfil de Lípidos
                </div>

                <div className="tabla-fila tabla-encabezado">
                  <span>Prueba</span>
                  <span>Resultado</span>
                  <span>Unidades</span>
                  <span>Valor de referencia</span>
                </div>

                <div className="tabla-fila">
                  <span>Colesterol total</span>
                  <span>{obtenerValor('Perfil de Lípidos', 0, 180)}</span>
                  <span>mg/dL</span>
                  <span>Menor de 200</span>
                </div>

                <div className="tabla-fila">
                  <span>HDL</span>
                  <span>{obtenerValor('Perfil de Lípidos', 1, 55)}</span>
                  <span>mg/dL</span>
                  <span>Mayor de 40</span>
                </div>

                <div className="tabla-fila">
                  <span>LDL</span>
                  <span>{obtenerValor('Perfil de Lípidos', 2, 95)}</span>
                  <span>mg/dL</span>
                  <span>Menor de 100</span>
                </div>

                <div className="tabla-fila">
                  <span>Triglicéridos</span>
                  <span>{obtenerValor('Perfil de Lípidos', 3, 130)}</span>
                  <span>mg/dL</span>
                  <span>Menor de 150</span>
                </div>

              </>
              )}

              {(origenDetalle !== 'historial' ||
              estudioHistorico === 'Electrolitos Séricos') && (
              <>
                
                <div className="titulo-estudio">
                  Electrolitos Séricos
                </div>

                <div className="tabla-fila tabla-encabezado">
                  <span>Prueba</span>
                  <span>Resultado</span>
                  <span>Unidades</span>
                  <span>Valor de referencia</span>
                </div>

                <div className="tabla-fila">
                  <span>Sodio</span>
                  <span>{obtenerValor('Electrolitos Séricos', 0, 139)}</span>
                  <span>mmol/L</span>
                  <span>135 - 145</span>
                </div>

                <div className="tabla-fila">
                  <span>Potasio</span>
                  <span>{obtenerValor('Electrolitos Séricos', 1, 4.3)}</span>
                  <span>mmol/L</span>
                  <span>3.5 - 5.1</span>
                </div>

                <div className="tabla-fila">
                  <span>Cloro</span>
                  <span>{obtenerValor('Electrolitos Séricos', 2, 101)}</span>
                  <span>mmol/L</span>
                  <span>98 - 107</span>
                </div>

              </>
              )}

              </div>
            
            )}

            {areaSeleccionada.tipo === 'hormonas' && (
              <div className="tabla-resultados">
                <div className="titulo-estudio">
                  Perfil Tiroideo
                </div>

                <div className="tabla-fila tabla-encabezado">
                  <span>Prueba</span>
                  <span>Resultado</span>
                  <span>Unidades</span>
                  <span>Valor de referencia</span>
                </div>

                <div className="tabla-fila">
                  <span>TSH</span>
                  <span>{obtenerValor('Perfil Tiroideo', 0, 2.1)}</span>
                  <span>µUI/mL</span>
                  <span>0.4 - 4.0</span>
                </div>

                <div className="tabla-fila">
                  <span>T4 Libre</span>
                  <span>{obtenerValor('Perfil Tiroideo', 1, 1.2)}</span>
                  <span>ng/dL</span>
                  <span>0.8 - 1.8</span>
                </div>
              </div>
            )}

            {origenDetalle === 'resultados' && areaSeleccionada.pdf && (
              <a
                href={areaSeleccionada.pdf}
                download
                className="boton-descargar"
              >
                Descargar resultado
              </a>
            )}
          </section>
        </main>
      </div>
    )
  }

  if (sesionIniciada && pantalla === 'historial') {
  const historial = [
    {
      area: 'Hematología',
      estudios: [
        {
          nombre: 'Biometría Hemática',
          registros: [
            { fecha: '15/08/2026', folio: 'BC-HEM-15082026-01425' },
            { fecha: '10/06/2026', folio: 'BC-HEM-10062026-01201' },
            { fecha: '20/04/2026', folio: 'BC-HEM-20042026-01102' },
            { fecha: '12/02/2026', folio: 'BC-HEM-12022026-00987' },
            { fecha: '05/12/2025', folio: 'BC-HEM-05122025-00842' }
          ]
        }
      ]
    },
    {
      area: 'Química Clínica',
      estudios: [
        {
          nombre: 'Química Sanguínea',
          registros: [
            { fecha: '15/08/2026', folio: 'BC-QC-15082026-01321' },
            { fecha: '10/06/2026', folio: 'BC-QC-10062026-01215' },
            { fecha: '20/04/2026', folio: 'BC-QC-20042026-01120' },
            { fecha: '12/02/2026', folio: 'BC-QC-12022026-00954' },
            { fecha: '05/12/2025', folio: 'BC-QC-05122025-00831' }
          ]
        },
        {
          nombre: 'Perfil de Lípidos',
          registros: [
            { fecha: '15/08/2026', folio: 'BC-QC-15082026-01321' },
            { fecha: '10/06/2026', folio: 'BC-QC-10062026-01215' },
            { fecha: '20/04/2026', folio: 'BC-QC-20042026-01120' },
            { fecha: '12/02/2026', folio: 'BC-QC-12022026-00954' },
            { fecha: '05/12/2025', folio: 'BC-QC-05122025-00831' }
          ]
        },
        {
          nombre: 'Electrolitos Séricos',
          registros: [
            { fecha: '15/08/2026', folio: 'BC-QC-15082026-01321' },
            { fecha: '10/06/2026', folio: 'BC-QC-10062026-01215' },
            { fecha: '20/04/2026', folio: 'BC-QC-20042026-01120' },
            { fecha: '12/02/2026', folio: 'BC-QC-12022026-00954' },
            { fecha: '05/12/2025', folio: 'BC-QC-05122025-00831' }
          ]
        }
      ]
    },
    {
      area: 'Hormonas',
      estudios: [
        {
          nombre: 'Perfil Tiroideo',
          registros: [
            { fecha: '15/08/2026', folio: 'BC-HOR-15082026-01482' },
            { fecha: '10/06/2026', folio: 'BC-HOR-10062026-01316' },
            { fecha: '20/04/2026', folio: 'BC-HOR-20042026-01421' },
            { fecha: '12/02/2026', folio: 'BC-HOR-12022026-00975' },
            { fecha: '05/12/2025', folio: 'BC-HOR-05122025-00864' }
          ]
        }
      ]
    }
  ]

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div>
          <h1>BioCheck</h1>
          <p>Laboratorio de Análisis Clínicos</p>
        </div>

        <button
          className="cerrar-sesion"
          onClick={cerrarSesion}
        >
          Cerrar sesión
        </button>
      </header>

      <main className="dashboard-content">
        <button
          className="boton-regresar"
          onClick={() => setPantalla('inicio')}
        >
          Regresar al inicio
        </button>

        <section className="bienvenida">
          <h2>📊 Historial de resultados</h2>
          <p>
            Consulta los resultados de tus estudios anteriores.
          </p>
        </section>

        <section className="datos-paciente">
          <p>
            <strong>ID del paciente:</strong> {paciente.id}
          </p>
          <p>
            <strong>Paciente:</strong> {paciente.nombre}
          </p>
        </section>

        <section className="lista-resultados">
          {historial.map((grupo) => (
            <div className="area-resultados" key={grupo.area}>
              <h3 className="titulo-area">{grupo.area}</h3>

              {grupo.estudios.map((estudio) => {
                const claveEstudio = `${grupo.area}-${estudio.nombre}`
                const abierto = estudiosAbiertos[claveEstudio] || false

                return (
                <div className="historial-estudio" key={claveEstudio}>
                  <button
                    type="button"
                    className="historial-desplegable"
                    aria-expanded={abierto}
                    onClick={() =>
                      setEstudiosAbiertos((anteriores) => ({
                      ...anteriores,
                      [claveEstudio]: !anteriores[claveEstudio]
                    }))
                    }
                    >
                      <span>
                          <strong>{estudio.nombre}</strong>
                        <small>
                          {estudio.registros.length} registros anteriores
                        </small>
                      </span>

                      <span className="historial-flecha">
                          {abierto ? '▲' : '▼'}
                      </span>
                  </button>

                {abierto && (
                <div className="historial-contenido">
                <div className="historial-fechas">
                  {[...estudio.registros]
                    .sort((a, b) => {
                      const convertirFecha = (fecha) => {
                        const [dia, mes, anio] = fecha.split('/')
                        return new Date(Number(anio), Number(mes) - 1, Number(dia))
                      }

                      return convertirFecha(b.fecha) - convertirFecha(a.fecha)
                    })
                    .map((registro) => (
                    <div
                      className="historial-fecha"
                      key={registro.folio}
                    >
                    <div>
                      <p>
                        <strong>Fecha:</strong> {registro.fecha}
                      </p>
                      <p>
                        <strong>Folio:</strong> {registro.folio}
                      </p>
                    </div>

                    <div className="historial-acciones">
                      <span className="estado disponible">
                        Liberado
                      </span>

                    <button
                      type="button"
                      onClick={() =>
                        verResultadoHistorico(
                          grupo.area,
                          estudio.nombre,
                          registro
                        )
                      }
                    >
                      Ver resultados
                    </button>
                    </div>
                    </div>
                  ))}
                </div>

                  <div className="historial-grafica">
                     <button type="button" disabled>
                      📋 Ver tabla de evolución
                    </button>

                    <button
                    type="button"
                    onClick={() => {
                      setEstudioGraficas(estudio.nombre)
                      setIndiceGrafica(0)
                      setMostrarGraficas(true)
                    }}
                    >
                      📈 Ver gráfica de evolución
                    </button>
                  </div>
                
                </div>
                )}
              </div>
              )
            })}
              
            </div>
          ))}
        </section>

        {mostrarGraficas && (
          <div className="modal-fondo">
            <div className="modal-graficas">

              <button
                type="button"
                className="modal-cerrar"
                onClick={() => setMostrarGraficas(false)}
                aria-label="Cerrar gráficas"
              >
                ×
              </button>

              <h2>{estudioGraficas}</h2>

              <div className="carrusel-graficas">
                <button
                  type="button"
                  className="carrusel-flecha"
                  onClick={() =>
                    setIndiceGrafica(
                      (indiceGrafica - 1 + pruebasGraficas.length) % pruebasGraficas.length
                    )
                  }
                  disabled={pruebasGraficas.length <= 1}
                  aria-label="Gráfica anterior"
                >
                {'❮'}
                </button>

                <div className="grafica-provisional">
                  <span className="grafica-icono">📈</span>

                  <h3>{pruebasGraficas[indiceGrafica] || 'Gráfica de evolución'}</h3>

                  <p>Próximamente se añadirá la gráfica de resultados.</p>

                  <p className="carrusel-contador">
                    {pruebasGraficas.length > 0
                      ? `${indiceGrafica + 1} de ${pruebasGraficas.length}`
                      : 'Sin pruebas disponibles'}
                  </p>
              </div>

              <button
                type="button"
                className="carrusel-flecha"
                onClick={() =>
                  setIndiceGrafica(
                    (indiceGrafica + 1) % pruebasGraficas.length
                  )
                }
                disabled={pruebasGraficas.length <= 1}
                aria-label="Gráfica siguiente"
              >
              {'❯'}
              </button>

            </div>

            </div>
          </div>
        )}

      </main>
    </div>
  )
  } 

  if (sesionIniciada && pantalla === 'resultados') {
    return (
      <div className="dashboard-page">
        <header className="dashboard-header">
          <div>
            <h1>BioCheck</h1>
            <p>Laboratorio de Análisis Clínicos</p>
          </div>

          <button
            className="cerrar-sesion"
            onClick={cerrarSesion}
          >
            Cerrar sesión
          </button>
        </header>

        <main className="dashboard-content">
          <button
            className="boton-regresar"
            onClick={() => setPantalla('inicio')}
          >
            Regresar al inicio
          </button>

          <section className="bienvenida">
            <h2>🧪 Mis resultados</h2>
            <p>Consulta tus resultados más recientes.</p>
          </section>

          <section className="datos-paciente">
            <p>
              <strong>ID del paciente:</strong> {paciente.id}
            </p>

            <p>
              <strong>Paciente:</strong> {paciente.nombre}
            </p>
          </section>

          <section className="lista-resultados">
            <div className="area-resultados">
              <h3 className="titulo-area">
                Hematología
              </h3>

              <div className="resultado-card">
                <div>
                  <h3>Estudios incluidos</h3>

                  <ul className="lista-estudios">
                    <li>Biometría Hemática</li>
                  </ul>

                  <p>
                    <strong>Fecha:</strong> 02/09/2026
                  </p>

                  <p>
                    <strong>Folio:</strong>{' '}
                    BC-HEM-02092026-01524
                  </p>
                </div>

                <div>
                  <span className="estado disponible">
                    Disponible
                  </span>

                  <button
                    onClick={() =>
                      verDetalleArea({
                        area: 'Hematología',
                        tipo: 'hematologia',
                        fecha: '02/09/2026',
                        folio: 'BC-HEM-02092026-01524',
                        pdf: `${import.meta.env.BASE_URL}resultados/hematologia.pdf`
                      })
                    }
                  >
                    Ver resultados
                  </button>
                </div>
              </div>
            </div>

            <div className="area-resultados">
              <h3 className="titulo-area">
                Química Clínica
              </h3>

              <div className="resultado-card">
                <div>
                  <h3>Estudios incluidos</h3>

                  <ul className="lista-estudios">
                    <li>Química Sanguínea</li>
                    <li>Perfil de Lípidos</li>
                    <li>Electrolitos Séricos</li>
                  </ul>

                  <p>
                    <strong>Fecha:</strong> 02/09/2026
                  </p>

                  <p>
                    <strong>Folio:</strong>{' '}
                    BC-QC-02092026-01837
                  </p>
                </div>

                <div>
                  <span className="estado disponible">
                    Disponible
                  </span>

                  <button
                    onClick={() =>
                      verDetalleArea({
                        area: 'Química Clínica',
                        tipo: 'quimica',
                        fecha: '02/09/2026',
                        folio: 'BC-QC-02092026-01837',
                        pdf: `${import.meta.env.BASE_URL}resultados/quimica-clinica.pdf`
                      })
                    }
                  >
                    Ver resultados
                  </button>
                </div>
              </div>
            </div>

            <div className="area-resultados">
              <h3 className="titulo-area">
                Hormonas
              </h3>

              <div className="resultado-card">
                <div>
                  <h3>Estudios incluidos</h3>

                  <ul className="lista-estudios">
                    <li>Perfil Tiroideo</li>
                  </ul>

                  <p>
                    <strong>Fecha:</strong> 02/09/2026
                  </p>

                  <p>
                    <strong>Folio:</strong>{' '}
                    BC-HOR-02092026-01091
                  </p>
                </div>

                <div>
                  <span className="estado disponible">
                    Disponible
                  </span>

                  <button
                    onClick={() =>
                      verDetalleArea({
                        area: 'Hormonas',
                        tipo: 'hormonas',
                        fecha: '02/09/2026',
                        folio: 'BC-HOR-02092026-01091',
                        pdf: `${import.meta.env.BASE_URL}resultados/hormonas.pdf`
                      })
                    }
                  >
                    Ver resultados
                  </button>
                </div>
              </div>
            </div>

            <div className="area-resultados">
              <h3 className="titulo-area">
                Bacteriología
              </h3>

              <div className="resultado-card">
                <div>
                  <h3>Estudios incluidos</h3>

                  <ul className="lista-estudios">
                    <li>Urocultivo</li>
                  </ul>

                  <p>
                    <strong>Fecha:</strong> 02/09/2026
                  </p>

                  <p>
                    <strong>Folio:</strong>{' '}
                    BC-BAC-02092026-02148
                  </p>
                </div>

                <div>
                  <span className="estado proceso">
                    En proceso
                  </span>

                  <button disabled>
                    No disponible
                  </button>
                </div>
              </div>
            </div>
          </section>

        </main>
      </div>
    )
  }

  if (sesionIniciada) {
    return (
      <div className="dashboard-page">
        <header className="dashboard-header">
          <div>
            <h1>BioCheck</h1>
            <p>Laboratorio de Análisis Clínicos</p>
          </div>

          <button
            className="cerrar-sesion"
            onClick={cerrarSesion}
          >
            Cerrar sesión
          </button>
        </header>

        <main className="dashboard-content">
          <section className="bienvenida">
            <h2>¡Bienvenido a BioCheck!</h2>

            <p>
              Ya puedes acceder a todas nuestras herramientas para cuidar tu salud.
            </p>
          </section>

          <section className="opciones">
            <div className="opcion-card">
              <h3>🧪 Mis resultados</h3>

              <p>
                Consulta tus resultados más recientes.
              </p>

              <button
                onClick={() => setPantalla('resultados')}
              >
                Ver resultados
              </button>
            </div>

            <div className="opcion-card">
              <h3>📊 Historial</h3>

              <p>
                Consulta los resultados de tus estudios anteriores.
              </p>

              <button onClick={() => setPantalla('historial')}>
                Ver historial
              </button>
            </div>

            <div className="opcion-card">
              <h3>📅 Citas</h3>

              <p>
                Agenda tu próxima cita.
              </p>

              <button>
                Ver citas
              </button>
            </div>
          </section>
        </main>
      </div>
    )
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>BioCheck</h1>

        <p className="subtitle">
          Tu salud al alcance de un clic
        </p>

        <h2>Iniciar sesión</h2>

        <form onSubmit={iniciarSesion}>
          <label>
            Correo electrónico
          </label>

          <input
            type="email"
            placeholder="ejemplo@correo.com"
            value={correo}
            onChange={(event) =>
              setCorreo(event.target.value)
            }
          />

          <label>
            Contraseña
          </label>

          <input
            type="password"
            placeholder="Ingresa tu contraseña"
            value={contrasena}
            onChange={(event) =>
              setContrasena(event.target.value)
            }
          />

          <div className="botones-login">
            <button
            type="button"
            className="boton-registro"
            onClick={() => setMostrarRegistro(true)}
            >
               Crear cuenta
            </button>

            <button type="submit">
              Iniciar sesión
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default App
