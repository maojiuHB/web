import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import {Principal} from '../../core';

/**
 * @whatItDoes Conditionally includes an HTML element if current user has any
 * of the authorities passed as the `expression`.
 *
 * @howToUse
 * ```
 *     <some-element *vnHasAnyAuthority="'ROLE_ADMIN'">...</some-element>
 *
 *     <some-element *vnHasAnyAuthority="['ROLE_ADMIN', 'ROLE_USER']">...</some-element>
 * ```
 */
@Directive({
    selector: '[vnHasAnyAuthority]'
})
export class HasAnyAuthorityDirective {
    private authorities: string[];

    constructor(private principal: Principal, private templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef) {}

    @Input()
    set vnHasAnyAuthority(value: string | string[]) {
        this.authorities = typeof value === 'string' ? [value] : value;
        this.updateView();
        // Get notified each time authentication state changes.
        this.principal.getAuthenticationState().subscribe(identity => this.updateView());
    }

    private updateView(): void {
        this.principal.hasAnyAuthority(this.authorities).then(result => {
            this.viewContainerRef.clear();
            if (result) {
                this.viewContainerRef.createEmbeddedView(this.templateRef);
            }
        });
    }
}
