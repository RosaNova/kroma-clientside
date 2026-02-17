import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Message {
    id: number;
    user: string;
    avatar: string;
    content: string;
    time: string;
}

@Component({
    selector: 'app-messaging',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './messaging.component.html',
    styleUrl: './messaging.component.css'
})
export class MessagingComponent {
    messages: Message[] = [
        {
            id: 1,
            user: 'សុខ ជា',
            avatar: 'https://i.pravatar.cc/150?u=1',
            content: 'តើទំនិញនេះនៅមានក្នុងស្តុកដែរឬទេ?',
            time: '៥ នាទីមុន'
        },
        {
            id: 2,
            user: 'លីណា ម៉ៅ',
            avatar: 'https://i.pravatar.cc/150?u=2',
            content: 'ខ្ញុំចង់សួរអំពីការដឹកជញ្ជូន។',
            time: '១០ នាទីមុន'
        },
        {
            id: 3,
            user: 'ចាន់ សុភ័ក្ត្រ',
            avatar: 'https://i.pravatar.cc/150?u=3',
            content: 'អរគុណសម្រាប់ព័ត៌មាន! 🙏',
            time: '២០ នាទីមុន'
        }
    ];
}
