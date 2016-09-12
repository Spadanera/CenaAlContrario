function Cena() {
}
function Cena(nome, localita, locale) {
    this.Nome = nome;
    this.Localita = localita;
    this.Locale = locale;
    this.Portatas = new Array();
}
Cena.prototype = {
    CenaId: "",
    Nome: "",
    DataInserimento: "",
    Anno: "",
    NumeroPartecipanti: "",
    Localita: "",
    Locale: "",
    Portatas: [],
    Foto: null,
    OwnedByUser: false
}

function Portata() { }
function Portata(ordine, piatto) {
    this.Ordine = ordine;
    this.Piatto = piatto;
}
Portata.prototype = {
    PortataId: "",
    Ordine: 0,
    Piatto: ""
}