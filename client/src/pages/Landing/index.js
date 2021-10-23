import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Card } from "../../components/Card";
import { Input } from "../../components/Input";
import { Navbar } from "../../components/Navbar";

const URL = "http://localhost:8000/";

export const Landing = () => {
  const [user, setUser] = useState([]);

  const getUserById = async () => {
    const res = await fetch(URL);
    return res.json();
  };

  const onSuccess = async response => {
    const { data, errors } = response;

    console.log(data);

    setUser(data); //Save all the results
  };

  const onError = error => {
    console.log(error);
  };

  const { isLoading, refetch } = useQuery(["getUserById"], getUserById, {
    onSuccess,
    onError,
  }); //Use react-query for get all the pokemons

  return (
    <>
      <Navbar />

      {/* <div>
        <h1 className="text-center">
          Te gustaria ver información interesante sobre tu actividad en Twitter?
        </h1>
      </div> */}

      <Card>
        <Input label="Usuario" placeholder="Usuario" />
        <div class="flex items-center justify-center">
          <button
            class="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Buscar
          </button>
        </div>
      </Card>
      {user && (
        <>
          <p>{user.username}</p>
          <img src={user.profile_image_url} />
        </>
      )}
    </>
  );
};
