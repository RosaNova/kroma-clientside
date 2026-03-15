import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, signal } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationStart, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { LoadingService } from './services/loading-service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class App {
  isLoading = true;
  loadingTimeout?: any;
  previousUrl?: string;
  currentUrl?: string;
  protected readonly title = signal('kroma-dashboard-client');
  constructor(
    // add this to make language available in login
    private element: ElementRef,
    private router: Router,
    public loadingService: LoadingService,
    private cdr: ChangeDetectorRef,
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.currentUrl = event.url.split('?').reverse().pop();
      }
      if (this.currentUrl && this.currentUrl != this.previousUrl) {
        if (event instanceof NavigationStart) {
          this.loadingService.forceStop();
          this.loadingService.setLoading(true);
        } else if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
          this.previousUrl = this.router.url.split('?').reverse().pop(); //get url from this.router.url (result: /request/contract/WAIT_MY_APPROVAL_REQUEST) instead because event.url when first enter there is no param in url path (result: /request/contract/)
          // scroll to top on navigate finish
          // window.scrollTo({top:0})
          setTimeout(() => {
            this.loadingService.setLoading(false);
          }, 100); // fix show table result not found before load data
        }
      }
    });
    // delay to hide some quick loading
    this.loadingService.isLoading$.subscribe((isLoading) => {
      if (isLoading) {
        (element.nativeElement as HTMLElement).classList.add('app-is-loading');
      } else {
        (element.nativeElement as HTMLElement).classList.remove('app-is-loading');
      }
      if (this.loadingTimeout) {
        clearTimeout(this.loadingTimeout);
      }
      this.loadingTimeout = setTimeout(() => {
        this.isLoading = isLoading;
        this.loadingTimeout = undefined;
        this.cdr.detectChanges();
      }, 200);
    });
  }
}
