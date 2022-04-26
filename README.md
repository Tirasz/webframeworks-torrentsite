# webframeworks-torrentsite  
University assignment (pls dont look)  

- Adatmodell definiálása (legalább 4 TypeScript interfész vagy class formájában (ugyanennyi kollekció))  
: shared/models Social.ts, Torrent.ts --> 4 interfész, ugyanennyi kollekcó  

- Alkalmazás felbontása megfelelő számú komponensre (egyetlen komponens TS és HTML kódja sem haladja meg a 250 sort és soronként a 400 karaktert)  
: leghoszabb kb 80 sor  

- Reszponzív, mobile-first felület (minden adat látható és jól jelenik meg böngészőben is, mobil nézetben is)  
: Minden adat látható mobilnézetben is 🤠  

- Legalább 2 különböző attribútum direktíva használata  
: comment.component.html -- [ngStyle], [ngClass]   

- Legalább 2 különböző strukturális direktíva használata  
: torrent.component.html -- *ngFor, *ngIf  
 
- Adatátadás szülő és gyermek komponensek között (legalább 1 @Input és 1 @Output)  
: message.component.html -- 4 @Input(), menu.component.ts -- 3 @Output()  

- Legalább 10 különböző Material elem helyes használata.  
: browser.component.html -- mat-table, mat-cell, mat-header-cell, mat-header-row, mat-row, mat-paginator   
: create-torrent.component.html -- mat-spinner, mat-form-field, mat-error, mat-select, mat-label, mat-raised-button, mat-option   
: torrent.component.html -- mat-card, mat-icon   

- Adatbevitel Angular form-ok segítségével megvalósítva (legalább 2)  
: create-torrent.component.html, edit-torrent.component.html

- Legalább 1 saját Pipe osztály írása és használata  
: sum.pipe.ts -- használva: comment.component.html  

- Legalább 2 különböző Lifecycle Hook használata a teljes projektben (értelmes tartalommal, nem üresen)   
: onInit (kb mindenen), ngAfterViewInit -- browser.component.ts  

- CRUD műveletek mindegyike megvalósult (Promise, Observable használattal),   
- CRUD műveletek service-ekbe vannak kiszervezve és megfelelő módon injektálva lettek  
- Firestore adatbázis használata az adatokhoz (integráció, környezeti változók használata helyes legyen)  
: user.service.ts, torrent.service.ts, comment.service.ts  

- Legalább 2 komplex Firestore lekérdezés megvalósítása (ide tartoznak: where feltétel, rendezés, léptetés, limitálás)  
: comment.service.ts -- getAllByTorrentId (where, orderby), getRatingsForComments (where)  

- Legalább 4 különböző route a különböző oldalak eléréséhez  
: app-routing.module.ts -- browser, login, register, not-found, create-torrent, edit-torrent, torrent, **  

- Legalább 2 route levédése azonosítással (AuthGuard) (ahol ennek értelme van, pl.: egy fórum témakör megtekinthető bárki számára, de a regisztrált felhasználó adatai nem)  
: create-torrent, edit-torrent, torrent  

- Szubjektív pontozás a projekt egészére vonatkozólag (mennyire fedi le a projekt a témakört (mennyire kapcsolódik hozzá), mennyi lehet a befektetett energia a projektben)  
: Merd azt mondani h nem ez a legjobb torrent oldal a vilagon.... 🧐  
