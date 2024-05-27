export class VacunaDet {
    // Define los campos de VacunaDet si es necesario
    public Fecha_Aplicacion: Date;
    public Vacuna: Vacuna;

    constructor(fecha: Date, Vacuna: Vacuna){
        this.Fecha_Aplicacion = fecha;
        this.Vacuna = Vacuna;
    }
}

export class Vacuna{
    public Comentarios: string;
    public Nombre_Vacuna: string;

    constructor(comments: string, name: string){
        this.Comentarios = comments;
        this.Nombre_Vacuna = name;
    }
}

export class Castracion {
    // Define los campos de Castracion si es necesario
    public Comentarios: string;
    public Fecha_Castracion: Date;
    constructor(Comentarios: string, fecha_castr: Date){
        this.Comentarios = Comentarios;
        this.Fecha_Castracion = fecha_castr;
    }
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
    Vacunas_Det: VacunaDet[];
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
        this.Vacunas_Det = VacunasDet;
        this.Castraciones = Castraciones;
        this.Favoritos = Favoritos;
        this.CitasDet = CitasDet;
    }
}
