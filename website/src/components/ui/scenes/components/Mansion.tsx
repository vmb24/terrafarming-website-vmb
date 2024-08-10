// components/House.tsx
import React from 'react'

export const Mansion: React.FC<{ position: [number, number, number] }> = ({ position }) => {
    return (
      <group position={position}>
      {/* Primeiro andar */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[14, 6, 5]} />
        <meshStandardMaterial color="lightgray" />
      </mesh>

      {/* Segundo andar com varanda */}
      <mesh position={[0, 4.5, 0]}>
        <boxGeometry args={[12, 4, 5]} />
        <meshStandardMaterial color="lightgray" />
      </mesh>

      {/* Varanda */}
      <mesh position={[0, 3.5, -3]}>
        <boxGeometry args={[12, 0.2, 1.5]} />
        <meshStandardMaterial color="saddlebrown" />
      </mesh>

      {/* Telhados horizontais */}
      <mesh position={[0, 7, 0]}>
        <boxGeometry args={[14, 0.5, 5.5]} />
        <meshStandardMaterial color="darkred" />
      </mesh>
      <mesh position={[0, 7.5, 0]}>
        <boxGeometry args={[12, 0.5, 5.5]} />
        <meshStandardMaterial color="darkred" />
      </mesh>
      <mesh position={[0, 8, 0]}>
        <boxGeometry args={[10, 0.5, 5.5]} />
        <meshStandardMaterial color="darkred" />
      </mesh>

      {/* Janelas largas */}
      {[...Array(3)].map((_, i) => (
        <mesh key={i} position={[4.5 * (i - 1), 2.5, 2.6]}>
          <boxGeometry args={[3, 1, 0.1]} />
          <meshStandardMaterial color="white" />
        </mesh>
      ))}

      {/* Janelas largas */}
      {[...Array(3)].map((_, i) => (
        <mesh key={i} position={[3.5 * (i - 1), 5, 2.6]}>
          <boxGeometry args={[3, 1, 0.1]} />
          <meshStandardMaterial color="white" />
        </mesh>
      ))} 

      {/* Porta marrom */}
      <mesh position={[0, 0, 6]}>
        <boxGeometry args={[3, 2.1, 0]} />
        <meshStandardMaterial color="brown" />
      </mesh>
    </group>
    )
}