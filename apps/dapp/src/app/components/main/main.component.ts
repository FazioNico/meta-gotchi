import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FogExp2, Group, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { PixiPet } from '../../pixi-pet.class';
import { PixiPetService } from '../../pixi-pet.service';

@Component({
  selector: 'meta-gotchi-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas', {static: true, read: ElementRef}) private _canvas!: ElementRef<HTMLCanvasElement>;
  public state$ = this._service.state$;
  public backgroundColor = 0x9ac2fe; //this.getBackgroundColor(); 
  private _renderer!: WebGLRenderer;
  private _scene!: Scene;
  private _camera!: PerspectiveCamera;
  private _controls!: OrbitControls;
  private _width = window.innerWidth;
  private _height = window.innerHeight;
  private _fov = 45; 
  private _aspectRatio = this._width / this._height; 
  private _near = 0.001;
  private _far = 100;
  private _mainGroup:Group = new Group();

  constructor(
    private readonly _service: PixiPetService
  ) {}

  ngOnInit() {
    this._service.init();
  }
  
  ngAfterViewInit() {
    this._setupScene();
    this._createPixiPet();
    this._render();
  }

  actions(type: string) {
    this._service.actions(type);
  }

  private _setupScene() {
    // scene
    this._scene = new Scene();
    this._scene.fog = new FogExp2(0x9ac2fe, 0.054);
    // camera
    this._camera = new PerspectiveCamera(this._fov, this._aspectRatio, this._near, this._far);
    this._scene.add( this._camera );  
    // renderer
    if (!this._canvas) {
      throw new Error("Canvas not found");
    }
    this._renderer = new WebGLRenderer({
      antialias: true,
      canvas: this._canvas.nativeElement
    });
    this._renderer.setSize(this._width, this._height);
    this._renderer.setPixelRatio(window.devicePixelRatio);
    this._renderer.setClearColor(this.backgroundColor);
    // controls
    this._controls = new OrbitControls(this._camera, this._renderer.domElement);
    this._camera.position.set(2.56, 2, 4.4);
    // group
    this._scene.add(this._mainGroup)
    this._camera.lookAt(0,0,0)
  }

  private _createPixiPet() {
    const pet = new PixiPet();
    this._mainGroup.add(pet.datas);
  }

  private _render() {
    // this._controls.update()
    this._renderer.render(this._scene, this._camera);
    requestAnimationFrame(() => this._render());
  };

  getBackgroundColor() {
    //  use current hours to generate corresponding darker blue color
    const hours = new Date('01.01.2022 09:00').getHours();
    const blue = Math.floor(hours / 24 * 255);
    const result = `rgb(0, 0, ${blue})`;
    console.log(result);
    return result;
    
  }

}
