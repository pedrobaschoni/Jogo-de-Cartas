import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartasService {

  private urlBase = "https://deckofcardsapi.com/api";

  constructor(private http: HttpClient) { }

  public obterBaralho() {
    return this.http.get(`${this.urlBase}/deck/new/shuffle/?deck_count=1`);
  }

  public obterCartas(deckId: string) {
    return this.http.get(`${this.urlBase}/deck/${deckId}/draw/?count=3`);
  }
}
