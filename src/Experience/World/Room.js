import * as THREE from "three";
import Experience from "../Experience";
import gsap from "gsap";

import { Reflector } from "three/examples/jsm/objects/Reflector.js";
import projects from "../projects";
import nanoLeafVertexShader from "../../shaders/nanoLeaf/vertex.glsl";
import nanoLeafFragmentShader from "../../shaders/nanoLeaf/fragment.glsl";
import emissionFragmentShader from "../../shaders/emission/fragment.glsl";
import emissionVertexShader from "../../shaders/emission/vertex.glsl";
import glassFragmentShader from "../../shaders/glass/fragment.glsl";
import arrowFragmentShader from "../../shaders/arrow/fragment.glsl";
import arrowVertexShader from "../../shaders/arrow/vertex.glsl";

export default class Room {
  constructor() {
    this.experience = new Experience();
    this.camera = this.experience.camera;
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.debug = this.experience.debug;

    // Setup
    this.resources = this.resources.items;
    this.roomModel = this.resources.roomModel; // room GLTF file
    this.emissionModel = this.resources.emissionModel;
    this.projectsModel = this.resources.projectsModel;

    // Projects scene
    this.projects = projects; // projects list
    this.handleMouseMove = this.handleMouseMove.bind(this); // so that we can remove listener
    this.uAlpha = 0; // uAlpha for arrow and text
    this.mouseMesh = null; // to move mouse in project scene
    this.showing = 0; // current project displayed

    // screen size
    this.monitorGeometry = new THREE.PlaneBufferGeometry(0.55, 0.3);

    window.addEventListener("mousemove", this.handleMouseMove, true);

    this.setModel();
    this.extractChildren();
    this.setTextures();
    this.setMaterials();
    this.setMesh();
    this.setReflector();
  }

  setModel() {
    this.model = this.roomModel.scene;
    this.eModel = this.emissionModel.scene;
    this.projectsModel = this.projectsModel.scene;
    this.eModel.scale.set(0.04, 0.04, 0.04);
    this.model.scale.set(0.04, 0.04, 0.04);
    this.projectsModel.scale.set(0.04, 0.04, 0.04);

    // // add a point light
    // this.pointLight = new THREE.PointLight(0xfffffff, 0.3)
    // this.pointLight.position.set(-0.3, 1.5, -0.5)
    // this.scene.add(this.pointLight)
  }

  // remove items from scene to update later
  extractChildren() {
    // Static models of scene
    this.roomBase = this.model.children.find((child) => child.name === "Base");
    this.items1Mesh = this.model.children.find(
      (child) => child.name === "RoomItems1"
    );
    this.items2Mesh = this.model.children.find(
      (child) => child.name === "RoomItems2"
    );

    this.headphoneMesh = this.model.children.find(
      (child) => child.name === "headphones"
    );
    this.canMesh = this.model.children.find((child) => child.name === "can");
    this.emissionMesh = this.eModel.children.find(
      (child) => child.name === "emission"
    );
    this.nanoLeafMesh = this.eModel.children.find(
      (child) => child.name === "nanoLeafLights"
    );
    this.postItMesh = this.model.children.find(
      (child) => child.name === "postit"
    );
    this.textMesh = this.model.children.find(
      (child) => child.name === "SkillsText"
    );
    this.switchMesh = this.model.children.find(
      (child) => child.name === "switch"
    );
    this.switchPlateMesh = this.model.children.find(
      (child) => child.name === "switchPlate"
    );
    this.mouseMesh = this.model.children.find(
      (child) => child.name === "mouseBody"
    );
    this.eMouseMesh = this.eModel.children.find(
      (child) => child.name === "eMouse"
    );
    this.mouseMesh.position.y += 0.02;
    this.eMouseMesh.position.y += 0.02;

    this.arrow1Mesh = this.model.children.find(
      (child) => child.name === "arrow1"
    );
    this.arrow2Mesh = this.model.children.find(
      (child) => child.name === "arrow2"
    );
    this.workTextMesh = this.model.children.find(
      (child) => child.name === "Work"
    );

    this.skillsTextMesh = this.model.children.find(
      (child) => child.name === "SkillsText"
    );
    this.projectsTextMesh = this.model.children.find(
      (child) => child.name === "Projects"
    );
    this.skillsHTextMesh = this.model.children.find(
      (child) => child.name === "Skills"
    );

    this.discord = this.projectsModel.children.find(
      (child) => child.name === "Discord"
    );
    this.toddlert = this.projectsModel.children.find(
      (child) => child.name === "Toddlert"
    );
    this.vision = this.projectsModel.children.find(
      (child) => child.name === "Vision"
    );
    this.ppml = this.projectsModel.children.find(
      (child) => child.name === "PPML"
    );
    this.map = this.projectsModel.children.find(
      (child) => child.name === "Map"
    );

    // // set Switch to off position
    // this.switchMesh.rotation.z -= 0.9

    // // fans -> dynamic
    this.blade1 = this.eModel.children.find(
      (child) => child.name === "eBlade1"
    );
    this.blade2 = this.eModel.children.find(
      (child) => child.name === "eBlade2"
    );
    this.blade3 = this.eModel.children.find(
      (child) => child.name === "eBlade3"
    );
    this.blade4 = this.eModel.children.find(
      (child) => child.name === "eBlade4"
    );

    // // for raycaster
    this.objectsToIntersect = [
      this.canMesh,
      this.headphoneMesh,
      this.switchMesh,
      this.switchPlateMesh,
      this.arrow1Mesh,
      this.arrow2Mesh,
    ];
  }

