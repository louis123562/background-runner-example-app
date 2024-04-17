import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackgroundRunner } from '@capacitor/background-runner';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);
  constructor() { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

  async setName() {
    let ele = {
      label: 'planzeit.App.planzeit.GmbH.Background.Runner',
      event: 'setName',
      details: {
        of: 'Test'
      },
    };

    const result = await BackgroundRunner.dispatchEvent(ele);
  }

  async getName() {
    let ele = {
      label: 'planzeit.App.planzeit.GmbH.Background.Runner',
      event: 'getName',
      details: {}
    };

    const result = await BackgroundRunner.dispatchEvent(ele);
    console.log(result);
  }
}
