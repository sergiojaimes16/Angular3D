import { Component } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  ngOnInit(){

    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer, object: THREE.Object3D<THREE.Event>;

    function init(){
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x2a3b4c);

    camera = new THREE.PerspectiveCamera(
        5,
        window.innerWidth / window.innerHeight,
        0.1,
        10000
    );
    camera.position.z = 10;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    scene.add(object);

    let control = new OrbitControls(camera, renderer.domElement);

    window.addEventListener('resize', redimensionar);

        function redimensionar(){
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.render(scene, camera);
        }

    let light = new THREE.DirectionalLight(0xffff00);
    light.position.set(0,10,15);
    scene.add(light);

    animate();
}

function animate(){
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

let loader = new STLLoader();
loader.load('../assets/3dmodels/Cuadrado.stl', (model: any) => {
  object = new THREE.Mesh(
      model,
      new THREE.MeshLambertMaterial({color: 0xffff00})
  );
  // object.scale.set(0.1, 0.1, 0.1);
  // object.position.set(0,-5,0);
  // object.rotation.x = -Math.PI/2;
  init();
});




 }
}
