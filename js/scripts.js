import * as THREE from './three.module.js'
import { Engine as e } from './Engine.js'
import { TransformControls } from './TransformControls.js'
import { SkyLights } from './SkyLights.js'

e.canvas = document.querySelector('#c')

const widthControl = createControl()
const heightControl = createControl()

let doorWidth = 0.8
let doorHeigth = 2

let floor = null
let door = null
let doorBoxLeft = null
let doorBoxUp = null
let doorBoxRight = null

showLoader()
init()

function init() {
    // e.addStats()
    e.run(animation)
    e.orbit = e.initOrbit()
    e.orbit.target.set(0, 1, 0)
    e.camera.position.set(3, 2, 3)
    e.camera.lookAt(0, 1, 0)
    SkyLights.createLights()
    SkyLights.createEnviroment()

    createGeometry()

    widthControl.control.showY = widthControl.control.showZ = false
    widthControl.target.position.set(doorWidth, doorHeigth / 2, 0)

    heightControl.control.showX = heightControl.control.showZ = false
    heightControl.target.position.set(doorWidth / 2, doorHeigth, 0)

    calculateWidth(widthControl.target.position.x)
    calculateHeight(heightControl.target.position.y)

    createEvent()
    hideLoader()
}

function animation() {
    if (e.stats) e.stats.update()
    e.renderer.render(e.scene, e.camera)
}

function createGeometry() {
    const floorGeom = new THREE.BoxGeometry(8, 0.1, 6)
    const doorGeom = new THREE.BoxGeometry(1, 1, 0.05)
    const doorBoxGeomLeft = new THREE.BoxGeometry(0.1, 1, 0.1)
    const doorBoxGeomUp = new THREE.BoxGeometry(1, 0.1, 0.1)
    const doorBoxGeomRight = new THREE.BoxGeometry(0.1, 1, 0.1)

    const texture = new THREE.TextureLoader().load('./image/wood-8.jpg')
    const roughnessTexture = new THREE.TextureLoader().load('./image/wood-8-5.jpg')

    const floorMat = new THREE.MeshStandardMaterial({ color: '#aaa' })
    const doorBoxMat = new THREE.MeshStandardMaterial({ color: '#977864' })
    const doorMat = new THREE.MeshStandardMaterial({ map: texture, roughnessMap: roughnessTexture })
    doorMat.roughness = 1.5

    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    roughnessTexture.wrapS = THREE.RepeatWrapping
    roughnessTexture.wrapT = THREE.RepeatWrapping

    floor = new THREE.Mesh(floorGeom, floorMat)
    door = new THREE.Mesh(doorGeom, doorMat)
    doorBoxLeft = new THREE.Mesh(doorBoxGeomLeft, doorBoxMat)
    doorBoxUp = new THREE.Mesh(doorBoxGeomUp, doorBoxMat)
    doorBoxRight = new THREE.Mesh(doorBoxGeomRight, doorBoxMat)

    floor.position.set(0, -0.05, 0)
    door.position.set(0, 0.5, 0)

    floor.receiveShadow = true
    door.castShadow = true
    doorBoxLeft.castShadow = true
    doorBoxUp.castShadow = true
    doorBoxRight.castShadow = true

    e.scene.add(floor)
    e.scene.add(door)
    e.scene.add(doorBoxLeft)
    e.scene.add(doorBoxRight)
    e.scene.add(doorBoxUp)
}

function createEvent() {
    widthControl.control.addEventListener('objectChange', function (event) {
        const posX = widthControl.target.position.x
        calculateWidth(posX)
    })

    heightControl.control.addEventListener('objectChange', function (event) {
        const posY = heightControl.target.position.y
        calculateHeight(posY)
    })
}

function calculateWidth(posX) {
    door.scale.x = posX
    door.position.x = posX / 2
    door.material.map.repeat.x = door.scale.x
    door.material.roughnessMap.repeat.x = door.scale.x

    doorBoxLeft.position.x = -0.05
    doorBoxRight.position.x = posX + 0.05

    doorBoxUp.scale.x = posX + 0.2
    doorBoxUp.position.x = posX / 2

    heightControl.target.position.x = posX / 2
}

function calculateHeight(posY) {
    door.scale.y = posY
    door.position.y = posY / 2
    door.material.map.repeat.y = door.scale.y
    door.material.roughnessMap.repeat.y = door.scale.y

    doorBoxLeft.scale.y = posY
    doorBoxLeft.position.y = posY / 2

    doorBoxRight.scale.y = posY
    doorBoxRight.position.y = posY / 2

    doorBoxUp.position.y = posY + 0.05

    widthControl.target.position.y = posY / 2
}

function createControl() {
    const control = new TransformControls(e.camera, e.renderer.domElement)

    control.addEventListener('dragging-changed', function (event) {
        e.orbit.enabled = !event.value
    })
    control.setTranslationSnap(0.1)
    control.setSize(0.3)

    const geom = new THREE.BoxGeometry(0.06, 0.06, 0.06)
    const mat = new THREE.MeshStandardMaterial({ color: '#0f0' })
    const obj = new THREE.Mesh(geom, mat)

    e.scene.add(control)
    e.scene.add(obj)
    control.attach(obj)
    return { control, target: obj }
}

function showLoader() {
    document.querySelector('#loader').classList.remove("not-visible")
    document.querySelector('#c').classList.add("not-visible")
}

function hideLoader() {
    document.querySelector('#loader').classList.add("not-visible")
    document.querySelector('#c').classList.remove("not-visible")
}




