import { useState } from "react";

export default function Tarea({ tarea, onEliminar, onToggle, onEditar }) {
  const [editando, setEditando] = useState(false);
  const [nuevoTitulo, setNuevoTitulo] = useState(tarea.titulo);

  const guardarEdicion = () => {
    if (nuevoTitulo.trim() !== "" && nuevoTitulo !== tarea.titulo) {
      onEditar(tarea.id, nuevoTitulo.trim());
    } else {
      setNuevoTitulo(tarea.titulo);
    }
    setEditando(false);
  };

  return (
    <li className={`tarea-item ${tarea.completada ? "completada" : ""}`}>
      <input
        type="checkbox"
        checked={tarea.completada}
        onChange={() => onToggle(tarea.id)}
      />

      {editando ? (
        <input
          type="text"
          className="input-inline"
          value={nuevoTitulo}
          onChange={(e) => setNuevoTitulo(e.target.value)}
          onBlur={guardarEdicion}
          onKeyDown={(e) => {
            if (e.key === "Enter") guardarEdicion();
            if (e.key === "Escape") {
              setNuevoTitulo(tarea.titulo);
              setEditando(false);
            }
          }}
          autoFocus
          style={{
            background: "transparent",
            color: "white",
            border: "1px solid #6366f1",
            borderRadius: "4px",
            padding: "2px 6px",
            fontSize: "1rem",
            width: "100%",
            marginRight: "8px"
          }}
        />
      ) : (
        <span
          onDoubleClick={() => setEditando(true)}
          style={{
            cursor: "pointer",
            flexGrow: 1,
            textDecoration: tarea.completada ? "line-through" : "none",
            opacity: tarea.completada ? 0.6 : 1,
          }}
          title="Doble clic para editar"
        >
          {tarea.titulo}
        </span>
      )}

      <button onClick={() => onEliminar(tarea.id)} className="btn-eliminar">
        🗑️
      </button>
    </li>
  );
}