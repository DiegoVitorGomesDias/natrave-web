import "~/components/games.css";

import axios from "axios";
import { isObject, useFormik } from "formik";
import * as yup from "yup";

export const Games = ({ game }) => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    let { hour, teamOne, teamTwo, gameId } = game;

    teamOne.slug = teamOne.slug ? teamOne.slug.toString().toLowerCase() : "-";
    teamTwo.slug = teamTwo.slug ? teamTwo.slug.toString().toLowerCase() : "-";

    const validationSchema = yup.object().shape
        ({
            homeTeamScore: yup.string(),
            awayTeamScore: yup.string()
        })

    const formik = useFormik
        ({
            onSubmit: async (values) => {
                if (!isObject(auth)) return

                values.homeTeamScore = values.homeTeamScore || 0;
                values.awayTeamScore = values.awayTeamScore || 0;

                const res = await axios
                    ({
                        method: "post",
                        baseURL: import.meta.env.VITE_API_URL,
                        url: "/hunches",
                        headers:
                        {
                            authorization: "Bearer " + auth.accessToken
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

    return (
        <div className="flex flex-col items-center justify-center border-2 border-gray-300 gap-2 rounded-2xl px-4 pt-3 pb-6 lg:px-12 lg:py-6">
            <time className="text-gray-700 font-semibold">{hour}</time>

            <form className="flex gap-4 items-center justify-center">

                <span className="flex items-center justify-center gap-2">
                    <label htmlFor={teamOne.slug} className="text-gray-500 uppercase hidden sm:inline-block">{teamOne.slug}</label>
                    <img src={`/assets/flags/${teamOne.slug}.png`} alt={teamOne.slug} className="inline-block w-12 md:w-max" />

                    <input
                        type="number" name="homeTeamScore"
                        id={teamOne.slug} placeholder="-"
                        value={formik.values.homeTeamScore}
                        onChange={formik.handleChange}
                        onBlur={formik.handleSubmit}
                        className="placar inline-block w-12 h-12 md:w-14 md:h-14 rounded 
                        bg-red-300/30 outline-red-500/50 outline-1
                        text-center placeholder-red-700 text-red-700"
                    />
                </span>

                <span className="text-red-500 font-semibold">X</span>

                <span className="flex items-center justify-center gap-2">
                    <input
                        type="number" name="awayTeamScore"
                        id={teamTwo.slug} placeholder="-"
                        value={formik.values.awayTeamScore}
                        onChange={formik.handleChange}
                        onBlur={formik.handleSubmit}
                        className="placar inline-block w-12 h-12 md:w-14 md:h-14 rounded 
                        bg-red-300/30 outline-red-500/50 outline-1
                        text-center placeholder-red-700 text-red-700"
                    />
                    <img src={`/assets/flags/${teamTwo.slug}.png`} alt={teamTwo.slug} className="inline-block w-12 md:w-max" />
                    <label htmlFor={teamTwo.slug} className="text-gray-500 uppercase hidden sm:inline-block">{teamTwo?.slug}</label>
                </span>

            </form>
        </div>
    )
}