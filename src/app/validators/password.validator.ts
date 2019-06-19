import {AbstractControl} from "@angular/forms";

export class PasswordValidator {
    static passwordsShouldMatch(control: AbstractControl) {
        let password = control.get('password').value;
        let confirmPassword = control.get('password_confirmation').value;

        if (password !== confirmPassword) {
            control.get('password_confirmation').setErrors({
                passwordsDontMatch: true
            });
        } else {
            control.get('password_confirmation').setErrors({
                passwordsDontMatch: false
            });
        }
    }
}