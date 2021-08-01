import { useSession } from 'next-auth/client';
import { Firebase } from '../firebase';
import firebase from 'firebase';

export async function addTask({Task, TaskList, user}) {

  

  return Firebase.collection('userLists')
    .doc(user)
    .collection('Tasks')
    .add({
      list: TaskList,
      task: Task,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
}

export async function addTasktoList({TaskId, user}){

  

  return Firebase.collection('userLists')
      .doc(user)
      .collection('Lists')
      .doc(List)
      .update({
        tasks: firebase.firestore.FieldValue.arrayUnion(TaskId)
      })
}
