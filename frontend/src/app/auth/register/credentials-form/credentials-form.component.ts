import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService, TranslateConfigService } from 'src/app/@core/shared/services';
import { UserData } from 'src/app/@core/models';

@Component({
  selector: 'app-credentials-form',
  templateUrl: './credentials-form.component.html',
  styleUrls: ['./credentials-form.component.scss']
})
export class CredentialsFormComponent {
  
  @Input() formData: UserData;

  @Input() reduced?: boolean = false;

  @Output() onSubmit = new EventEmitter<void>();

  buttonOptions: any = {
    text: 'Next',
    type: 'default',
    useSubmitBehavior: true
  };

  constructor(
    private authService: AuthService,
    private translateService: TranslateConfigService
  ) {
    this.translateService.get('auth.register.nextButton').subscribe(
      (text: string) => { this.buttonOptions.text = text }
    );
  }

  onFormSubmit(e): void {
    e.preventDefault();
    this.onSubmit.emit();
  }

  passwordComparison = (): string => {
    return this.formData.password;
  }

  asyncValidation = (params): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      this.authService.isEmailRegistered(params.value).then(
        () => { resolve() }, () => { reject() }
      )
    })
  }

}