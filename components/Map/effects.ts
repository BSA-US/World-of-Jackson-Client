import * as DeckGLCore from "@deck.gl/core";

const LightingEffect: any = DeckGLCore.LightingEffect;
const AmbientLight: any = DeckGLCore.AmbientLight;
// const SunLight: any = DeckGLCore.SunLight;
const DirectionalLight: any = DeckGLCore.DirectionalLight;

const ambientLight = new AmbientLight({
    color: [255, 255, 255],
    intensity: 1.0
});

// const dirLight = new SunLight({
//     timestamp: Date.UTC(2019, 7, 1, 22),
//     color: [255, 255, 255],
//     intensity: 1.0,
//     _shadow: true
// });
const dirLight = new DirectionalLight({
    direction: [10, -100, -100],
    color: [255, 255, 255],
    intensity: 1.0,
    _shadow: true
});

const lightingEffect = new LightingEffect({ ambientLight, dirLight });
lightingEffect.shadowColor = [0, 0, 0, 0.5];

const effects = [lightingEffect]

export default effects
