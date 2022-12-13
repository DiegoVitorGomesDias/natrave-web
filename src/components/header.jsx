import logo_fundo_branco from "~/public/assets/logo/logo-fundo-branco.svg";
import logo_fundo_vinho from "~/public/assets/logo/logo-fundo-vinho.svg";
import logo_fundo_vermelho from "~/public/assets/logo/logo-fundo-vermelho.svg";

export const Header = ({ version }) =>
{
    let srcLogo;

    if (version === "bg-white") srcLogo = logo_fundo_branco;

    if (version === "bg-vinho") srcLogo = logo_fundo_vinho;

    if (version === "bg-red") srcLogo = logo_fundo_vermelho;

    return (
        <header className="flex justify-center lg:my-2">
            <a href="/"><img src={srcLogo} alt="NaTrava Logo" className="h-10"/></a>
        </header>
    )
}