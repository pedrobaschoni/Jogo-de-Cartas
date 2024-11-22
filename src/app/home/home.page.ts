import { Component } from '@angular/core';
import { CartasService } from '../api/cartas.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public vitoriasJogador1: number = 0;
  public vitoriasJogador2: number = 0;

  private rodadas: number = 0;
  public pontosJogador1 = 0;
  public pontosJogador2 = 0;

  public mensagem: string = '';
  public cartasJogador1: any[] = [];
  public cartasJogador2: any[] = [];

  constructor(private cartasService: CartasService) {
    this.sortearCartas();
  }

  public async sortearCartas() {
    const baralho: any = await firstValueFrom(
      this.cartasService.obterBaralho()
    );
    const deckId = baralho.deck_id;

    const cartasJogador1: any = await firstValueFrom(
      this.cartasService.obterCartas(deckId)
    );
    this.cartasJogador1 = cartasJogador1.cards;

    const cartasJogador2: any = await firstValueFrom(
      this.cartasService.obterCartas(deckId)
    );
    this.cartasJogador2 = cartasJogador2.cards;

    this.verificarVencedor();

    // this.cartasService.obterBaralho()
    // .subscribe((dados: any) => {
    //   const deckId = dados.deck_id;

    //   this.cartasService.obterCartas(deckId).subscribe((dados: any) => {
    //     this.cartasJogador1 = dados.cards;

    //     this.cartasService.obterCartas(deckId).subscribe((dados: any) => {
    //       this.cartasJogador2 = dados.cards;

    //       //Verificar o vencedor
    //       this.verificarVencedor();
    //     });
    //   });
    // });
  }

  private obterValorCarta(carta: string) {
    switch (carta) {
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case '10':
        return parseInt(carta);
      case 'ACE':
        return 1;
      case 'JACK':
        return 11;
      case 'QUEEN':
        return 12;
      case 'KING':
        return 13;
    }
    return 0;
  }

  private verificarVencedor() {
    for (let i = 0; i < this.cartasJogador1.length; i++) {
      const cartaJogador1 = this.cartasJogador1[i];
      const valorCartaJogador1 = this.obterValorCarta(cartaJogador1.value);

      const cartaJogador2 = this.cartasJogador2[i];
      const valorCartaJogador2 = this.obterValorCarta(cartaJogador2.value);

      if (valorCartaJogador1 > valorCartaJogador2) {
        this.pontosJogador1++;
      } else if (valorCartaJogador1 < valorCartaJogador2) {
        this.pontosJogador2++;
      }
    }

    this.rodadas++;
    if (this.rodadas == 1) {
      this.mensagem = '';
    } else if (this.rodadas == 3) {
      if (this.pontosJogador1 > this.pontosJogador2) {
        this.vitoriasJogador1++;
        this.mensagem = `${this.pontosJogador1} x ${this.pontosJogador2}: O Jogador 1 é o vencedor.`;
      } else if (this.pontosJogador1 < this.pontosJogador2) {
        this.vitoriasJogador2++;
        this.mensagem = `${this.pontosJogador1} x ${this.pontosJogador2}: O Jogador 2 é o vencedor.`;
      } else {
        this.mensagem = `${this.pontosJogador1} x ${this.pontosJogador2}: Jogo empatou!`;
      }

      this.rodadas = 0;
      this.pontosJogador1 = 0;
      this.pontosJogador2 = 0;
    }
  }
}
