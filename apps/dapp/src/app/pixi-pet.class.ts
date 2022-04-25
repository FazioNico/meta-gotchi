import { BoxBufferGeometry, Group, Mesh, MeshBasicMaterial, MeshMatcapMaterial } from "three";

export class PixiPet {

  private readonly _mainGroup:Group = new Group();
  private readonly _geo = new BoxBufferGeometry();
  private readonly _mat = new MeshMatcapMaterial({color: '#97a6c1'});
  private readonly _matEye = new MeshBasicMaterial({color: '#0ef80e'});
  private readonly _matEyeBlack = new MeshBasicMaterial({color: '#000'});
  private readonly _matWhite = new MeshBasicMaterial({color: '#fff'});
  private readonly _matPink = new MeshBasicMaterial({color: '#fc8df2'});
  public get datas() {
    return this._mainGroup;
  }

  constructor() {
    this._createPixiPet();
  }

  private _createPixiPet() {
    const body = this.getBody();
    const oreils = this.getOreils();
    const eyes = this.getEyes();
    const mouth = this.getMouth();
    this._mainGroup.add(...[
      body, oreils, eyes, mouth
    ]);
    // body.scale.set(1, 1, 1);
    //body.receiveShadow = true;
  }

  private getBody() {
    const group = new Group();
    const geo = this._geo;
    const mat = this._mat;
    const matWhite = this._matWhite;
    const body = new Mesh(geo, mat);
    body.scale.set(1, 0.9, 1);
    group.add(body);
    const subBody = new Mesh(geo, matWhite);
    subBody.scale.set(0.995, 0.1, 0.995);
    subBody.position.set(0, -0.5, 0)
    group.add(subBody);
    const armL = new Mesh(geo, mat);
    armL.scale.set(0.3, 0.3, 0.3);
    armL.position.set(-0.35, -0.6, 0.35)
    group.add(armL);
    const armR = new Mesh(geo, mat);
    armR.scale.set(0.3, 0.3, 0.3);
    armR.position.set(0.35, -0.6, 0.35)
    group.add(armR);
    const footL = new Mesh(geo, mat);
    footL.scale.set(0.3, 0.3, 0.3);
    footL.position.set(-0.35, -0.6, -0.35)
    group.add(footL);
    const footR = new Mesh(geo, mat);
    footR.scale.set(0.3, 0.3, 0.3);
    footR.position.set(0.35, -0.6, -0.35)
    group.add(footR);
    return group;
  }

  private getOreilL() {
    const group = new Group();
    const geo = this._geo;
    const mat = this._mat;
    const matWhite = this._matWhite;
    // left oreil
    const oL = new Mesh(geo, mat);
    oL.scale.set(0.3, 0.3, 0.2);
    oL.position.set(-0.35, 0.6, 0.4)
    group.add(oL);
    const ioL = new Mesh(geo, matWhite);
    ioL.scale.set(0.15, 0.25, 0.2);
    ioL.position.set(-0.35, 0.58, 0.405)
    group.add(ioL);
    return group;
  }

  private getOreilR() {
    const group = new Group();
    const geo = this._geo;
    const mat = this._mat;
    const matWhite = this._matWhite;
    const oR = new Mesh(geo, mat);
    oR.scale.set(0.3, 0.3, 0.2);
    oR.position.set(0.35, 0.6, 0.4)
    group.add(oR);
    const ioR = new Mesh(geo, matWhite);
    ioR.scale.set(0.15, 0.25, 0.2);
    ioR.position.set(0.35, 0.58, 0.405)
    group.add(ioR);
    return group;
  }

  private getOreils() {
    const group = new Group();
    group.add(...[this.getOreilL(), this.getOreilR()]);
    return group;
  }

  private getEyes() {
    const group = new Group();
    const eRGroup = new Group();
    const eLGroup = new Group();
    const geo = this._geo;
    const matWhite = this._matWhite;
    const matEye = this._matEye;
    const matEyeBlack = this._matEyeBlack;
    // Eye
    // eye left
    const eL = new Mesh(geo, matEye);
    eL.scale.set(0.3, 0.3, 0.1);
    eL.position.set(-0.3, 0.1, 0.4505)
    eLGroup.add(eL);
    //  eye Right
    const eR = new Mesh(geo, matEye);
    eR.scale.set(0.3, 0.3, 0.1);
    eR.position.set(0.3, 0.1, 0.4505)
    eRGroup.add(eR);
    // center Left
    const cL = new Mesh(geo, matEyeBlack);
    cL.scale.set(0.23, 0.23, 0.1);
    cL.position.set(-0.265, 0.135, 0.4515)
    eLGroup.add(cL);
    // center Right
    const cR = new Mesh(geo, matEyeBlack);
    cR.scale.set(0.23, 0.23, 0.1);
    cR.position.set(0.335, 0.135, 0.4515)
    eLGroup.add(cR);
    // blank Left
    const bL = new Mesh(geo, matWhite);
    bL.scale.set(0.1, 0.1, 0.1);
    bL.position.set(-0.2, 0.2, 0.4525)
    eLGroup.add(bL);
    // blank Left
    const bR = new Mesh(geo, matWhite);
    bR.scale.set(0.1, 0.1, 0.1);
    bR.position.set(0.4, 0.2, 0.4525)
    eRGroup.add(bR);
    group.add(...[eLGroup, eRGroup]);
    return group;
  } 

  private getMouth() {
    const group = new Group();
    const geo = this._geo;
    const matWhite = this._matWhite;
    const matPink = this._matPink;
    // left part
    const mL = new Mesh(geo, matWhite);
    mL.scale.set(0.25, 0.25, 0.1);
    mL.position.set(-0.2, -0.17, 0.5)
    // right part
    const mR = new Mesh(geo, matWhite);
    mR.scale.set(0.25, 0.25, 0.1);
    mR.position.set(0.2, -0.17, 0.5)
    // up part
    const mU = new Mesh(geo, matPink);
    mU.scale.set(0.15, 0.15, 0.1);
    mU.position.set(0, -0.12, 0.505)
    // down part
    const mD = new Mesh(geo, matWhite);
    mD.scale.set(0.15, 0.15, 0.1);
    mD.position.set(0, -0.18, 0.5)
    group.add(...[mL, mR, mU, mD]);
    return group;
  }
}