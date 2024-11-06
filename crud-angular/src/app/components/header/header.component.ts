import { UserService } from './../../services/user.service';
import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private userService = inject(UserService);
  isLogado = this.userService.logged;
  private readonly router = inject(Router);

  logout(){
    localStorage.removeItem('token');
    this.userService.isLogado();
    this.router.navigate(['/']);
  }
}
