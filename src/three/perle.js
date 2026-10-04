// Sculpture 3D de la « perle » : une sphère déformée par un bruit organique,
// au matériau nacré. Chargée à la demande (import dynamique), jamais indispensable :
// une image fixe la remplace si WebGL est absent, lent ou si les animations sont réduites.
import {
  ACESFilmicToneMapping,
  Color,
  DirectionalLight,
  IcosahedronGeometry,
  Mesh,
  MeshPhysicalMaterial,
  PerspectiveCamera,
  PMREMGenerator,
  Scene,
  SRGBColorSpace,
  WebGLRenderer,
} from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

// Palette de matières, alignée sur les jetons de couleur du site.
export const MATIERES = {
  nacre: {
    color: '#f0e3da',
    roughness: 0.3,
    metalness: 0.04,
    clearcoat: 0.7,
    clearcoatRoughness: 0.22,
    iridescence: 1,
    iridescenceIOR: 1.32,
    iridescenceThicknessRange: [160, 420],
    sheen: 0.7,
    sheenColor: '#f4d2ca',
    sheenRoughness: 0.45,
  },
  poudre: {
    color: '#e6bdb3',
    roughness: 0.42,
    metalness: 0,
    clearcoat: 0.35,
    clearcoatRoughness: 0.4,
    iridescence: 0.45,
    iridescenceIOR: 1.25,
    iridescenceThicknessRange: [200, 380],
    sheen: 0.9,
    sheenColor: '#f7dcd5',
    sheenRoughness: 0.6,
  },
  champagne: {
    color: '#e2c4a6',
    roughness: 0.28,
    metalness: 0.22,
    clearcoat: 0.6,
    clearcoatRoughness: 0.2,
    iridescence: 0.55,
    iridescenceIOR: 1.3,
    iridescenceThicknessRange: [220, 460],
    sheen: 0.4,
    sheenColor: '#f6d9c8',
    sheenRoughness: 0.5,
  },
}

// Bruit simplex 3D (Ashima Arts, licence MIT).
const BRUIT = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+10.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.5-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);m=m*m;
  return 105.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
uniform float uTemps;
uniform float uAmp;
uniform float uFreq;
uniform float uGraine;
uniform vec3 uEtirement;
float deformation(vec3 p){
  vec3 q=p*uFreq+vec3(uGraine);
  return uAmp*snoise(q+vec3(0.0,uTemps*0.11,uTemps*0.07))
       +uAmp*0.08*snoise(q*1.9-vec3(uTemps*0.05));
}
vec3 deplacer(vec3 p){ return p*(1.0+deformation(p))*uEtirement; }
`

/**
 * @param {HTMLCanvasElement} canvas
 * @param {object} options
 *  matiere   : 'nacre' | 'poudre' | 'champagne'
 *  detail    : finesse du maillage (24 sur mobile, 64 sur ordinateur)
 *  dpr       : densité de pixels plafonnée
 *  forme     : { amp, freq, graine, etirement: [x, y, z] }
 */
export function creerPerle(canvas, { matiere = 'nacre', detail = 64, dpr = 1.5, forme = {} } = {}) {
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' })
  renderer.setPixelRatio(dpr)
  renderer.setClearColor(0x000000, 0)
  renderer.toneMapping = ACESFilmicToneMapping
  renderer.toneMappingExposure = 0.92
  renderer.outputColorSpace = SRGBColorSpace

  const scene = new Scene()
  const pmrem = new PMREMGenerator(renderer)
  const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
  scene.environment = envTexture
  scene.environmentIntensity = 0.62
  pmrem.dispose()

  // Lumière chaude rasante, comme une lampe de cabine.
  const lumiere = new DirectionalLight(new Color('#fff0e4'), 2.2)
  lumiere.position.set(-3, 3.5, 2.2)
  scene.add(lumiere)
  // Contre-jour rosé, très doux, pour détacher la silhouette du fond.
  const contre = new DirectionalLight(new Color('#f3c9c0'), 0.9)
  contre.position.set(3, -1.5, -2.5)
  scene.add(contre)

  const camera = new PerspectiveCamera(28, 1, 0.1, 50)
  camera.position.set(0, 0, 6.2)

  const uniforms = {
    uTemps: { value: 0 },
    uAmp: { value: forme.amp ?? 0.22 },
    uFreq: { value: forme.freq ?? 0.62 },
    uGraine: { value: forme.graine ?? 1.7 },
    uEtirement: { value: forme.etirement ?? [0.96, 1.06, 0.96] },
  }

  const { sheenColor, color, ...reste } = MATIERES[matiere] ?? MATIERES.nacre
  const material = new MeshPhysicalMaterial({
    ...reste,
    color: new Color(color),
    sheenColor: new Color(sheenColor),
  })
  material.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms)
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', `#include <common>\n${BRUIT}`)
      .replace(
        '#include <beginnormal_vertex>',
        /* glsl */ `
        vec3 pBase = normalize(position);
        vec3 tang = normalize(abs(pBase.y) < 0.99 ? cross(pBase, vec3(0.0, 1.0, 0.0)) : cross(pBase, vec3(1.0, 0.0, 0.0)));
        vec3 bitang = normalize(cross(pBase, tang));
        vec3 pD = deplacer(pBase);
        vec3 pT = deplacer(normalize(pBase + tang * 0.01));
        vec3 pB = deplacer(normalize(pBase + bitang * 0.01));
        vec3 objectNormal = normalize(cross(pT - pD, pB - pD));
        if (dot(objectNormal, pBase) < 0.0) objectNormal = -objectNormal;
        `,
      )
      .replace('#include <begin_vertex>', 'vec3 transformed = pD;')
  }

  const geometry = new IcosahedronGeometry(1, detail)
  const mesh = new Mesh(geometry, material)
  scene.add(mesh)

  // État piloté de l'extérieur (pointeur, défilement), lissé à chaque image.
  const cible = { rx: 0, ry: 0, defil: 0 }
  const actuel = { rx: 0, ry: 0, defil: 0 }

  function redimensionner(w, h) {
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
  }

  function rendre(tempsSec) {
    actuel.rx += (cible.rx - actuel.rx) * 0.05
    actuel.ry += (cible.ry - actuel.ry) * 0.05
    actuel.defil += (cible.defil - actuel.defil) * 0.08

    uniforms.uTemps.value = tempsSec
    // Respiration : un souffle toutes les ~7 secondes.
    const souffle = 1 + Math.sin(tempsSec * 0.9) * 0.012
    mesh.scale.setScalar(souffle)
    mesh.rotation.x = 0.18 + actuel.rx + actuel.defil * 0.35
    mesh.rotation.y = tempsSec * 0.035 + actuel.ry + actuel.defil * 0.9
    renderer.render(scene, camera)
  }

  return {
    rendre,
    redimensionner,
    pointer(x, y) {
      cible.ry = x * 0.35
      cible.rx = y * 0.22
    },
    defilement(p) {
      cible.defil = p
    },
    detruire() {
      geometry.dispose()
      material.dispose()
      envTexture.dispose()
      renderer.dispose()
    },
  }
}
