import { useSession } from 'next-auth/client';
import { useEffect, useState } from 'react';
import { Firebase } from '../firebase';
import Task from './Task';
import { Droppable } from 'react-beautiful-dnd';

function ListCard({ id, ListName, timestamp }) {
  const [session] = useSession();
  const [tasks, setTasks] = useState();

  useEffect(() => {
    Firebase.collection('userLists')
      .doc(session.user.email)
      .collection('Tasks')
      .where('list', '==', ListName)
      .onSnapshot((snapshot) => {
        setTasks(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  return (
    <div className="flex flex-col w-96 h-64 mx-2 rounded-lg border bg-red-100 align-middle justify-center">
      <header className="p-2 text-2xl bg-red-300 rounded">{ListName}</header>
      <Droppable droppableId={id}>
        {provided => (
          <div
            // innerRef={provided.innerRef}
            {...provided.droppableProps}
            className="flex flex-col h-64 p-1 rounded-b"
          >
            {tasks?.map((task, index) => (
              <Task key={task.id} id={task.id} task={task.task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default ListCard;
