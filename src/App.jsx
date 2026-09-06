import { useState } from 'react'
import './App.css'

function App() {
  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [sesionIniciada, setSesionIniciada] = useState(false)
  const [pantalla, setPantalla] = useState('inicio')
  const [areaSeleccionada, setAreaSeleccionada] = useState(null)

  const paciente = {
    id: 'FNVO-24042001',
    nombre: 'Fernanda Nataly Vallejo Olmos'
  }

  const iniciarSesion = (event) => {
    event.preventDefault()

    if (correo !== '' && contrasena !== '') {
      setSesionIniciada(true)
      setPantalla('inicio')
    } else {
      alert('¡No olvides completar todos los campos!')
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
    setAreaSeleccionada(area)
    setPantalla('detalle')
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
            onClick={() => setPantalla('resultados')}
          >
            Regresar a mis resultados
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
                  <span>13.8</span>
                  <span>g/dL</span>
                  <span>12 - 16</span>
                </div>

                <div className="tabla-fila">
                  <span>Hematocrito</span>
                  <span>41</span>
                  <span>%</span>
                  <span>36 - 46</span>
                </div>

                <div className="tabla-fila">
                  <span>Leucocitos</span>
                  <span>7,500</span>
                  <span>/µL</span>
                  <span>4,500 - 11,000</span>
                </div>

                <div className="tabla-fila">
                  <span>Plaquetas</span>
                  <span>250,000</span>
                  <span>/µL</span>
                  <span>150,000 - 450,000</span>
                </div>
              </div>
            )}

            {areaSeleccionada.tipo === 'quimica' && (
              <div className="tabla-resultados">
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
                  <span>92</span>
                  <span>mg/dL</span>
                  <span>70 - 100</span>
                </div>

                <div className="tabla-fila">
                  <span>Urea</span>
                  <span>28</span>
                  <span>mg/dL</span>
                  <span>15 - 40</span>
                </div>

                <div className="tabla-fila">
                  <span>Creatinina</span>
                  <span>0.90</span>
                  <span>mg/dL</span>
                  <span>0.60 - 1.20</span>
                </div>

                <div className="tabla-fila">
                  <span>Ácido úrico</span>
                  <span>5.2</span>
                  <span>mg/dL</span>
                  <span>2.5 - 7.2</span>
                </div>

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
                  <span>180</span>
                  <span>mg/dL</span>
                  <span>Menor de 200</span>
                </div>

                <div className="tabla-fila">
                  <span>HDL</span>
                  <span>55</span>
                  <span>mg/dL</span>
                  <span>Mayor de 40</span>
                </div>

                <div className="tabla-fila">
                  <span>LDL</span>
                  <span>95</span>
                  <span>mg/dL</span>
                  <span>Menor de 100</span>
                </div>

                <div className="tabla-fila">
                  <span>Triglicéridos</span>
                  <span>130</span>
                  <span>mg/dL</span>
                  <span>Menor de 150</span>
                </div>

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
                  <span>139</span>
                  <span>mmol/L</span>
                  <span>135 - 145</span>
                </div>

                <div className="tabla-fila">
                  <span>Potasio</span>
                  <span>4.3</span>
                  <span>mmol/L</span>
                  <span>3.5 - 5.1</span>
                </div>

                <div className="tabla-fila">
                  <span>Cloro</span>
                  <span>101</span>
                  <span>mmol/L</span>
                  <span>98 - 107</span>
                </div>
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
                  <span>2.1</span>
                  <span>µUI/mL</span>
                  <span>0.4 - 4.0</span>
                </div>

                <div className="tabla-fila">
                  <span>T4 Libre</span>
                  <span>1.2</span>
                  <span>ng/dL</span>
                  <span>0.8 - 1.8</span>
                </div>
              </div>
            )}

            <a
              href={areaSeleccionada.pdf}
              download
              className="boton-descargar"
            >
              Descargar resultado
            </a>
          </section>
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

              <button>
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

          <button type="submit">
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  )
}

export default App
