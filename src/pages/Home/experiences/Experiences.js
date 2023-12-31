import Title from "../../../components/common/Title"
import ExperienceIcon from "../../../assets/titles/experiences.png"
import Box from "../../../components/common/Box";
import { getOpacity } from "../../../utils/colors";
import { convertToMonthYear } from "../../../utils/time";
import ExpBranch from "../../../assets/exp_branch.svg";
import MountTransition from "../../../components/common/MountTransition";
import { useContext } from "react";
import { LanguageContext } from "../../../contexts/language";

const Experience = ({ experience, months, children }) => {
    if (!experience)
        return (
            <Box className="flex flex-col p-6 w-[475px] h-[170px] relative opacity-0">
            </Box>
        );

    const { title, company, logo, location, start_date, end_date, description } = experience;
    const formatted_start_date = convertToMonthYear(start_date, months);
    const formatted_end_date = convertToMonthYear(end_date, months);
    const image = require(`../../../assets/${logo}`);

    return (
        <Box className="flex flex-col p-6 w-[475px] h-[170px] relative">
            <div className="flex mb-4 items-center">
                <img src={image} alt={company} className="h-12 mr-3" />
                <div className="flex flex-col">
                    <span className="text-white font-bold text-xl">
                        {title}
                    </span>
                    <span className="text-white text-sm">
                        {company}, {location} - {formatted_start_date} / {formatted_end_date}
                    </span>
                </div>
            </div>

            <div className="text-grey text-sm">
                {description}
            </div>
            {children}
        </Box>
    )
}

const Corner = ({ opacity = 1, onLeft = false }) => {
    const opacityClass = getOpacity(opacity);
    return (
        <div className="relative">
            <span className={`w-16 h-[150px] bg-transparent absolute border-brown ${opacityClass} border-t-[3px] ` +
                (onLeft ?
                    "border-l-[3px] rounded-tl-xl right-0"
                    : "border-r-[3px] rounded-tr-xl")
            } />
        </div>
    )
}

const ExperienceList = ({ experiences, months }) => {
    let rows = [];
    let opacity = 1;
    let cornerOpacity = 0.825;

    for (let i = 0, rowIndex = 0; i < experiences.length; i += 2, rowIndex++) {
        const leftExperienceIndex = rowIndex % 2 ? i + 1 : i;
        const rightExperienceIndex = rowIndex % 2 ? i : i + 1;
        const hasNextRow = i + 2 < experiences.length;
        const isOnLeft = rowIndex % 2;

        rows.push(
            <MountTransition key={i} styleFrom={`opacity-0 transform ${isOnLeft ? "-translate-x-10" : "translate-x-10"}`} styleTo={"opacity-100"}>
                <div className={`flex items-center ${rowIndex % 2 ? "ml-24" : "mr-24"}`}>
                    {(hasNextRow && isOnLeft) ?
                        <Corner onLeft={true} opacity={cornerOpacity} />
                        : null
                    }
                    <Experience experience={experiences[leftExperienceIndex]} months={months} />
                    <span className={`bg-brown w-20 h-[3px] ${experiences[i] && experiences[i + 1] ? getOpacity(opacity) : "opacity-0"}`} />
                    <Experience experience={experiences[rightExperienceIndex]} months={months} />
                    {hasNextRow && !isOnLeft &&
                        <Corner onLeft={false} opacity={cornerOpacity} />
                    }
                </div>
            </MountTransition>
        )
        opacity = Math.max(0.3, opacity - 0.175);
        cornerOpacity = Math.max(0.3, cornerOpacity - 0.175);
    }
    return (
        <>
            {rows}
        </>
    )
}

const Experiences = () => {
    const { language } = useContext(LanguageContext)
    const texts = language.texts.experiences;

    return (
        <div id="experiences">
            <Title title={texts.title} image={ExperienceIcon} color="brown" index={3}
                withLeftBar={
                    <MountTransition styleFrom="opacity-0" styleTo="opacity-100" origin="origin-top" delay="delay-[700ms]">
                        <img src={ExpBranch} alt="Branch" className="absolute left-3 top-1" />
                    </MountTransition>
                }>
                <div className="space-y-16 ml-16 mt-5">
                    <ExperienceList experiences={texts.experiences} months={language.texts.months} />
                </div>
            </Title>
        </div>
    )
}

export default Experiences
