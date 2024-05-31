import { DatePipe } from "@angular/common";
import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { FormWizardService, FormWizardStepBaseComponent } from "ngx-form-wizard";

@Component({
    selector: 'step3',
    standalone: true,
    imports: [ReactiveFormsModule],
    providers: [DatePipe],
    template: `
    <div class="container text-center mt-4">
        <form [formGroup]="form" class="needs-validation" novalidate>
            <div class="row">
                <div class="col-md-12 mb-3">
                    <h3>Términos y Condiciones</h3>
                    <p>Al adoptar una mascota, usted acepta cumplir con las siguientes condiciones según las leyes y regulaciones de Guatemala:</p>
                    <ul class="text-start">
                        <li>La mascota debe ser tratada con respeto y recibir los cuidados necesarios para su bienestar.</li>
                        <li>Es responsabilidad del adoptante proporcionar alimento, agua, y atención veterinaria adecuada.</li>
                        <li>El adoptante se compromete a no abandonar, maltratar, o vender la mascota.</li>
                        <li>En caso de no poder mantener la mascota, debe contactarse con la organización de adopción para encontrar una solución adecuada.</li>
                        <li>Cumplir con todas las leyes locales y nacionales relacionadas con la tenencia de mascotas.</li>
                    </ul>
                    <p>Para más información sobre las leyes de protección animal en Guatemala, consulte la Ley de Protección y Bienestar Animal, Decreto 5-2017.</p>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 mb-3">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="terms" formControlName="terms" required>
                        <label class="form-check-label" for="terms">
                            Acepto los términos y condiciones
                        </label>
                        <div class="invalid-feedback">
                            Debe aceptar los términos y condiciones.
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
    `,
    styles: [`
        .container {
            max-width: 600px;
            margin: auto;
        }
        .text-start {
            text-align: left;
        }
    `]
})
export class Step3Component extends FormWizardStepBaseComponent {
    public override form: FormGroup;

    constructor(private wizardService: FormWizardService) {
        super(3, wizardService.getSteps(), true);
        this.form = new FormGroup({
            terms: new FormControl(false, [Validators.requiredTrue])
        });
    }
}
