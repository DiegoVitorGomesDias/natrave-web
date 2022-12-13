import { ReactSVG } from 'react-svg'

import ArrowLeft from "/assets/icons/arrow-left.svg"
import ArrowRight from "/assets/icons/arrow-right.svg"
import Back from "/assets/icons/back.svg"
import Profile from "/assets/icons/profile.svg"

const icons = { ArrowLeft, ArrowRight, Back, Profile };

export const Icons = ({ icon, fill, link, click }) =>
{  
    return (
        <span className={"cursor-pointer text-" + fill + (icon === "Back" || icon === "Profile" ? " h-8 w-8 " : "")}>
            <a href={link} className={"text-" + fill} title={icon + link}>
                <ReactSVG src={icons[icon]} className={"text-" + fill + " hover:text-" + fill + "/80"}/>
            </a>
        </span>
    )
}