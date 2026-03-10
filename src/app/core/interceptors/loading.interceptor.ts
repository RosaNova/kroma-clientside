import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { finalize } from 'rxjs/operators';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
    const loadingService = inject(LoadingService);

    // Skip loading for background requests if needed (e.g., using a custom header)
    const skipLoading = req.headers.has('X-Skip-Loading');

    if (!skipLoading) {
        loadingService.show();
    }

    return next(req).pipe(
        finalize(() => {
            if (!skipLoading) {
                loadingService.hide();
            }
        })
    );
};
