import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'meta-gotchi-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent {

  public name!: string;

  constructor(
    private readonly _router: Router,
  ) { }

  async actions(type: string) {
    console.log(type);
    if (type === 'create') {
      await this._router.navigate(['/main']);
    }

  }

}
