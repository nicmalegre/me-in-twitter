import { useState } from "react";
import { useQuery } from "react-query";
import { Card } from "../../components/Card";
import { Input } from "../../components/Input";
import { Navbar } from "../../components/Navbar";
import { translateError } from "../../utils";

const BASE_USER_URL = "http://localhost:8000/users/";

export const Landing = () => {
  const [user, setUser] = useState();
  const [username, setUsername] = useState(null);
  const [error, setError] = useState(null);
  const [showSearch, setShowSearch] = useState(true);
  const [analyticsData, setAnalyticsData] = useState(null);

  const onSuccess = async response => {
    const { data, errors } = response;

    if (errors) {
      const errorTranslated = translateError(errors);
      setError(errorTranslated);
    } else {
      setError(null);
    }
    if (data) {
      setShowSearch(false);
      setUser(data); //Save all the results
    }
  };

  const onError = errors => {
    const errorTranslated = translateError(errors);
    setError(errorTranslated);
    setError(error);
  };

  const getUserByUsername = async () => {
    const res = await fetch(`${BASE_USER_URL}${username}`);
    return res.json();
  };

  const {
    isLoading: isLoadingGetUserByUsername,
    refetch: refetchGetUserByUsername,
  } = useQuery(["getUserByUsername"], getUserByUsername, {
    enabled: false,
    onSuccess,
    onError,
  });

  // "/users/:username/tweets/analytics"

  const getAnalyticsDataByUsername = async () => {
    const res = await fetch(`${BASE_USER_URL}${username}/tweets/analytics`);
    return res.json();
  };

  const handleInputChange = e => {
    setUsername(e.target.value);
  };

  const handleOnClick = async () => {
    if (username) {
      await refetchGetUserByUsername();
      const analyticsData = await getAnalyticsDataByUsername();
      setAnalyticsData(analyticsData);
      setUsername(null);
    }
  };

  const isLoading = isLoadingGetUserByUsername;

  return (
    <>
      <Navbar />

      {isLoading && (
        <Card>
          <p>'Cargando ...'</p>
        </Card>
      )}

      {showSearch && (
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
          {error && <span className="text-red-500">{error}</span>}

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
      )}

      {user && (
        <Card>
          <div className="flex items-center justify-center">
            <img src={user.profile_image_url} />
          </div>
          <p>Nombre: {user.name}</p>
          <p>Usuario: {user.username}</p>
          {/* <p>Id: {user.id}</p> */}
          {user.location && <p>Ubicación: {user.location}</p>}
          <p>
            Sos usuario de Twitter desde el: {user.created_at.substring(0, 10)}
          </p>
          <br />
          <p>Siguiendo: {user.public_metrics.following_count}</p>
          <p>Seguidores: {user.public_metrics.followers_count}</p>

          {user.verified
            ? "Felicidades, sos un usuario verificado ✅"
            : "Lo siento, no eres un usuario verificado 😢"}

          <div className="bg-gray-300 shadow-md rounded px-4 pt-4 pb-4 mt-2 mb-2">
            <p>
              ¡Has twitteado <b>{user.public_metrics.tweet_count}</b> tweets!
            </p>
          </div>

          <br />

          {analyticsData && (
            <>
              <h4 className="font-medium">
                Considerando tus últimos {analyticsData.total_tweets} tweets:
              </h4>
              <ul>
                <li>Promedio de likes: {analyticsData.like_average}</li>
                <li>Promedio de citas: {analyticsData.quote_average}</li>
                <li>Promedio de respuestas: {analyticsData.reply_average}</li>
                <li>Promedio de retweets: {analyticsData.retweet_average}</li>
              </ul>
            </>
          )}
        </Card>
      )}

      {!showSearch && (
        <div className="flex items-center justify-center mt-4 mb-4">
          <p
            className="text-primary cursor-pointer"
            onClick={() => {
              setUser(null);
              setShowSearch(true);
            }}
          >
            Buscar nuevamente
          </p>
        </div>
      )}
    </>
  );
};
