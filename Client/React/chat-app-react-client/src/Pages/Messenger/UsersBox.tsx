import { Users } from "../../Interfaces/messengerInterfaces";

interface UsersBoxProps {
  users: Array<Users>;
  onUserClick: (username: string) => void;
}

const UsersBox = ({ users, onUserClick }: UsersBoxProps) => {
  return (
    <div className="h-screen flex flex-col justify-start items-center gap-3 w-36 pt-5 shadow-lg ">
      <div className="mb-5 border-b-2 border-purple-300 w-full text-center">
        Users
      </div>
      {users.map((u) => (
        <div
          className="min-w-min px-5 py-2 rounded bg-purple-300 text-black cursor-pointer"
          key={u.username}
          onClick={() => onUserClick(u.id)}
        >
          {u.username}
        </div>
      ))}
    </div>
  );
};

export default UsersBox;
