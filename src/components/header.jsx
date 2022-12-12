export const Header = ({ version }) =>
{
    let srcLogo = "/src/assets/logo/";

    if (version === "bg-white") srcLogo += "logo-fundo-branco.svg";

    if (version === "bg-vinho") srcLogo += "logo-fundo-vinho.svg";

    if (version === "bg-red") srcLogo += "logo-fundo-vermelho.svg";

    return (
        <header className="flex justify-center lg:my-2">
            <a href="/"><img src={srcLogo} alt="NaTrava Logo" className="h-10"/></a>
        </header>
    )

}