  // extract textures from loaded resources
  setTextures() {
    this.textureBase = this.resources.roomTexture1;
    this.texture1 = this.resources.roomTexture2;
    this.texture2 = this.resources.roomTexture3;
    this.projectsTexture = this.resources.projectsTexture;

    const textures = [
      this.textureBase,
      this.texture1,
      this.texture2,
      this.projectsTexture,
    ];

    for (const texture of textures) {
      texture.flipY = false;
      texture.encoding = THREE.sRGBEncoding;
      texture.generateMipmaps = true;
    }

    this.screenTexture = this.resources.screen;
  }

  // basic room material
  roomMaterial() {
    return new THREE.MeshBasicMaterial({
      color: 0x1a2c3c,
      map: this.textureBase,
      side: THREE.DoubleSide,
      opacity: 1,
    });
  }

  roomMaterial2() {
    return new THREE.MeshBasicMaterial({
      color: 0x1a2c3c,
      opacity: 1,
      map: this.texture1,
      side: THREE.DoubleSide,
    });
  }

  roomMaterial3() {
    return new THREE.MeshBasicMaterial({
      color: 0x1a2c3c,
      opacity: 1,
      map: this.texture2,
      side: THREE.DoubleSide,
    });
  }

  // materials for emissions
  setEmissionMaterial() {
    // Nanoleaf
    this.nanoLeafMesh.material = new THREE.ShaderMaterial({
      uniforms: {
        uAlpha: { value: 1 },
        uTime: { value: 0 },
        uColorStart: { value: new THREE.Color("#CFCFCF") },
        uColorEnd: { value: new THREE.Color("#0077b6") },
      },
      fragmentShader: nanoLeafFragmentShader,
      vertexShader: nanoLeafVertexShader,
    });

    // all other emissions
    this.emissionMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uAlpha: { value: 1 },
        uTime: { value: 0 },
        uColorStart: { value: new THREE.Color("#90e0ef") },
        uColorEnd: { value: new THREE.Color("#0077b6") },
      },
      fragmentShader: emissionFragmentShader,
      vertexShader: emissionVertexShader,
    });

    // arrow and text for projects part
    this.arrowColor = new THREE.Color(0x52b788);
    this.arrowMaterial = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        uAlpha: { value: this.uAlpha },
        uColor: { value: this.arrowColor },
      },
      fragmentShader: arrowFragmentShader,
      vertexShader: arrowVertexShader,
    });

    // static color for fans
    this.bladeMaterial = new THREE.MeshBasicMaterial({ color: "#0077b6" });
    //

    if (this.debugFolder) {
      this.debugFolder
        .addColor(this.nanoLeafMesh.material.uniforms.uColorStart, "value")
        .name("NanoLeaf uStart");
      this.debugFolder
        .addColor(this.nanoLeafMesh.material.uniforms.uColorEnd, "value")
        .name("NanoLeaf uEnd");

      this.debugFolder
        .addColor(this.emissionMaterial.uniforms.uColorStart, "value")
        .name("Emission uStart");
      this.debugFolder
        .addColor(this.emissionMaterial.uniforms.uColorEnd, "value")
        .name("Emission uStart");

      this.debugFolder.addColor(this.bladeMaterial, "color").name("Fan color");

      this.debugFolder
        .addColor(this.roomBase.material, "color")
        .name("Room color");
    }

    // assign materials
    this.emissionMesh.material = this.emissionMaterial;
    this.eMouseMesh.material = this.emissionMaterial;
    this.blade1.material = this.bladeMaterial;
    this.blade2.material = this.bladeMaterial;
    this.blade3.material = this.bladeMaterial;
    this.blade4.material = this.bladeMaterial;
    this.arrow1Mesh.material = this.arrowMaterial;
    this.arrow2Mesh.material = this.arrowMaterial;
    this.workTextMesh.material = this.arrowMaterial;
  }

  // assign material to sketchfab model
  setSketchfabMaterial() {
    return new THREE.MeshBasicMaterial({ map: this.projectsTexture });
  }

  setMeshSketchfab(obj3d) {
    obj3d.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = this.setSketchfabMaterial();
      }
    });
  }

  // set materials for other mesh
  setMaterials() {
    // Materials for text and postit
    this.postitMaterial = new THREE.MeshBasicMaterial({ color: 0xe5b8ff });
    this.textMaterial = new THREE.MeshBasicMaterial({ color: 0x1c1229 });

    this.discord = this.setMeshSketchfab(this.discord);
    this.toddlert = this.setMeshSketchfab(this.toddlert);
    this.vision = this.setMeshSketchfab(this.vision);
    this.ppml = this.setMeshSketchfab(this.ppml);
    this.map = this.setMeshSketchfab(this.map);

    // Give them individual materials for hover function
    this.roomBase.material = this.roomMaterial();
    this.items1Mesh.material = this.roomMaterial2();
    this.items2Mesh.material = this.roomMaterial3();
    this.headphoneMesh.material = this.roomMaterial2();
    this.canMesh.material = this.roomMaterial3();
    this.switchPlateMesh.material = this.roomMaterial3();
    this.switchMesh.material = this.roomMaterial3();
    this.mouseMesh.material = this.roomMaterial2();

    this.postItMesh.material = this.postitMaterial;
    this.textMesh.material = this.textMaterial;
    this.skillsTextMesh.material = this.textMaterial;
    this.projectsTextMesh.material = this.textMaterial;
    this.skillsHTextMesh.material = this.textMaterial;

    this.setEmissionMaterial();
    this.createScreenSaver(); // create screen
  }

  // SideGlass for pc
  setReflector() {
    const reflectorGeometry = new THREE.PlaneBufferGeometry(1, 1);
    const glass = new Reflector(reflectorGeometry, {
      clipBias: 0.003,
      textureWidth: window.innerWidth,
      textureHeight: window.innerHeight,
      color: 0x777777,
    });
    glass.material.transparent = true;
    glass.material.fragmentShader = glassFragmentShader;
    glass.rotation.y = -Math.PI / 2;
    glass.position.set(0.188, 0.7, -0.647);
    glass.scale.set(0.3, 0.36, 1);
    this.scene.add(glass);
  }

  // Add room to scene
  setMesh() {
    this.scene.add(this.model);
    this.scene.add(this.eModel);
    this.scene.add(this.projectsModel);
  }

  // Update colors on switch flip
  updateColorHex(hex, postit, text, arrow, sign) {
    this.roomBase.material.color.setHex(hex);
    this.items1Mesh.material.color.setHex(hex);
    this.items2Mesh.material.color.setHex(hex);
    this.headphoneMesh.material.color.setHex(hex);
    this.canMesh.material.color.setHex(hex);
    this.switchPlateMesh.material.color.setHex(hex);
    this.switchMesh.material.color.setHex(hex);
    this.mouseMesh.material.color.setHex(hex);
    this.arrowMaterial.uniforms.uColor.value = new THREE.Color(arrow);
    this.postItMesh.material.color.setHex(postit);
    this.textMesh.material.color.setHex(text);
  }

  // update rotation and uTime
  update() {
    // Update uTime of shader materials
    this.nanoLeafMesh.material.uniforms.uTime.value = this.time.elapsed * 0.001;
    this.emissionMesh.material.uniforms.uTime.value = this.time.elapsed * 0.001;
    // Update rotation of fan blades
    this.blade1.rotation.z = this.time.elapsed * 0.001 * 2;
    this.blade2.rotation.z = this.time.elapsed * 0.001 * 2;
    this.blade3.rotation.z = this.time.elapsed * 0.001 * 2;
    this.blade4.rotation.z = this.time.elapsed * 0.001 * 2;
  }

  /**
   * Project PART
   */

  // Handle mouse move in project part
  handleMouseMove(e) {
    this.mouseMesh.position.z =
      -14 + (e.clientY / window.outerHeight - 0.5) * 0.5;
    this.eMouseMesh.position.z =
      -14 + (e.clientY / window.outerHeight - 0.5) * 0.5;

    this.mouseMesh.position.x =
      -4.97 + (e.clientX / window.outerWidth - 0.5) * 0.7;
    this.eMouseMesh.position.x =
      -4.97 + (e.clientX / window.outerWidth - 0.5) * 0.7;
  }

  // Create plane and set in monitor
  createScreen(map) {
    map.encoding = THREE.sRGBEncoding;
    const monitorMaterial = new THREE.MeshBasicMaterial({
      color: "#b5b5b5",
      map: map,
      side: THREE.DoubleSide,
    });
    const monitor = new THREE.Mesh(this.monitorGeometry, monitorMaterial);
    monitor.position.set(-0.403, 0.748, -0.785);
    return monitor;
  }

  // Create screensaver for when bodymovin destroyed
  createScreenSaver() {
    const ss = this.resources.wallpaper
    ss.flipY = false;
    ss.encoding = THREE.sRGBEncoding;
    ss.generateMipmaps = true;
    const screenSaverMaterial = new THREE.MeshBasicMaterial({
      map: ss,
      side: THREE.DoubleSide,
    });
    screenSaverMaterial.depthWrite = false;
    this.screenSaver = new THREE.Mesh(
      this.monitorGeometry,
      screenSaverMaterial
    );
    this.screenSaver.position.set(-0.403, 0.748, 3);
    this.screenSaver.rotation.z = -Math.PI;
    this.screenSaver.rotation.y = -Math.PI;
    this.scene.add(this.screenSaver);
    this.projects[0].model = this.screenSaver;
    this.setScreen();
  }

  // set the sscene to display projects
  setProjectScene() {
    if (this.sizes.width < 480) {
      this.arrow1Mesh.scale.set(0.25, 0.08, 0.1);
      this.arrow2Mesh.scale.set(0.25, 0.08, 0.1);
      this.arrow1Mesh.position.y -= 0.04;
      this.arrow2Mesh.position.y -= 0.04;
    }
    gsap.to(this.arrowMaterial.uniforms.uAlpha, { duration: 0.5, value: 1 });
    for (let i = 1; i < this.projects.length; i++) {
      this.objectsToIntersect.push(this.projects[i].model);
    }
    this.nextScreen();
  }

  // when arrow2 is clicked, goto next project
  nextScreen() {
    this.projects[this.showing++].model.position.z = 3;
    if (this.projects[this.showing] === undefined) {
      this.showing = 1;
    }
    this.projects[this.showing].model.position.z = -0.782;
  }

  // arrow1, show prev project
  prevScreen() {
    this.projects[this.showing--].model.position.z = 3;
    if (this.showing === 0) {
      this.showing = this.projects.length - 1;
    }
    this.projects[this.showing].model.position.z = -0.782;
  }

  // Remove projects and display Screen Saver
  removeProjectScene() {
    gsap.to(this.arrowMaterial.uniforms.uAlpha, { duration: 0.5, value: 0 });
    for (let i = 1; i < this.projects.length; i++) {
      this.projects[i].model.position.z = 3;
      this.objectsToIntersect.pop(this.projects[i].model);
    }
    this.showing = 0;
    this.projects[this.showing].model.position.z = -0.782;
  }

  // Create all project screens and hide until project part
  setScreen() {
    for (let i = 1; i < this.projects.length; i++) {
      this.projects[i].image = this.resources[this.projects[i].name];
      this.projects[i].image.flipY = true;
      this.projects[i].model = this.createScreen(this.projects[i].image);
      this.projects[i].model.name = this.projects[i].name;
      this.projects[i].model.url = this.projects[i].href;
      this.projects[i].model.position.z = 3;
      this.projects[i].model.rotation.z = -Math.PI;
      this.projects[i].model.rotation.y = -Math.PI;
      this.scene.add(this.projects[i].model);
    }
  }
}
