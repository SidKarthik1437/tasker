import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import { getSession, useSession } from 'next-auth/client';
import Login from '../components/login';
import Modal from '@material-tailwind/react/Modal';
import ModalBody from '@material-tailwind/react/ModalBody';
import ModalFooter from '@material-tailwind/react/ModalFooter';
import Button from '@material-tailwind/react/Button';
import Icon from '@material-tailwind/react/Icon';
import Tooltips from '@material-tailwind/react/Tooltips';
import TooltipsContent from '@material-tailwind/react/TooltipsContent';
import Header from '../components/header';
import firebase from 'firebase';
import { Firebase } from '../firebase';
import ListCard from '../components/list';
import Input from '@material-tailwind/react/Input';
import { DragDropContext } from 'react-beautiful-dnd';


export default function Home() {
  const buttonRef = useRef();
  const [session] = useSession();
  if (!session) return <Login />;

  const [List, setList] = useState('');
  const [SnapList, setSnapList] = useState();
  const [Task, setTask] = useState('');
  const [TaskList, setTaskList] = useState('');
  const [showListModal, setShowListModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [order, setOrder] = useState();
  

  useEffect(() => {
    Firebase.collection('userLists').doc(session.user.email).collection('Lists').onSnapshot(snapshot => {
      setOrder(snapshot.docs.map((doc) => doc.data()))
    })
  }, [showListModal])
  console.log(order)
  
  async function addList() {

    await Firebase.collection('userLists')
      .doc(session.user.email)
      .collection('Lists')
      .doc(List)
      .set({
        listname: List,
        tasks: [],
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });


    Firebase.collection('userLists')
      .doc(session.user.email)
      .update({
        order: firebase.firestore.FieldValue.arrayUnion(List),
      });

    setList('');
    setShowListModal(false);
  }
  async function addTask() {
    const doc = await Firebase.collection('userLists')
      .doc(session.user.email)
      .collection('Tasks')
      .add({
        list: TaskList,
        task: Task,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });

    Firebase.collection('userLists')
      .doc(session.user.email)
      .collection('Lists')
      .doc(TaskList)
      .update({
        tasks: firebase.firestore.FieldValue.arrayUnion(doc.id),
      });

    setTask('');
    setShowTaskModal(false);
  }

  useEffect(() => {
    Firebase.collection('userLists')
      .doc(session.user.email)
      .collection('Lists')
      .onSnapshot((snapshot) => {
        setSnapList(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  const TaskModal = (
    <Modal active={showTaskModal} toggler={() => setShowTaskModal(false)}>
      <div className="w-72 h-36">
        <ModalBody>
          <div className="flex w-full justify-between m-5 ml-0">
            <select
              name="List"
              id="List"
              className="w-full h-10 border rounded-lg outline-none"
              onClick={(e) => setTaskList(e.target.value)}
            >
              {SnapList?.map((List) => (
                <option
                  value={`${List.listname}`}
                  className="text-xl rounded-lg"
                >
                  {List.listname}
                </option>
              ))}
            </select>
          </div>
          <Input
            value={Task}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
            onChange={(e) => setTask(e.target.value)}
            type="text"
            outline={true}
            size="regular"
            placeholder="Enter Task"
          />
        </ModalBody>
      </div>
      <ModalFooter>
        <div className="flex w-full justify-between">
          <Button
            color="red"
            buttonType="link"
            onClick={(e) => setShowTaskModal(false)}
            ripple="dark"
          >
            Cancel
          </Button>
          <Button color="blue" onClick={addTask} ripple="light">
            Add
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
  const ListModal = (
    <Modal
      size="regular"
      active={showListModal}
      toggler={() => setShowListModal(false)}
    >
      <ModalBody>
        <input
          value={List}
          onKeyDown={(e) => e.key === 'Enter' && addList()}
          onChange={(e) => setList(e.target.value)}
          type="text"
          className="outline-none w-full"
          placeholder="Enter List Name"
        />
      </ModalBody>
      <ModalFooter>
        <Button
          color="blue"
          buttonType="link"
          onClick={(e) => setShowListModal(false)}
          ripple="dark"
        >
          Cancel
        </Button>
        <Button color="blue" onClick={addList} ripple="light">
          Add
        </Button>
      </ModalFooter>
    </Modal>
  );

  const showModal = (event) => {
    event.preventDefault();
    addEventListener('mousedown', (event) => {
      if (event.target.id === 'cont') {
        setShowListModal(true);
      } else if (event.target.id === 'task') {
        setShowTaskModal(true);
      }
    });
  };

  
const onDragEnd = () => {

}
  return (
    <DragDropContext
     onDragEnd={onDragEnd}
    >
    <div
    className="flex flex-col w-full h-screen justify-between" id="cont"
    >
      
        <Head>
          <title>Tasker</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        
        <Header />
        {ListModal}
        {TaskModal}
        <div
          id="cont"
          className="flex flex-grow p-5"
          onClick={(e) => showModal(e)}
        >
          
            {SnapList?.map((List) => (
              
                <ListCard
                  key={List.id}
                  id={List.id}
                  ListName={List.listname}
                  date={List.timestamp}
                  
                />
              
            ))}
          
        </div>
        <div
          className="flex w-full justify-end p-5 select-none"
          id="task"
          onClick={(e) => setShowTaskModal(true)}
        >
          <Button
            id="task"
            className="bg-red-500 rounded-full z-10 px-3 mr-5 justify-end text-bg "
            color="red"
            buttonType="filled"
            size="lg"
            rounded={true}
            block={false}
            iconOnly={false}
            ripple="dark"
            ref={buttonRef}
          >
            <Icon name="add" size="3xl" id="task" />
          </Button>
          <Tooltips placement="left" ref={buttonRef}>
            <TooltipsContent className="text-bg">Add Task</TooltipsContent>
          </Tooltips>
        </div>
      
    </div>
    </DragDropContext>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
