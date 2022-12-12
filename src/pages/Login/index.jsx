import { Header } from "~/components/header.jsx"
import { Buttons } from "~/components/buttons"
import { Input } from "~/components/inputs"
import { Icons } from "~/components/icons"

import React from "react";
import { useLocalStorage } from 'react-use';

import axios from 'axios';
import { useFormik } from "formik";
import * as yup from "yup";

export const Login = () =>
{
    const [auth, setAuth, removeAuth] = useLocalStorage('auth', {});
    const [ loading, setLoading ] = React.useState(false);
    const validationSchema = yup.object().shape
    ({
        email: yup.string().required("Insira um e-mail.").email("Insira um e-mail válido"),
        password: yup.string().required("Insira uma senha.")   
    })

    const formik = useFormik
    ({
        onSubmit: async (values) => 
        {
            try
            {

                setLoading(true);
                const response = await axios
                ({
                    method: "get",
                    baseURL: import.meta.env.VITE_API_URL,
                    url: "/login",
                    auth: 
                    {
                        username: values.email,
                        password: values.password
                    }
                })

                setAuth(response.data);
                location.pathname = "/dashboard"
            }
            catch (error)
            {
                alert("E-mail ou Senha incorretos.")
                console.log(error);
                return
            }
            setLoading(false)

        },

        initialValues: 
        {
            email: "",
            password: ""       
        },
        validationSchema
    })

    return (
        <div className=
        "p-6 min-h-screen bg-red-700 flex flex-col justify-center items-center lg:justify-center">

            <div className="bg-white h-auto w-5/6 rounded md:w-2/6 ">

                <div className="w-full border-b-2 border-red-700 p-6 ">
                    <Header version={"bg-white"} />
                </div>

                <main className=
                "h-auto flex flex-col items-center justify-center py-2">

                    <div className="flex w-full px-6 py-2 gap-2 items-center">
                        <Icons icon={"Back"} fill={"red-700"} link={"/"}/>
                        <h1 className="text-red-700 font-bold text-left inline-block "
                        >Entre na sua Conta</h1>
                    </div>

                    <form onSubmit={formik.handleSubmit} autoComplete="off" className="flex flex-col w-full gap-y-4 px-6">

                        <div id="inputEmail">
                                <Input
                                    name={"email"}
                                    type={"email"}
                                    placeholder={"Digite seu e-mail"}
                                    error={formik.touched.email &&  formik.errors.email}
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >Seu e-mail:</Input>
                                {formik.touched.email && formik.errors.email ? <small className="block text-black">{formik.errors.email}</small> : ""}
                            </div>

                            <div id="inputPassword">
                                <Input
                                    name={"password"}
                                    type={"password"}
                                    placeholder={"Digite sua senha"}
                                    error={formik.touched.password && formik.errors.password}
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >Sua senha:</Input>
                                {formik.touched.password && formik.errors.password ? <small className="block text-black">{formik.errors.password}</small> : ""}
                            </div>

                            <div className="py-6 pt-3">
                                <Buttons 
                                    type={{ style: "primary-bg-red", tag: "submit" }}
                                    disabled={!formik.isValid} 
                                >{ loading ? "Carregando..." : "Entrar" }</Buttons>
                            </div>
                    </form>
                </main>

            </div>

        </div>
    )
}

export const Cadastro = () =>
{
    const [auth, setAuth, removeAuth] = useLocalStorage('auth', {});
    const [ loading, setLoading ] = React.useState(false)

    const validationSchema = yup.object().shape
    ({
        name: yup.string().required("Insira um nome."),
        username: yup.string().required("Insira um nome de usuário."),
        email: yup.string().required("Insira um e-mail.").email("Insira um e-mail válido"),
        password: yup.string().required("Insira uma senha.")   
    })

    const formik = useFormik
    ({
        onSubmit: async (values) => 
        {
            setLoading(true);
            try
            { 
                const response = await axios
                ({
                method: "post",
                baseURL: import.meta.env.VITE_API_URL,
                url: "/users",
                data: values
                });

                console.log(response.data);
                const responseLogin = await axios
                ({
                    method: "get",
                    baseURL: import.meta.env.VITE_API_URL,
                    url: "/login",
                    auth: 
                    {
                        username: values.email,
                        password: values.password
                    }
                })
                setAuth(responseLogin.data);
                location.pathname = "/dashboard"
            }
            catch (error)
            {
                alert("Usuário ou E-mail já existentes.")
                console.log(error);
            }
            setLoading(false);
        },

        initialValues: 
        {
            name: "",
            username: "",
            email: "",
            password: ""       
        },
        validationSchema
    })

    return (
        <div className=
        "p-6 min-h-screen bg-red-700 flex flex-col justify-center items-center lg:justify-center">

            <div className="bg-white h-auto w-5/6 rounded md:w-2/6 ">

                <div className="w-full border-b-2 border-red-700 p-6 ">
                    <Header version={"bg-white"} />
                </div>

                <main className=
                "h-auto flex flex-col items-center justify-center py-2">

                    <div className="flex w-full px-6 py-2 gap-2 items-center">
                        <Icons icon={"Back"} fill={"red-700"} link={"/"}/>
                        <h1 className="text-red-700 font-bold text-left inline-block"
                        >Crie sua Conta</h1>
                    </div>

                    <form onSubmit={formik.handleSubmit} autoComplete="off" className="flex flex-col w-full gap-y-4 px-6">

                        <div id="inputName">
                            <Input
                                name={"name"}
                                type={"text"}
                                placeholder={"Digite seu nome"}
                                error={formik.touched.name && formik.errors.name}
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >Seu nome:</Input>
                            {formik.touched.name && formik.errors.name ? <small className="block text-black">{formik.errors.name}</small> : ""}
                        </div>

                        <div id="inputUser">
                            <Input
                                name={"username"}
                                type={"text"}
                                placeholder={"Digite seu usuário"}
                                error={formik.touched.username && formik.errors.username}
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >Seu nome de usuário:</Input>
                            {formik.touched.username && formik.errors.username ? <small className="block text-black">{formik.errors.username}</small> : ""}
                        </div>

                        <div id="inputEmail">
                            <Input
                                name={"email"}
                                type={"email"}
                                placeholder={"Digite seu e-mail"}
                                error={formik.touched.email &&  formik.errors.email}
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >Seu e-mail:</Input>
                            {formik.touched.email && formik.errors.email ? <small className="block text-black">{formik.errors.email}</small> : ""}
                        </div>

                        <div id="inputPassword">
                            <Input
                                name={"password"}
                                type={"password"}
                                placeholder={"Digite sua senha"}
                                error={formik.touched.password && formik.errors.password}
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >Sua senha:</Input>
                            {formik.touched.password && formik.errors.password ? <small className="block text-black">{formik.errors.password}</small> : ""}
                        </div>

                        <div className="py-6 pt-3">
                            <Buttons 
                                type={{ style: "primary-bg-red", tag: "submit" }}
                                disabled={!formik.isValid} 
                            >{ loading ? "Carregando..." : "Criar minha conta" }</Buttons>
                        </div>

                    </form>

                </main>

            </div>
            
        </div>
    )
}