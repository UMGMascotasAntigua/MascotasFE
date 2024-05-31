import { Component } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { FormWizardService, FormWizardStepBaseComponent } from "ngx-form-wizard";
import { AdoptService } from "src/app/services/adopt.service";
import { PetsService } from "src/app/services/pets.service";

@Component({
    selector: 'step4',
    standalone: true,
    imports: [ReactiveFormsModule],
    providers: [PetsService],
    template: `
    <div class="container text-center mt-4">
        <div class="card">
            <div class="card-body">
                <div class="mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" class="bi bi-check-circle-fill text-success" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.97 10.97l-3.47-3.47a.75.75 0 0 1 1.06-1.06l2.47 2.47 5.47-5.47a.75.75 0 0 1 1.06 1.06l-6 6a.75.75 0 0 1-1.06 0z"/>
                    </svg>
                </div>
                <h3 class="card-title">¡Adopción Lista!</h3>
                <p class="card-text">Recuerde presentar su documento de identificación al acudir a recoger a su mascota.</p>
                <button type="button" class="btn btn-primary mt-3">Descargar constancia</button>
            </div>
        </div>
    </div>
    `,
    styles: [`
        .container {
            max-width: 600px;
            margin: auto;
        }
        .card {
            margin-top: 50px;
            border: 1px solid #dcdcdc;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .card-body {
            padding: 20px;
        }
        .text-success {
            color: #28a745 !important;
        }
        .card-title {
            margin-top: 20px;
            font-size: 1.5em;
            font-weight: bold;
        }
    `]
})
export class Step4Component extends FormWizardStepBaseComponent{
    public success:boolean | null = null;
    public allData: any = null;
    constructor(private wizardService: FormWizardService, private petService: PetsService){
        super(4, wizardService.getSteps(), true);

        this.allData = this.wizardService.getSteps()[1].data;
        

        this.petService.adoptPet(this.wizardService.getSteps()[3].data.user, this.wizardService.getSteps()[1].data, this.wizardService.getSteps()[3].data.form)
        .subscribe((e) => {
            console.log(e)
        })
    }
    
}
