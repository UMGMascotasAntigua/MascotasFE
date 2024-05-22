export class VacunaDet {
    // Define los campos de VacunaDet si es necesario
}

export class Castracion {
    // Define los campos de Castracion si es necesario
}

export class Favorito {
    // Define los campos de Favorito si es necesario
}

export class CitaDet {
    // Define los campos de CitaDet si es necesario
}

export class Pet {
    // Propiedades de la clase
    codigo_Mascota: number;
    nombre_Mascota: string;
    raza: string;
    edad: string;
    estado: string;
    foto: string;
    informacion: string;
    comentarios: string;
    vacunasDet: VacunaDet[];
    castraciones: Castracion[];
    favoritos: Favorito[];
    citasDet: CitaDet[];

    // Constructor para inicializar las propiedades de la clase
    constructor(
        codigoMascota: number,
        nombreMascota: string,
        raza: string,
        edad: string,
        estado: string,
        foto: string,
        informacion: string,
        comentarios: string,
        vacunasDet: VacunaDet[],
        castraciones: Castracion[],
        favoritos: Favorito[],
        citasDet: CitaDet[]
    ) {
        this.codigo_Mascota = codigoMascota;
        this.nombre_Mascota = nombreMascota;
        this.raza = raza;
        this.edad = edad;
        this.estado = estado;
        this.foto = foto;
        this.informacion = informacion;
        this.comentarios = comentarios;
        this.vacunasDet = vacunasDet;
        this.castraciones = castraciones;
        this.favoritos = favoritos;
        this.citasDet = citasDet;
    }
}
