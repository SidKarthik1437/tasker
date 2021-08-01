import { Draggable } from 'react-beautiful-dnd';

function Task({ task, id, index }) {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        //   innerRef={provided.innerRef}
          className="p-2 my-1 bg-gray-100 border-l-4 rounded border-red-500"
        >
          {task}
        </div>
      )}
    </Draggable>
  );
}

export default Task;
