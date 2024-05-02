export class Cake{
    public name: string = "";
    public description: string = "";
    public ingredients: string[] = [];
    public family: number | undefined;
    public flavor: number | undefined;
    public filling: number | undefined;
    public price: number = 0.00;
    public image: string = "";
    public thrudate: Date | undefined;
    public stock: number | undefined;

    constructor(name: string, description: string, ingredients: string[], family: number, flavor: number,
        filling: number, price: number, image: string, thrudate: Date, stock: number){
            this.name = name;
            this.description = description;
            this.ingredients = ingredients;
            this.family = family;
            this.flavor = flavor;
            this.filling = filling;
            this.price = price;
            this.image = image;
            this.thrudate = thrudate;
            this.stock = stock;
    }
}