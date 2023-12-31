import React, { useContext } from 'react'
import HobbiesImage from '../../../assets/titles/passions.png'
import Title from '../../../components/common/Title'
import Box from '../../../components/common/Box'
import Bike from '../../../assets/bike.png'
import Chess from '../../../assets/chess.png'
import Informatique from '../../../assets/informatique.png'
import { useState } from 'react'
import { extractFirstNWords } from '../../../utils/Strings'
import MountTransition from '../../../components/common/MountTransition'
import { LanguageContext } from '../../../contexts/language'

const Hobby = ({ image, title, className, text }) => {
    const isScaled = className.includes('scale-105');
    const [firstTwoWords, restOfTheText] = extractFirstNWords(text, 2)

    return (
        <Box className={`${className} flex flex-col px-6 rounded-xl transition-all ease-in-out duration-500`}>
            <span className="text-white text-lg font-bold m-4">{title}</span>
            <div className='relative mb-5'>
                <img src={image} alt={title} className={"w-full transition-all ease-in-out duration-150 " + (isScaled ? 'opacity-40' : '')} />
                {isScaled &&
                    <span className='absolute text-white font-bold top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                        <span className='text-blue'>{firstTwoWords}</span>
                        {restOfTheText}
                    </span>
                }
            </div>
        </Box>
    )
}

const Hobbies = () => {
    const { language } = useContext(LanguageContext)
    const texts = language.texts.hobbies;
    const hobbies = texts.hobbies;
    const images = [
        Bike,
        Informatique,
        Chess
    ]

    const [selectedItem, setSelectedItem] = useState(null);

    const handleMouseEnter = (item) => {
        setSelectedItem(item);
    };

    const handleMouseLeave = () => {
        setSelectedItem(null);
    };

    const getItemClassName = (item) => {
        if (selectedItem === null)
            return '';
        return item !== selectedItem ? 'blur' : 'scale-105';
    };

    const delays = [
        "delay-0",
        "delay-[100ms]",
        "delay-[200ms]"
    ]

    return (
        <div id="hobbies">
            <Title title={texts.title} image={HobbiesImage} color="blue" index={1} />
            <div className='flex justify-between space-x-5 group'>
                {hobbies.map((hobby, index) => (
                    <MountTransition key={index} styleFrom={"opacity-0 transform translate-y-10"} styleTo={"opacity-100"} delay={delays[index]}>
                        <div className="w-1/3"
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}>
                            <Hobby image={images[index]} title={hobby.title} className={getItemClassName(index)} text={hobby.description} />
                        </div>
                    </MountTransition>
                ))}
            </div>
        </div>
    )
}

export default Hobbies
