uniform float uTime;
uniform vec3 uColorStart;
uniform vec3 uColorEnd;
uniform float uAlpha;

varying vec2 vUv;

void main(){

    float strength = sin(uTime * 4.0) * 0.7;

    vec3 color = mix(uColorStart, uColorEnd, strength);
    gl_FragColor = vec4(color, uAlpha);
}