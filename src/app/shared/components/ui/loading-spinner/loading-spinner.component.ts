import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from '@/app/core/services/loading.service';
import { delay, map, startWith } from 'rxjs';

@Component({
    selector: 'app-loading-spinner',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './loading-spinner.component.html',
    styleUrls: ['./loading-spinner.component.css'],
})
export class LoadingSpinner {
    @Input() message: string = 'កំពុងផ្ទុកទិន្នន័យ...';

    // We can also use this internally if we want to add a minimum display time
    private loadingService = inject(LoadingService);
    showSpinner$ = this.loadingService.isLoading$.pipe(
        delay(300), // Wait 300ms before showing to avoid flickering for fast requests
        startWith(false)
    );
}
