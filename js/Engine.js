// myEngine v. 0.4

import * as THREE from 'three'
// import Stats from 'stats-gl'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

export class Engine {

    static renderer = createRenderer(this.canvas)
    static scene = new THREE.Scene()
    static camera = createCamera(65, 0.1, 1000)
    // static stats = new Stats( { precision: 3, horizontal: false } )

    // static addStats() {
    //     this.stats.init( this.renderer )
    //     document.body.appendChild( this.stats.dom )
    //     this.stats.dom.style.position = 'absolute'
    // }

    static run(animate) {
        this.renderer.setAnimationLoop( animate )
        this.scene.add(this.camera)
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight
            this.camera.updateProjectionMatrix()
            this.renderer.setSize(window.innerWidth, window.innerHeight)
        })
    }

    static initOrbit() {
        const orbit = new OrbitControls( this.camera, this.renderer.domElement)
        orbit.enableDamping = true
        orbit.dampingFactor = 0.06
        orbit.rotateSpeed = 0.3
        orbit.maxDistance = 15
        orbit.minDistance = 1
        orbit.maxPolarAngle = Math.PI / 2 + 1
        orbit.minPolarAngle = Math.PI / 2 - 1.3
        orbit.autoRotate = false
        orbit.autoRotateSpeed = 0.5
        // orbit.enablePan = false
        // orbit.enableZoom = false
        return orbit
    }
}

function createRenderer() {
    const r = new THREE.WebGLRenderer({ 
        canvas: document.querySelector('#c'), 
        antialias: true, 
        forceWebGL: false 
    })
    r.shadowMap.enabled = true
    // r.useLegacyLights = false
    r.setSize(window.innerWidth, window.innerHeight)
    r.setPixelRatio(window.devicePixelRatio)
    return r
}

function createCamera(fov, min, max) {
    return new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, min, max)
}


