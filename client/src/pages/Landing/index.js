import { useState } from "react";
import { useQuery } from "react-query";
import { Card } from "../../components/Card";
import { Input } from "../../components/Input";
import { Navbar } from "../../components/Navbar";

const BASE_USER_URL = "http://localhost:8000/users/";

export const Landing = () => {
  const [user, setUser] = useState();
  const [username, setUsername] = useState(null);
  const [errors, setErrors] = useState(null);

  const onSuccess = async response => {
    const { data, errors } = response;

    if (errors) {
      console.log(errors);
      setErrors(errors);
    } else {
      setErrors(null);
    }
    if (data) {
      console.log(data);
      setUser(data); //Save all the results
    }
  };

  const onError = error => {
    console.log("onError");
    console.log(error);
    setErrors(error);
  };

  const getUserById = async () => {
    const res = await fetch(`${BASE_USER_URL}${username}`);
    return res.json();
  };

  const { isLoading, refetch } = useQuery(["getUserById"], getUserById, {
    enabled: false,
    onSuccess,
    onError,
  }); //Use react-query for get all the pokemons

  const handleInputChange = e => {
    console.log(e.target.value);
    setUsername(e.target.value);
  };

  const handleOnClick = async () => {
    await refetch();
  };

  return (
    <>
      <Navbar />

      <Card>
        {/* <div className="m-4">
          <h1 className="">
            Te gustaria ver información interesante sobre tu actividad en
            Twitter?
          </h1>
        </div> */}

        <Input
          label="Usuario"
          placeholder="Ingresa tu usuario de twitter. Más conocido como @usuario"
          value={username}
          onChange={handleInputChange}
        />
        {errors &&
          errors.length &&
          errors.map(error => (
            <span className="text-red-500">{error.detail}</span>
          ))}

        <div className="flex items-center justify-center">
          <button
            className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleOnClick}
          >
            Buscar
          </button>
        </div>
      </Card>

      {user && (
        <Card>
          <div className="flex items-center justify-center">
            <img src={user.profile_image_url} />
          </div>
          <p>Nombre: {user.name}</p>
          <p>Usuario: {user.username}</p>
          <p>Id: {user.id}</p>
          {user.location && <p>Location: {user.location}</p>}
          <p>Sos usuario de Twitter desde el: {user.created_at}</p>
          <br />
          <p>Siguiendo: {user.public_metrics.following_count}</p>
          <p>Seguidores: {user.public_metrics.followers_count}</p>
          <p>¡Has twitteado {user.public_metrics.tweet_count} tweets!</p>

          {user.verified
            ? "Felicidades, sos un usuario verificado ✅."
            : "Lo siento, no eres un usuario verificado 😢."}

          <br />
          <br />

          <p>
            El top 3 de personas con las que más interactuaste en los últimos
            100 tweets es:
          </p>
          <ul>
            <li>1. Username 1</li>
            <li>1. Username 2</li>
            <li>1. Username 3</li>
          </ul>
        </Card>
      )}
    </>
  );
};
