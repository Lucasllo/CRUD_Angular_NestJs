import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';

export const resolveUserName: ResolveFn<string> = async (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const userService = inject(UserService);
  let userName: string = 'User';

  if (activatedRoute.paramMap && activatedRoute.paramMap.get('id')) {
    await userService
      .loadById(Number(activatedRoute.paramMap.get('id')!))
      .subscribe({
        next: (value) => (userName = value.name),
      });
  }

  return userName;
};
