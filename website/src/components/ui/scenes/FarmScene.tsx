// pages/index.tsx
import type { NextPage } from 'next'
import { Canvas } from '@react-three/fiber'
import { Robot } from './components/Robot'
import { Greenhouse } from './components/Greenhouse'
import { Mansion } from './components/Mansion'
import { Trees } from './components/Trees'

export const FarmScene: NextPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-green-100">
      <Canvas camera={{ position: [0, 2, 20], fov: 60 }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />

        <mesh position={[0, 0, -20]}>
          <planeGeometry args={[100, 40]} />
          <meshStandardMaterial color="skyblue" />
        </mesh>

        {Array.from({ length: 45 }).map((_, i) => (
          <>
            <Trees key={`left-${i}`} position={[i - 20, -1, -15]} />
            <Trees key={`right-${i}`} position={[i - 20.2, -1, -15]} />
          </>
        ))}
        {Array.from({ length: 40 }).map((_, i) => (
          <>
            <Trees key={`front-left-${i}`} position={[-20, -1, i - 15]} />
            <Trees key={`front-right-${i}`} position={[20, -1, i - 15]} />
          </>
        ))}

        <Mansion position={[0, 2, -15]} />

        {/* Escada de acesso em frente à casa */}
        {Array.from({ length: 5 }).map((_, i) => (
          <mesh key={i} position={[0, 0.7 + i * 0.2, 12 + i * -0.5]}>
            <boxGeometry args={[2, 0.2, 0.5]} />
            <meshStandardMaterial color="gray" />
          </mesh>
        ))}

        {/* Corrimão da escada */}
        {Array.from({ length: 6 }).map((_, i) => (
          <>
            <mesh key={`rail-left-${i}`} position={[-1, 0.9 + i * 0.2, 12 + i * -0.5]}>
              <boxGeometry args={[0.1, 0.3, 0.5]} />
              <meshStandardMaterial color="darkgray" />
            </mesh>
            <mesh key={`rail-right-${i}`} position={[1, 0.9 + i * 0.2, 12 + i * -0.5]}>
              <boxGeometry args={[0.1, 0.3, 0.5]} />
              <meshStandardMaterial color="darkgray" />
            </mesh>
          </>
        ))}

        {/* quintal */}
        <mesh position={[0, -0.5, -5]}>
          <boxGeometry args={[25, 3, 5]} />
          <meshStandardMaterial color="sienna" />
        </mesh>

        {/* muro do quintal */}
        <mesh position={[-7, 1, -5]}>
          <boxGeometry args={[12, 2, 5]} />
          <meshStandardMaterial color="darkgray" />
        </mesh>
        <mesh position={[7, 1, -5]}>
          <boxGeometry args={[12, 2, 5]} />
          <meshStandardMaterial color="darkgray" />
        </mesh>
        <mesh position={[-5, 1, -7.5]}>
          <boxGeometry args={[5, 2, 10]} />
          <meshStandardMaterial color="darkgray" />
        </mesh>
        <mesh position={[5, 1, -7.5]}>
          <boxGeometry args={[5, 2, 10]} />
          <meshStandardMaterial color="darkgray" />
        </mesh>

        {Array.from({ length: 25 }).map((_, row) =>
          Array.from({ length: 25 }).map((_, col) => (
            <mesh key={`${row}-${col}`} position={[col * 2.5 - 25, -1, row * 2.5 - 15]}>
              <boxGeometry args={[1, 0.5, 2]} />
              <meshStandardMaterial
                color={(row + col) % 3 === 0 ? 'yellowgreen' : (row + col) % 3 === 1 ? 'goldenrod' : 'tomato'}
              />
            </mesh>
          ))
        )}

        {Array.from({ length: 20 }).map((_, i) => (
          <mesh key={`path-row-${i}`} position={[0, -1.05, i * 2.5 - 5]}>
            <boxGeometry args={[30, 0.1, 0.5]} />
            <meshStandardMaterial color="saddlebrown" />
          </mesh>
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <mesh key={`path-col-${i}`} position={[i * 2.5 - 6, -1.05, -5]}>
            <boxGeometry args={[30, 0.1, 52]} />
            <meshStandardMaterial color="saddlebrown" />
          </mesh>
        ))}

        {Array.from({ length: 3 }).map((_, i) => (
          <Robot key={i} position={[i * 3 - 5, -1, 0]} />
        ))}
      </Canvas>
    </div>
  )
}