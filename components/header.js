import Button from '@material-tailwind/react/Button';
import Icon from '@material-tailwind/react/Icon';
import { signOut, useSession } from 'next-auth/client';

function Header() {
  const [session] = useSession();

  return (
    <header className="grid grid-cols-5 flex-row w-full items-center justify-auto align-middle sticky top-0 z-50 shadow-md ">
        <h1 className="col-start-3 flex-shrink select-none text-4xl m-5 justify-self-center text-black font-thin tracking-widest ">
          TASKER
        </h1>
      <img
        loading="lazy"
        onClick={signOut}
        className="col-start-5 justify-self-end mr-10 cursor-pointer h-12 w-12 rounded-full ml-2"
        src={session?.user?.image}
        alt=""
      />
    </header>
  );
}

export default Header;
