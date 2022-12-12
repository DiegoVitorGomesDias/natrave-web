import { Header } from "~/components/header.jsx"
import { Games } from "~/components/games.jsx"
import { DateSelect } from "~/components/dateselect.jsx"
import { Icons } from "~/components/icons.jsx"
import { useState } from "react"
import { format, formatISO } from "date-fns"
import { useAsyncFn } from "react-use"
import { useEffect } from "react"
import axios from "axios"


export const Profile = () =>
{
  const hasLogin = () =>
  {
    const auth = localStorage.getItem("auth");
    return auth !== null;
  }
  const logout = () =>
  {
    window.location.pathname = "/";
    localStorage.clear();
  }

  const [ currentDate, setCurrentDate ] = useState(formatISO(new Date(2022, 10, 20)));
  const [ gameByDate, setGameByDate ] = useAsyncFn( async (params) => 
  {
    const dataGames = await axios
    ({
      method: "get",
      baseURL: import.meta.env.VITE_API_URL,
      url: "/games",
      params
    })

    return dataGames.data
  });

  useEffect( () =>
  {
    setGameByDate({ gameTime: currentDate })
  }, [currentDate])

  const [ hunches, setHunches ] = useAsyncFn( async (username) =>
  {
    const dataHunches = await axios
    ({
      method: "get",
      baseURL: import.meta.env.VITE_API_URL,
      url: "/" + username,
    })

    const hunches = dataHunches.data.reduce((acc, hunch) => 
    {
      acc[hunch.gameId] = hunch;
      return acc;
    }, {})

    return hunches
  })

  const username = (window.location.pathname).slice(1);
  useEffect( () => { setHunches( username ) }, [currentDate])

  const [ user, setUser ] = useAsyncFn ( async (username) => 
  {
    const userFind = await axios
    ({
      method: "get",
      baseURL: import.meta.env.VITE_API_URL,
      url: "/users",
      params: { username }
    })

    return userFind.data
  })

  useEffect( () => { setUser( username ) }, [])

  const isLoading = gameByDate.loading || hunches.loading;
  const hasError = gameByDate.error || hunches.error;
  const validateGamesHunches = !isLoading && !hasError;

  return (
    <div className=
    "min-h-screen flex flex-col bg-white items-center content-center lg:justify-center">

      <header className="flex flex-col h-full w-full bg-red-500 items-center justify-center">

        <div className="flex w-full max-w-5xl p-6 items-center place-content-between">            
          <Header version={"bg-vinho"}/>
          <p className={ " p-4 cursor-pointer font-semibold " + (hasLogin() || "hidden") } onClick={logout} >{ hasLogin() ? "Logout" : ""}</p>
        </div>

        <div className="flex flex-col items-center w-full bg-red-700 p-6 gap-4">
          <section className="flex items-center gap-4 w-full max-w-5xl p-6">
            <span className="mt-2" ><Icons icon={"Back"} fill={"white"} link={"/dashboard"} /></span>
            <h1 className="font-bold text-2xl"
            >{!user.error && !user.loading && user?.value?.name}</h1>
          </section>
        </div>

      </header>

      <main className="h-full flex flex-col flex-1 pt-16 items-center justify-center lg:gap-x-16"> 
      
      <DateSelect currentDate={currentDate} onChange={setCurrentDate} />

        <section className="flex flex-col p-12 gap-6 flex-1 text-red-700">
        { isLoading && "Carregando..." }
          { hasError && "Erro Inesperado" }
          { validateGamesHunches && gameByDate.value?.map( (gameCard, index) => 
            {
              return (
                <Games key={index} game={
                  {
                    "hour": format(new Date(gameCard.gameTime), "HH:mm"), 
                    "teamOne": { "slug": gameCard.homeTeam, "score": hunches?.value?.[gameCard.id]?.homeTeamScore || "" }, 
                    "teamTwo": { "slug": gameCard.awayTeam, "score": hunches?.value?.[gameCard.id]?.awayTeamScore || "" },
                    "gameId": gameCard.id,
                  }}
                />
              )
            })
          }
        </section>

      </main>
      
    </div>
  )
}
