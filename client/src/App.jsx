import { useEffect, useState } from "react";
import Formulario from "./components/Formulario.jsx";
import ListaTareas from "./components/ListaTareas.jsx";

const API = "https://tareas-app-5vu4.onrender.com/api/tareas";

export default function App() {
  const [tareas, setTareas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Cargar tareas al montar el componente
  useEffect(() => {
    cargarTareas();
  }, []);

  async function cargarTareas() {
    try {
      const res = await fetch(API);
      if (!res.ok) throw new Error("No se pudieron cargar las tareas");
      setTareas(await res.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }

  async function agregarTarea(titulo) {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo }),
    });
    const nueva = await res.json();
    setTareas([...tareas, nueva]);
  }

  async function eliminarTarea(id) {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    setTareas(tareas.filter((t) => t.id !== id));
  }

  // RETO 2: Varios DELETE seguidos
  async function eliminarCompletadas() {
    const completadasList = tareas.filter((t) => t.completada);
    for (const tarea of completadasList) {
      await fetch(`${API}/${tarea.id}`, { method: "DELETE" });
    }
    setTareas(tareas.filter((t) => !t.completada));
  }

  async function toggleTarea(id) {
    const tarea = tareas.find((t) => t.id === id);
    const res = await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completada: !tarea.completada }),
    });
    const actualizada = await res.json();
    setTareas(tareas.map((t) => (t.id === id ? actualizada : t)));
  }

  // RETO 1: Contador
  const completadas = tareas.filter((t) => t.completada).length;
  const total = tareas.length;

  if (cargando) return <p className="estado">Cargando...</p>;
  if (error) return <p className="estado">❌ {error}</p>;

  return (
    <main className="contenedor">
      <h1>✅ Mis tareas</h1>

      {/* RETO 1: Mostrar contador */}
      <p className="contador" style={{ marginBottom: "1rem", opacity: 0.8 }}>
        {completadas} de {total} tareas completadas
      </p>

      <Formulario onAgregar={agregarTarea} />

      <ListaTareas
        tareas={tareas}
        onEliminar={eliminarTarea}
        onToggle={toggleTarea}
      />

      {/* RETO 2: Botón para eliminar completadas */}
      {completadas > 0 && (
        <button
          onClick={eliminarCompletadas}
          style={{
            marginTop: "1rem",
            padding: "0.6rem 1.2rem",
            backgroundColor: "#e53e3e",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
            width: "100%",
          }}
        >
          🗑️ Eliminar completadas
        </button>
      )}
    </main>
  );
}