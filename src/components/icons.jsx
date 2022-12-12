import { ReactSVG } from 'react-svg'

import ArrowLeft from "../assets/icones/arrow-left.svg"
import ArrowRight from "../assets/icones/arrow-right.svg"
import Back from "../assets/icones/back.svg"
import Profile from "../assets/icones/profile.svg"

const icons = { ArrowLeft, ArrowRight, Back, Profile };

export const Icons = ({ icon, fill, link, click }) =>
{  
    return (
        <span className={"inline-block h-8 w-8 cursor-pointer text-" + fill}>
            <a href={link} className={"text-" + fill} title={icon + link}>
                <ReactSVG src={icons[icon]} className={"text-" + fill + " hover:text-" + fill + "/80"}/>
            </a>
        </span>
    )
}