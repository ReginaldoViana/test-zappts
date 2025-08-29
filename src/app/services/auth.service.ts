import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

export interface User {
  id?: number;
  email: string;
  password?: string;
  fullName: string;
  googleId?: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(email: string, password: string): Observable<User> {
    return this.http.get<User[]>(`${this.apiUrl}/users?email=${email}`).pipe(
      map(users => {
        const user = users[0];
        if (!user) {
          throw new Error('User not found');
        }
        if (user.password !== password) {
          throw new Error('Invalid password');
        }
        const { password: _, ...userWithoutPassword } = user;
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
        this.currentUserSubject.next(userWithoutPassword);
        return userWithoutPassword;
      }),
      catchError(error => {
        console.error('Login error:', error);
        throw new Error('Invalid credentials');
      })
    );
  }

  register(user: User): Observable<User> {
    user.createdAt = new Date().toISOString();
    
    // Primeiro verifica se já existe um usuário com o mesmo email
    return this.http.get<User[]>(`${this.apiUrl}/users?email=${user.email}`).pipe(
      switchMap(users => {
        if (users.length > 0) {
          throw new Error('Email already registered');
        }
        
        return this.http.post<User>(`${this.apiUrl}/users`, user);
      }),
      map(newUser => {
        const { password, ...userWithoutPassword } = newUser;
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
        this.currentUserSubject.next(userWithoutPassword);
        return userWithoutPassword;
      }),
      catchError(error => {
        console.error('Registration error:', error);
        throw error;
      })
    );
  }

  googleLogin(googleUser: any): Observable<User> {
    const user: User = {
      email: googleUser.email,
      fullName: googleUser.name,
      googleId: googleUser.id,
      createdAt: new Date().toISOString()
    };

    return this.http.get<User[]>(`${this.apiUrl}/users?googleId=${user.googleId}`).pipe(
      switchMap(users => {
        if (users.length > 0) {
          const existingUser = users[0];
          localStorage.setItem('currentUser', JSON.stringify(existingUser));
          this.currentUserSubject.next(existingUser);
          return of(existingUser);
        }
        
        return this.http.post<User>(`${this.apiUrl}/users`, user);
      }),
      map(newUser => {
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        this.currentUserSubject.next(newUser);
        return newUser;
      }),
      catchError(error => {
        console.error('Authentication error:', error);
        throw new Error('Authentication failed');
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
