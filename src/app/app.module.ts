import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';
import { AuthInterceptorService } from './auth-interceptor.service';
import { RolGuard } from './role-guard.guard';
import { RouterModule } from '@angular/router';
import { MemberModule } from './member/member.module';
import { CaptainModule } from './captain/captain.module';
import { DepartureModule } from './departure/departure.module';
import { BoatModule } from './boat/boat.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
    RouterModule,
    MemberModule,
    CaptainModule,
    DepartureModule,
    BoatModule,
    AuthModule
  ],
  providers: [
    RolGuard, {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
