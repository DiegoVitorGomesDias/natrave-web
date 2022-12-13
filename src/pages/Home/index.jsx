import { Buttons } from "~/components/buttons.jsx"
import { Header } from "~/components/header.jsx"
import imgHome from "~/public/assets/imagens/img_home.png"

export const Home = () =>
{

  const localStorageToken = localStorage.getItem("token");

  if (localStorageToken) window.location.pathname = "/dashboard";

  return (
    <div className=
    "p-6 min-h-screen bg-red-700 flex flex-col items-center content-center lg:justify-center lg:pb-24">

      <Header version={"bg-vinho"}/>

      <main className="h-5/6 flex flex-col pt-16 items-center justify-center gap-y-8 lg:flex-row lg:gap-x-16">

        <div className="w-3/5 md:w-2/6">
          <img src={imgHome} alt="" />
        </div>

        <div className="w-5/6 md:w-4/6 lg:w-2/6">
          <h1 className="text-2xl text-center font-bold mb-4 lg:text-3xl lg:text-left"
          >Dê o seu palpite na Copa do Mundo do Catar de 2022!</h1>

          <div className="flex flex-col w-full justify-center items-center gap-y-2 lg:w-full">
            <Buttons type={{ style: "primary-bg-white", tag: "href" }} link={"/cadastro"} >Criar minha conta</Buttons>
            <Buttons type={{ style: "secundary", tag: "href" }} link={"/login"} >Fazer Login</Buttons>
          </div>
        </div>

      </main>
      
    </div>
  )
}
