export class Ad {
    url: string;

    constructor(url?: string) {
        this.url = url || 'http://localhost:8000/ad/?r=' + Math.floor(Math.random() * 1000);
    }

}