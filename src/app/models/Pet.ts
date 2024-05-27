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
    Codigo_Mascota: number;
    Nombre_Mascota: string;
    Raza: string;
    Edad: string;
    Estado: string;
    Foto: string;
    Informacion: string;
    Comentarios: string;
    VacunasDet: VacunaDet[];
    Castraciones: Castracion[];
    Favoritos: Favorito[];
    CitasDet: CitaDet[];
    isFavorite: boolean = false;

    // Constructor para inicializar las propiedades de la clase
    constructor(
        CodigoMascota: number,
        NombreMascota: string,
        Raza: string,
        Edad: string,
        Estado: string,
        Foto: string,
        Informacion: string,
        Comentarios: string,
        VacunasDet: VacunaDet[],
        Castraciones: Castracion[],
        Favoritos: Favorito[],
        CitasDet: CitaDet[]
    ) {
        this.Codigo_Mascota = CodigoMascota;
        this.Nombre_Mascota = NombreMascota;
        this.Raza = Raza;
        this.Edad = Edad;
        this.Estado = Estado;
        this.Foto = Foto;
        this.Informacion = Informacion;
        this.Comentarios = Comentarios;
        this.VacunasDet = VacunasDet;
        this.Castraciones = Castraciones;
        this.Favoritos = Favoritos;
        this.CitasDet = CitasDet;
    }
}
