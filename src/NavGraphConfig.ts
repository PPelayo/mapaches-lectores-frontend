import {NavigationGraph} from "@/core/definitinos/NavGraph";

export const navGraphConfig : NavigationGraph = {
    groups: [
        {
            title : "LIBROS",
            elements: [
                {
                    href : "/",
                    description : "Inicio",
                    icon: null
                },
                {
                    href : "/books/edit",
                    description : "Crear Libro",
                    icon: null
                },
            ],
        },
        {
            title : 'AUTORES',
            elements : [
                {
                    href : "/authors/edit",
                    description : "Crear Autor",
                    icon: null
                }
            ]
        },
        {
            title : 'EDITORIALES',
            elements : [
                {
                    href : "/publishers/edit",
                    description : "Crear Editorial",
                    icon: null
                }
            ]
        }
    ]

}