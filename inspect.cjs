const { NodeIO } = require('@gltf-transform/core');

async function inspect() {
  const io = new NodeIO();
  const document = await io.read('public/models/character.glb');
  
  const materials = document.getRoot().listMaterials();
  console.log('Materials in the GLB:');
  materials.forEach((mat) => {
    console.log(mat.getName(), mat.getBaseColorFactor());
  });
}

inspect().catch(console.error);
