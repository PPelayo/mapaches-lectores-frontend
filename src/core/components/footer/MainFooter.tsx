import {InstagramIcon} from "@/core/components/icons/InstagramIcon";
import {GitHubIcon} from "@/core/components/icons/GitHubIcon";
import {XICon} from "@/core/components/icons/XIcon";


export default function MainFooter() {
    return (
        <>
            <footer
                className="bg-surfaceVariant p-2 border-2 border-secondaryContainer flex flex-row gap-4 items-center justify-between">

                <section>
                    <p className="text-gray-600">&copy; {new Date().getFullYear()} Los Mapaches Lectores. Todos los
                        derechos reservados.</p>
                </section>
                <section className={'flex flex-col gap-2'}>
                    <ul className="flex flex-col sm:flex-row gap-2 items-start text-gray-600 ">
                        <li>
                            <a
                                target={'_blank'}
                                className={'transition-colors duration-300 hover:text-primary'}
                                href={'https://www.instagram.com/pedro.pelayo03'}>
                                <InstagramIcon className={'w-8 h-auto'}/>
                            </a>
                        </li>
                        <li>
                            <a
                                target={'_blank'}
                                className={'transition-colors duration-300 hover:text-primary'}
                                href={'https://x.com/subi_XD'}>
                                <XICon className={'w-8 h-auto'}/>
                            </a>
                        </li>
                        <li>
                            <a
                                target={'_blank'}
                                className={'transition-colors duration-300 hover:text-primary'}
                                href={'https://github.com/PPelayo'}>
                                <GitHubIcon className={'w-8 h-auto'}/>
                            </a>
                        </li>

                    </ul>
                </section>
            </footer>
        </>
    )
}