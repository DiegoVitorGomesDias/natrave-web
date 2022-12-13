import "~/components/games.css";
// import imagesOfFlags from "~/public/assets/flags";

import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";

export const Games = ( {game} ) =>
{
    let { hour, teamOne, teamTwo, gameId } = game;
    
    teamOne.slug = teamOne.slug ? teamOne.slug.toString().toUpperCase() : "-";
    teamTwo.slug = teamTwo.slug ? teamTwo.slug.toString().toUpperCase() : "-";

    const validationSchema = yup.object().shape
    ({
        homeTeamScore: yup.string(),
        awayTeamScore: yup.string()
    })

    const formik = useFormik
    ({
        onSubmit: async (values) => 
        {
            values.homeTeamScore = values.homeTeamScore ||  0;
            values.awayTeamScore = values.awayTeamScore || 0;

            console.log({ ...values, gameId });

            const res = await axios
            ({
                method: "post",
                baseURL: import.meta.env.VITE_API_URL,
                url: "/hunches",
                headers:
                {
                    authorization: "Bearer " + JSON.parse(localStorage.getItem("auth")).accessToken
                },
                data: { ...values, gameId }
            })
        },
        initialValues:
        {
            "homeTeamScore": teamOne.score,
            "awayTeamScore": teamTwo.score
        },
        validationSchema
    })

    // console.log(imagesOfFlags);

    return (
        <div className="flex flex-col items-center justify-center border-2 border-gray-300 gap-4 rounded-2xl p-12 py-6">
            <time className="text-gray-700 font-semibold">{hour}</time>

            <form className="flex gap-6 items-center justify-center">

                <span className="flex items-center justify-center gap-4">
                    <label htmlFor={teamOne.slug} className="inline-block text-gray-500">{teamOne.slug}</label>
                    <img src={`src/public/assets/flags/${teamOne.slug}.png`} alt={teamOne.slug} className="inline-block"/>

                    <input 
                        type="number" name="homeTeamScore" 
                        id={teamOne.slug} placeholder="-" 
                        value={formik.values.homeTeamScore}
                        onChange={formik.handleChange}
                        onBlur={formik.handleSubmit}
                        className="placar inline-block w-14 h-14 rounded 
                        bg-red-300/30 outline-red-500/50 outline-1
                        text-center placeholder-red-700 text-red-700" 
                    />
                </span>

                <span className="text-red-500 font-semibold">X</span>

                <span className="flex items-center justify-center gap-4">
                    <input 
                        type="number" name="awayTeamScore" 
                        id={teamTwo.slug} placeholder="-" 
                        value={formik.values.awayTeamScore}
                        onChange={formik.handleChange}
                        onBlur={formik.handleSubmit}
                        className="placar inline-block w-14 h-14 rounded 
                        bg-red-300/30 outline-red-500/50 outline-1
                        text-center placeholder-red-700 text-red-700"
                    />
                    <img src={`src/public/assets/flags/${teamTwo.slug}.png`} alt={teamTwo.slug} className="inline-block"/>
                    <label htmlFor={teamTwo.slug} className="inline-block text-gray-500">{teamTwo?.slug}</label>
                </span>

            </form>
        </div>
    )
}