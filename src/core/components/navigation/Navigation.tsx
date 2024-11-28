'use client'

import {NavigationGraph} from "@/core/definitinos/NavGraph";
import {AnimatePresence, motion} from "framer-motion";
import Link from "next/link";
import clsx from "clsx";
import {useNavigationStore} from "@/core/services/useNavigationStore";
import {usePathname} from "next/navigation";


export function MobileNavigations({
  navGraph
}: {
    navGraph: NavigationGraph
}) {

    const {isOpen, close} = useNavigationStore()

    return (
        <AnimatePresence>
            {
                isOpen && (
                    <motion.div
                        className='w-screen h-screen fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-75 z-50'
                        onClick={close}
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.2}}
                    >
                        <motion.div
                            className='bg-surfaceVariant h-full w-fit overflow-auto'
                            onClick={(e) => e.stopPropagation()}
                            initial={{x: '-100%'}}
                            animate={{x: '0%'}}
                            exit={{x: '-100%'}}
                            transition={{duration: 0.2}}
                        >
                            <Navigation navGraph={navGraph}/>
                        </motion.div>

                    </motion.div>
                )
            }
        </AnimatePresence>
    )
}

function Navigation({
    navGraph
}: {
    navGraph: NavigationGraph
}) {
    const pathname = usePathname()

    const {close} = useNavigationStore()

    return (
        <nav className="p-2 text-black w-60">
            <ul className="flex flex-col gap-1">
                {
                    navGraph.groups.map((group, indexGroup) => (
                        <li key={indexGroup}>
                            <NavSubTitle title={group.title}/>
                            <ul className='flex flex-col gap-3'>
                                {
                                    group.elements.map((element, index) => (
                                        <NavLink
                                            key={index}
                                            descripcion={element.description}
                                            href={element.href}
                                            isActive={pathname === element.href}
                                            icon={element.icon}
                                            onClick={close}
                                        />
                                    ))
                                }
                            </ul>
                            <hr className='my-4 border-secondary'/>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}

function NavSubTitle({title}: { title: string }) {
    return (
        <h3 className='text-on-background font-bold mt-2 mb-4'>{title}</h3>
    )
}

function NavLink({
    descripcion,
    href,
    isActive,
    icon,
    onClick
}: {
    descripcion: string,
    href: string,
    icon?: React.ReactNode
    isActive?: boolean,
    onClick?: () => void
}) {
    return (
        <li className='w-full h-10 flex items-center justify-start'>
            <Link
                onClick={onClick}
                className={clsx(
                    `w-full h-full cursor-pointer rounded-lg py-1 px-2 transition-colors duration-150 hover:bg-primary hover:bg-opacity-30
                flex flex-row gap-2`,
                    {"bg-primary bg-opacity-30 font-semibold": isActive}
                )}
                href={href}
            >
                <picture className='h-8 w-8'>
                    {icon}
                </picture>
                <span className='flex items-center justify-start'>{descripcion}</span>
            </Link>
        </li>
    )
}