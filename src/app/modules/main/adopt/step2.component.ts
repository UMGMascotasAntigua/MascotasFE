import { DatePipe } from "@angular/common";
import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { FormWizardService, FormWizardStepBaseComponent } from "ngx-form-wizard";
import { environment } from "src/app/environment/environment";
import { Pet } from "src/app/models/Pet";

@Component({
    selector: 'step2',
    standalone: true,
    imports: [ReactiveFormsModule],
    providers: [DatePipe],
    template: `
    <div class="container text-center mt-4">
        <h2 class="text-primary">Nombre: {{petData?.Nombre_Mascota}}</h2>
        <p>Raza: {{petData?.Raza}}</p>
        <p>Edad: {{petData?.Edad}}</p>
        <img [src]="photoEndpoint + petData?.Codigo_Mascota" class="pet-photo img-fluid">
        <form [formGroup]="form" class="mt-3">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="accept" formControlName="accept">
                <label class="form-check-label" for="accept">
                    Confirma que desea adoptar la mascota
                </label>
            </div>
        </form>
    </div>
    `,
    styles: [`
        .container {
            max-width: 500px;
        }
        .pet-photo {
            max-width: 100%;
            height: auto;
            max-height: 300px;
            display: block;
            margin: 0 auto;
        }
        .form-check-label {
            margin-left: 0.5em;
        }
    `]
})
export class Step2Component extends FormWizardStepBaseComponent {
    public override form: FormGroup;
    public minDate = new Date();
    public formattedDate: string | null =null;
    public petData: Pet | null = null;
    public photoEndpoint: string = `${environment.apiUrl}pet/photo/`;

    constructor(private wizardService: FormWizardService
    ) {
        super(2, wizardService.getSteps(), true);
        this.form = new FormGroup({
            accept: new FormControl('', [Validators.requiredTrue]),
        });

        this.petData = this.wizardService.getSteps()[1].data;
    }
}
