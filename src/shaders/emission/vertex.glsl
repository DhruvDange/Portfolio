varying vec2 vUv;

void main(){
    vec4 modelPositon = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPositon;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    vUv = uv;
}