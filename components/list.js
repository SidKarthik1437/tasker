import { useSession } from "next-auth/client";
import { useEffect, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Firebase } from "../firebase";
import Task from "./Task";

function ListCard({ id, ListName, timestamp }) {
  const [session] = useSession();
  const [tasks, setTasks] = useState();

  useEffect(() => {
    Firebase.collection("userLists")
      .doc(session.user.email)
      .collection("Tasks")
      .where("list", "==", ListName)
      .onSnapshot((snapshot) => {
        setTasks(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  return (
    <div className="flex flex-col w-96 h-64 mx-2 rounded-lg border bg-red-100 align-middle justify-center">
      <header className="p-2 text-2xl bg-red-300 rounded">{ListName}</header>
      <Droppable droppableId={id}>
        {(provided) => (
          <div
            className="flex flex-col w-full h-64 p-1 rounded-b"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks?.map((task, index) => (
              <Draggable key={task.id} index={index} draggableId={task.id}>
                {(provided) => {
                  return (
                    <h3
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="p-2 my-1 bg-gray-100 border-l-4 select-none rounded border-red-500"
                    >
                      {task.task}
                    </h3>
                  );
                }}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default ListCard;
