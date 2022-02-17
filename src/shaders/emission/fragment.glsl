uniform float uTime;
uniform vec3 uColorStart;
uniform vec3 uColorEnd;

varying vec2 vUv;

void main(){

    float strength = sin(uTime * 3.14) * 0.8;

    vec3 color = mix(uColorStart, uColorEnd, strength);
    gl_FragColor = vec4(color, 1.0);
}