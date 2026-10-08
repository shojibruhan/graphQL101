import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";
import { useState } from "react";

const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      age
      name
      isMarried
    }
  }
`;

const GET_USERS_BY_ID = gql`
  query GetUserById($id: ID!) {
    getUserById(id: $id) {
      id
      name
      age
      isMarried
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $age: Int!, $isMarried: Boolean!) {
    createUser(name: $name, age: $age, isMarried: $isMarried) {
      name
    }
  }
`;

function App() {
  const [user, setUser] = useState({});
  const { data, error, loading } = useQuery(GET_USERS);
  const {
    data: getUserByIdData,
    error: getUserByIdError,
    loading: getUserByIdLoading,
  } = useQuery(GET_USERS_BY_ID, { variables: { id: "2" } });
  // console.log("getUserByIdData: ", getUserByIdData["getUserById"]);
  // console.log(
  //   "object: ",
  //   Object.entries(getUserByIdData).map((user) =>
  //     Object.entries(user).map((u) => u),
  //   ),
  // );
  const [createUser] = useMutation(CREATE_USER);

  const handleAddUser = async () => {
    console.log(user);
    createUser({
      variables: {
        name: user.name,
        age: Number(user.age),
        isMarried: false,
      },
    });
  };

  return (
    <div className="bg-indigo-900/30 text-gray-100 w-full h-screen top-0 flex flex-col justify-center">
      <h1 className="text-purple-700 font-semibold text-5xl text-center py-4">
        GraphQL
      </h1>
      <h2 className="text-center text-amber-500 font-semibold text-2xl">
        Users
      </h2>
      {loading && <p className=" animate-bounce">Loadint Data . . .</p>}
      <div className="flex flex-col justify-between items-center text-center">
        {data &&
          data.getUsers.map((user) => (
            <div key={user.id} className="flex space-x-2 text-rose-500">
              <p>Name: {user.name}</p>
              <p>Age: {user.age}</p>
              <p>Marital Status: {user.isMarried ? "Married" : "Unmarried"}</p>
            </div>
          ))}
      </div>
      {error && <p className="text-red-500">{error.message.toString()}</p>}
      <div>
        <h2 className="text-center text-amber-500 font-semibold text-2xl">
          Top User
        </h2>
        {getUserByIdLoading ? (
          <p className=" animate-bounce">Loadint Data . . .</p>
        ) : (
          <>
            <p className="text-rose-600 text-3xl">
              {getUserByIdData.getUserById.name}
            </p>
            <p className="text-pink-800">Helllo</p>
          </>
        )}
        {getUserByIdError && (
          <p className="text-red-500">{getUserByIdError.message.toString()}</p>
        )}
      </div>
      <div className="flex flex-col items-center justify-center ">
        <h1 className="text-indigo-600 font-semibold text-3xl">
          Create New User
        </h1>
        <div className="flex flex-col space-y-1.5">
          <input
            type="text"
            placeholder="John Doe"
            className="border border-black p-1 rounded-xl text-black"
            onChange={(e) =>
              setUser((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />
          <input
            type="number"
            placeholder="18"
            className="border border-black p-1 rounded-xl text-black"
            onChange={(e) =>
              setUser((prev) => ({
                ...prev,
                age: e.target.value,
              }))
            }
          />
          <button
            className="bg-black text-gray-200 text-sm px-2 py-2 rounded-sm"
            onClick={handleAddUser}
          >
            Add User
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
