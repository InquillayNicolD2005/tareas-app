import Tarea from "./Tarea.jsx";

export default function ListaTareas({ tareas, onEliminar, onToggle, onEditar }) {
  if (tareas.length === 0) {
    return <p className="vacio">No hay tareas pendientes.</p>;
  }

  return (
    <ul className="lista-tareas">
      {tareas.map((tarea) => (
        <Tarea
          key={tarea.id}
          tarea={tarea}
          onEliminar={onEliminar}
          onToggle={onToggle}
          onEditar={onEditar}
        />
      ))}
    </ul>
  );
}