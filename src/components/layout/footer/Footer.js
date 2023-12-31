import React, { useContext, useState } from 'react';
import { LanguageContext } from '../../../contexts/language'
import linkedin from '../../../assets/linkedin.png'
import github from '../../../assets/github.png'
import email from '../../../assets/email.png'
import CircleButton from '../../common/CircleButton'
import ElementRow from '../../common/ElementRow'
import HoverableTextLink from '../../common/HoverableTextLink';

const FooterLink = ({ children, href, className }) => {
    return (
        <HoverableTextLink className={className + " text-footer-text text-sm"}
            href={href}
            underlineColor={"bg-footer-text"}
            animation={false}
        >
            {children}
        </HoverableTextLink>
    )
}

const Footer = () => {
    const { language } = useContext(LanguageContext);
    const texts = language.texts;
    const no_translation = language.texts.no_translation;

    const [emailCopied, setEmailCopied] = useState(false);

    const copyEmail = () => {
        navigator.clipboard.writeText(no_translation.links.email);
        setEmailCopied(true);
        setTimeout(() => {
            setEmailCopied(false);
        }, 2000);
    }
    return (
        <div className="flex flex-col items-center relative">
            <div className="inline-block w-2/5 min-w-[1em] h-px bg-light-light-background my-6"></div>
            <ElementRow className="space-x-9 mb-4">
                <CircleButton image={linkedin} href={no_translation.links.linkedin} />
                <CircleButton image={github} href={no_translation.links.github} />
                <CircleButton image={email} onClick={copyEmail} />
            </ElementRow>

            {emailCopied &&
                <span className="bg-green-button py-2 px-3 rounded-xl text-footer-text text-sm font-bold absolute right-10 bottom-10 ">
                    {texts.footer.email_copied}
                </span>
            }

            <ElementRow className="space-x-10 mt-3">
                <FooterLink href="/#header">{texts.header.home}</FooterLink>
                <FooterLink href="/#about_me">{texts.header.about}</FooterLink>
                <FooterLink href="/#experiences">{texts.header.experiences}</FooterLink>
                <FooterLink href='/projects'>{texts.header.projects}</FooterLink>
                <FooterLink href="/#contact">{texts.header.contact}</FooterLink>
            </ElementRow>

            <span className="my-6 text-footer-text text-sm">
                {no_translation.footer.mention}
            </span>
        </div>
    )
}

export default Footer
