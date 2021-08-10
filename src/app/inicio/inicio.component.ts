import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  postagem: Postagem = new Postagem()
  listaPostagem : Postagem[]

  tema: Tema = new Tema()
  idTema: number
  listaTemas: Tema[]

  user: User = new User()
  idUser = environment.id

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private authservice: AuthService
  ) { }

  ngOnInit(): void {
    
    if(environment.token ==''){
     /* alert('Sua sessão expirou!') */
      this.router.navigate(['/entrar'])
    }
    this.getAllTemas()
    this.getAllPostagem()
  }

  findByIdUser(){
    this.authservice.getByIdUser(this.idUser).subscribe((resp: User)=>{
      this.user = resp
    })
  }
  
  getAllTemas(){
    this.temaService.getAllTema().subscribe((resp: Tema[])=>{
     this.listaTemas = resp
    })
  }

  findByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema)=>{
      this.tema = resp
    })
  }

  getAllPostagem(){
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[])=>{
      this.listaPostagem = resp
    })
  }

  postar(){
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.user.id = this.idUser
    this.postagem.usuario = this.user
    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem)=>{
      this.postagem = resp
      alert('postagem realizada com sucesso!')
      this.postagem = new Postagem
      this.getAllPostagem()
    })
  }

  
}
