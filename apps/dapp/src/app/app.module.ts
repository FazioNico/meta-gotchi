import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule, DOCUMENT } from '@angular/common';
import { AppComponent } from './app.component';
import { ToPercentPipe } from './pipes/to-percent.pipe';
import { MainComponent } from './components/main/main.component';
import { CreateComponent } from './components/create/create.component';
import { FormsModule } from '@angular/forms';
import { databaseFactory } from './factories/database.factory';

@NgModule({
  declarations: [AppComponent, ToPercentPipe, MainComponent, CreateComponent],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'main', component: MainComponent },
      { path: 'create', component: CreateComponent },
      { path: '', redirectTo: 'create', pathMatch: 'full' },
    ], {
      initialNavigation: 'enabledBlocking',
    }),
  ],
  providers: [
    {
      provide: 'APP_DATABASE',
      useFactory: (d: Document) => {
        const storage = d.defaultView?.localStorage;
        if (!storage) {
          throw new Error('No localStorage');
        }
        return databaseFactory(storage)
      },
      deps: [DOCUMENT],
    },
    {
      provide: 'APP_STATE',
      useFactory: async (database: any) => {
        try {
          const value = await database.getItem('STATE');
          return value;
        } catch (error) {
          console.log('[ERROR]', error);
          return {
            foodLevel: Date.now(),
            sleepLevel: Date.now(),
            happyLevel: Date.now(),
          };
        }
      },
      deps: ['APP_DATABASE'],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
