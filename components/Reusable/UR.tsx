import { useGLTF, Center } from '@react-three/drei'
import { ThreeElements } from '@react-three/fiber'
import * as THREE from 'three'
import { useMemo } from 'react'

export function URText(props: ThreeElements['group']) {
  const { nodes, materials } = useGLTF('/models/UR.glb') as unknown as {
    nodes: {
      UR_Logo: THREE.Mesh
    }
    materials: {
      ['Material.001']: THREE.Material
    }
  }

  // Pre-compute the geometry to prevent recalculations
  const geometry = useMemo(() => nodes.UR_Logo.geometry, [nodes.UR_Logo.geometry])

  return (
    <Center disableX={false} disableY={false} disableZ={false} precise={false}>
      <group {...props} dispose={null}>
        <mesh
          geometry={geometry}
          material={materials['Material.001']}
          scale={1.2}
        />
      </group>
    </Center>
  )
}

useGLTF.preload('/models/UR.glb')