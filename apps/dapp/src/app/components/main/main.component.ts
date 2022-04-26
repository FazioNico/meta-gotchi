import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FogExp2, Group, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { PixiPet } from '../../pixi-pet.class';
import { PixiPetService } from '../../services/pixi-pet.service';

@Component({
  selector: 'meta-gotchi-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas', {static: true, read: ElementRef}) 
  private readonly _canvas!: ElementRef<HTMLCanvasElement>;
  private readonly _scene: Scene = new Scene();
  private readonly _width = window.innerWidth;
  private readonly _height = window.innerHeight;
  private readonly _fov = 45; 
  private readonly _aspectRatio = this._width / this._height; 
  private readonly _near = 0.001;
  private readonly _far = 100;
  private readonly _mainGroup:Group = new Group();
  private _renderer!: WebGLRenderer;
  private _camera!: PerspectiveCamera;
  private _orbitControls!: OrbitControls;
  public isAutoRotateEnabled = false;
  public readonly state$ = this._service.state$;
  public readonly backgroundColor = 0x9ac2fe;
  public get canvas(): HTMLCanvasElement {
    return this._canvas?.nativeElement;
  };
  
  constructor(
    private readonly _service: PixiPetService
  ) {}

  ngOnInit() {
    this._service.init();
  }
  
  ngAfterViewInit() {
    if (!this.canvas) {
      throw new Error("Canvas not found");
    }
    this._setupScene();
    this._createPixiPet();
    this._render();
  }

  actions(type: string) {
    switch (type) {
      case 'toggle-auto-rotate':
        this.isAutoRotateEnabled = !this.isAutoRotateEnabled;
        break;
      default:
        this._service.actions(type);
        break;
    }
  }

  private _setupScene() {
    // scene configuration
    this._scene.fog = new FogExp2(0x9ac2fe, 0.054);
    this._scene.add(this._mainGroup);
    // camera
    this._camera = new PerspectiveCamera(this._fov, this._aspectRatio, this._near, this._far);
    this._camera.position.set(2.56, 2, 4.4);
    this._camera.lookAt(0,0,0);
    this._scene.add( this._camera );  
    // renderer
    this._renderer = new WebGLRenderer({
      antialias: true,
      canvas: this.canvas
    });
    this._renderer.setSize(this._width, this._height);
    this._renderer.setPixelRatio(window.devicePixelRatio);
    this._renderer.setClearColor(this.backgroundColor);
    // controls
    this._orbitControls = new OrbitControls(this._camera, this._renderer.domElement);
    this._orbitControls.maxDistance = 10;
    this._orbitControls.minDistance = 2;
    this._orbitControls.rotateSpeed = 0.5;
    this._orbitControls.autoRotate = true;
    this._orbitControls.autoRotateSpeed = 0.5;
    this._orbitControls.minPolarAngle = 0;
    this._orbitControls.maxPolarAngle = Math.PI;
    this._orbitControls.minAzimuthAngle = -Math.PI;
    this._orbitControls.maxAzimuthAngle = Math.PI;
  }

  private _createPixiPet() {
    const pet = new PixiPet();
    this._mainGroup.add(pet.datas);
  }

  private _render() {
    if (this.isAutoRotateEnabled) {
      this._orbitControls.update();
    }
    this._renderer.render(this._scene, this._camera);
    requestAnimationFrame(() => this._render());
  };

}
