import { Draggable } from "react-beautiful-dnd";
function Task({ task, id, index }) {
  return (
    <Draggable
    key={id}
    index={index}
      draggableId={id}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="p-2 my-1 bg-gray-100 border-l-4 select-none rounded border-red-500"
        >
          {task}
        </div>
      )}
    </Draggable>
  );
}

export default Task;
