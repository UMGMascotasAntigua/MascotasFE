import { DatePipe } from "@angular/common";
import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { FormWizardService, FormWizardStepBaseComponent, IWizardStep } from "ngx-form-wizard";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: 'step1',
    standalone: true,
    imports: [ReactiveFormsModule],
    providers: [DatePipe],
    template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <div class="row">
            <div class="col-md-6 mb-3">
                <label for="nombre" class="form-label">Nombre</label>
                <input type="text" class="form-control" id="nombre" formControlName="nombre" required>
                <div class="invalid-feedback">
                    Por favor ingrese un nombre.
                </div>
            </div>
            <div class="col-md-6 mb-3">
                <label for="direccion" class="form-label">Dirección</label>
                <input type="text" class="form-control" id="direccion" formControlName="direccion" required>
                <div class="invalid-feedback">
                    Por favor ingrese una dirección.
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 mb-3">
                <label for="telefono" class="form-label">Teléfono</label>
                <input type="text" class="form-control" id="telefono" formControlName="telefono" required>
                <div class="invalid-feedback">
                    Por favor ingrese un teléfono.
                </div>
            </div>
            <div class="col-md-6 mb-3">
                <label for="fechaRecoleccion" class="form-label">Fecha de recolección</label>
                <input type="date" [min]="formattedDate" class="form-control" id="fechaRecoleccion" formControlName="fechaRecoleccion" required>
                <div class="invalid-feedback">
                    Por favor seleccione una fecha de recolección.
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 mb-3">
                <label for="comentarios" class="form-label">Comentarios</label>
                <textarea class="form-control" id="comentarios" formControlName="comentarios" required></textarea>
                <div class="invalid-feedback">
                    Por favor ingrese comentarios.
                </div>
            </div>
        </div>
        <button type="submit" class="btn btn-primary">Siguiente</button>
    </form>
  `,
})
export class Step1Component extends FormWizardStepBaseComponent {
    public override form: FormGroup;
    public minDate = new Date();
    public formattedDate: string | null =null;

    constructor(private wizardService: FormWizardService, private auth: AuthService,
        private datePipe: DatePipe
    ) {
        super(1, wizardService.getSteps(), true);
        this.form = new FormGroup({
            nombre: new FormControl('', [Validators.required]),
            direccion: new FormControl('', [Validators.required]),
            telefono: new FormControl('', [Validators.required]),
            fechaRecoleccion: new FormControl('', [Validators.required]),
            comentarios: new FormControl('', [Validators.required])
        });
        this.formattedDate = this.datePipe.transform(this.minDate, 'yyyy-MM-dd');
        this.auth.getUserInfo()
            .subscribe((e) => {
                if (e.success == true) {
                    this.form.patchValue({
                        nombre: e.result.Nombre_Usuario
                    });
                    this.form.get('nombre')?.disable();
                }
            });
    }

    public onSubmit() {
        if (this.form.valid) {
            this.wizardService.getSteps()[1].data = this.form.value;
        }
    }
    
}
