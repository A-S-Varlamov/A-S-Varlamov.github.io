import * as THREE from 'three'
import { Engine as e } from './Engine.js'
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js'

export class SkyLights {

    sunLight = null
    lightHelper = null

    static createLights() {

        this.sunLight = new THREE.DirectionalLight('#fff', 4)
        this.sunLight.position.set(-10, 20, 15)
        e.scene.add(this.sunLight)

        // this.lightHelper = new THREE.DirectionalLightHelper(this.sunLight, 1)
        // e.scene.add(this.lightHelper)

        this.sunLight.castShadow = true
        // this.sunLight.shadow.bias = -0.01
        e.renderer.shadowMap.type = THREE.PCFShadowMap // PCFShadowMap // BasicShadowMap //VSMShadowMap
        // this.sunLight.shadow.radius = 4
        // this.sunLight.shadow.blurSamples = 3

        this.sunLight.shadow.camera.left = -10
        this.sunLight.shadow.camera.right = 10
        this.sunLight.shadow.camera.top = 10
        this.sunLight.shadow.camera.bottom = -10
        this.sunLight.shadow.camera.near = 15
        this.sunLight.shadow.camera.far = 30

        this.sunLight.shadow.mapSize.width = 2048 // 512 // 1024 // 2048 // 4096
        this.sunLight.shadow.mapSize.height = 2048 // 512 // 1024 // 2048 // 4096
    }

    static createEnviroment() {

        const loaderTexture = new RGBELoader()

        loaderTexture.load('./image/brown_photostudio_02_2k.hdr', function (texture) {
            texture.mapping = THREE.EquirectangularReflectionMapping
            e.scene.background = texture
            e.scene.environment = texture

            e.renderer.outputColorSpace = THREE.SRGBColorSpace // LinearSRGBColorSpace //NoColorSpace // SRGBColorSpace
            e.renderer.toneMapping = THREE.ACESFilmicToneMapping // ACESFilmicToneMapping // ReinhardToneMapping // LinearToneMapping //CineonToneMapping //AgXToneMapping // NeutralToneMapping

            e.scene.backgroundIntensity = 1
            e.renderer.toneMappingExposure = 0.5
        })
    }
}