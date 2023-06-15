import { Action } from "rxjs/internal/scheduler/Action"

export class User {

    constructor(
        id: number,
        nom: string,
        email: string,
        tel: number,
        msg: string,
    ) {
        this.id = id
        this.nom = nom
        this.email = email
        this.tel = tel
        this.msg = msg
    }
    id: number
    nom: string
    email: string
    tel: number
    msg: string


}

export class Med {

    constructor(
        id: number,
        username: string,
        email: string,
        tel: number,
        loc: string,
        sexe:string,
        mp: string,
        cmp: string,
        date: Date,
        conditions: string,
        heure:Date,
        msg:string,
        action:string
    ) {
        this.id = id
        this.username = username
        this.email = email
        this.tel = tel
        this.loc = loc
        this.sexe=sexe
        this.mp = mp
        this.cmp = cmp
        this.date = date
        this.conditions = conditions
        this.heure=heure
        this.msg=msg
        this.action=action

    } 
    id: number
    username: string
    email: string
    tel: number
    loc: string
    sexe:string
    mp: string
    cmp: string
    date: Date
    conditions: string
    heure:Date
    msg:string
    action:string





}

export class Patient {

    constructor(
        P_id: number,
        P_nom: string,
        P_prenom: string,
        P_tel: number,
        P_email: string,
        P_region: string,
        P_c: string,
        P_sexe: string,
        P_nbs: number,
        P_pt: number,

    ) {
        this.P_id = P_id
        this.P_nom = P_nom
        this.P_prenom = P_prenom
        this.P_tel = P_tel
        this.P_email = P_email
        this.P_region = P_region
        this.P_c = P_c
        this.P_sexe = P_sexe
        this.P_nbs = P_nbs
        this.P_pt = P_pt
    }
    P_id: number
    P_nom: string
    P_prenom: string
    P_tel: number
    P_email: string
    P_region: string
    P_c: string
    P_sexe: string
    P_nbs: number
    P_pt: number







}

export class matriel {
    constructor(
        id: number,
        Nom: string,
        Description: string,
        Quantite: string,
        Prix: number,
        Date: Date
    ) {
        this.id = id
        this.Nom = Nom
        this.Description = Description
        this.Quantite = Quantite
        this.Prix = Prix
        this.Date = Date
    }
    id: number
    Nom: string
    Description: string
    Quantite: string
    Prix: number
    Date: Date






}
export class recette {
    constructor(
        id: number,
        recette: number,
        depense: number,
        description: string,
        beneficie: number,
        date: string,
        jour: string
    ) {
        this.id = id
        this.recette = recette
        this.depense = depense
        this.description = description
        this.beneficie = beneficie
        this.date = date
        this.jour = jour
    }
    id: number
    recette: number
    depense: number
    description: string
    beneficie: number
    date: string
    jour: string

}

export class register {
    constructor(
        id: number,
        nom: string,
        prenom: string,
        email: string,
        tel: number,
        region: string,
        date: Date,
        condition: string,
        sexe: string,
        heure:Date,
        msg:string
    ) {
        this.id = id
        this.nom = nom
        this.prenom = prenom
        this.email = email
        this.tel = tel
        this.region = region
        this.date = date
        this.condition = condition
        this.sexe = sexe
        this.heure=heure
        this.msg=msg
    } id: number
    nom: string
    prenom: string
    email: string
    tel: number
    region: string
    date: Date
    condition: string
    sexe: string
    heure:Date
    msg:string

}
export class admin {
    constructor(
        id: number,
        nom: string,
        prenom: string,
        tel: number,
        email: string,
        password: string,
  
    ) {
        this.id = id
        this.nom = nom
        this.prenom = prenom
        this.tel = tel
        this.email = email
        this.password = password
        
    } 
        id: number
        nom: string
        prenom: string
        tel: number
        email: string
        password: string

}
