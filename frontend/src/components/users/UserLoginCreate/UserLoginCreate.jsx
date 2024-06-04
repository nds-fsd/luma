import UserLogin from './UserLogin/UserLogin';

const UserLoginCreate = ({ handleLogin }) => {
  return (
    <div>
      <UserLogin handleLogin={handleLogin} />
    </div>
  );
};

export default UserLoginCreate;
