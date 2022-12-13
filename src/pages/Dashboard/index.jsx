import { Icons } from "~/components/icons.jsx"
import { Header } from "~/components/header.jsx"
import { Games } from "~/components/games.jsx"
import { DateSelect } from "~/components/dateselect"

import { useState, useEffect } from "react"  
import { useAsyncFn } from "react-use"
import axios from "axios"
import { format, formatISO } from "date-fns"

export const Dashboard = () =>
{
  const auth = JSON.parse(localStorage.getItem("auth"));

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

  useEffect(() => {setGameByDate({ gameTime: currentDate })}, [currentDate]);

  const [ hunches, setHunches ] = useAsyncFn( async (auth) =>
  {
    const dataHunches = await axios
    ({
      method: "get",
      baseURL: import.meta.env.VITE_API_URL,
      url: "/hunches",
      headers:
      {
        authorization: "Bearer " + auth
      }
    })

    const hunches = dataHunches.data.reduce((acc, hunch) => 
    {
      acc[hunch.gameId] = hunch;
      return acc;
    }, {})
    return hunches
  })

  useEffect( () => { setHunches(auth?.accessToken) }, [currentDate])

  const isLoading = gameByDate.loading || hunches.loading;
  const hasError = gameByDate.error || hunches.error;
  const validateGamesHunches = !isLoading && !hasError;

  return (
    <div className=
    "min-h-screen flex flex-col bg-white items-center content-center lg:justify-center pb-16">

      <header className="flex flex-col h-full w-full bg-red-500 items-center justify-center">

        <div className="flex w-full max-w-5xl p-6 items-center place-content-between">            
          <Header version={"bg-vinho"}/>
          <Icons icon={"Profile"} fill={"white"} link={"/" + auth?.user?.username}/>
        </div>

        <div className="flex flex-col items-center w-full bg-red-700 p-6 gap-4">
          <section className="w-full max-w-5xl p-6">
            <p>Olá {auth?.user?.name}</p>
            <h1 className="font-bold text-2xl"
            >Qual é o seu palpite?</h1>
          </section>
        </div>

      </header>

      <main className="h-full flex flex-col flex-1 pt-16 items-center justify-center lg:gap-x-16"> 
        
        <DateSelect currentDate={currentDate} onChange={setCurrentDate} />

        <section className="flex flex-col py-4 gap-6 flex-1 text-red-700 md:p-8 lg:p-12">

          { isLoading && "Carregando..." }
          { hasError && "Erro Inesperado" }
          { validateGamesHunches && gameByDate.value?.map( (gameCard, index) => 
            {
              return (
                <Games key={index} game={
                  {
                    "hour": format(new Date(gameCard.gameTime), "HH:mm"), 
                    "teamOne": { "slug": gameCard.homeTeam, "score": hunches?.value?.[gameCard.id]?.homeTeamScore }, 
                    "teamTwo": { "slug": gameCard.awayTeam, "score": hunches?.value?.[gameCard.id]?.awayTeamScore },
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
