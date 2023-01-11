import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber'
import { Sheet } from '@mui/joy';
import { ContactShadows, Environment, GizmoHelper, GizmoViewport, Grid, OrbitControls } from '@react-three/drei';
import MorphingMesh from '../utils/MorphingMesh';
import { Cube, CulledFaces } from '../utils/Geometry';
import MazeControls from './MazeControls';

export interface MazeCell {
  x: number;
  y: number;
  value: boolean; // true = path, false = wall
}

export interface Maze {
  cells: MazeCell[][]; // 2D array of cells
}

function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

async function generateMaze(width: number, height: number): Promise<Maze> {
  const maze: Maze = { cells: [] };

  for (let y = 0; y < height; y++) {
    const row: MazeCell[] = [];
    for (let x = 0; x < width; x++) {
      row.push({ x, y, value: true });
    }
    maze.cells.push(row);
  }

  // Using depth-first search to create the perfect maze
  const dfs = (x: number, y: number) => {
    const directions = [[-2, 0], [2, 0], [0, -2], [0, 2]];
    shuffle(directions);

    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;

      if (nx >= 0 && nx < width && ny >= 0 && ny < height && maze.cells[ny][nx].value) {
        maze.cells[y + dy / 2][x + dx / 2].value = false;
        maze.cells[ny][nx].value = false;
        dfs(nx, ny);
      }
    }
  };

  dfs(0, 0);

  return maze;
}


const Walls = ({ maze }: { maze: Maze }) => {
  const { cells } = maze;

  const mesh = new MorphingMesh();
  const ref = useRef() as React.MutableRefObject<THREE.Mesh>;

  cells.forEach((cellRow, i) => {
    cellRow.forEach((cell, j) => {
      if (!cell.value) {
        // Check neighbor cells to see which faces to cull
        const culledFaces: CulledFaces = {
          px: !(j < cellRow.length - 1 && cellRow[j + 1].value) && (j < cellRow.length - 1),
          nx: !(j > 0 && cellRow[j - 1].value) && (j > 0),
          pz: !(i < cells.length - 1 && cells[i + 1][j].value) && (i < cells.length - 1),
          nz: !(i > 0 && cells[i - 1][j].value) && (i > 0),
          py: false,
          ny: false,
        }

        const { vertices, faces } = Cube(new THREE.Vector3(cell.x - cells.length / 2, 0, cell.y - cellRow.length / 2), culledFaces);
        mesh.addMesh(vertices, faces);
      }
    });
  });
  mesh.clean();

  return (
    <mesh
      ref={ref}
      castShadow
      position={[0, 0, 0]}
      geometry={mesh.toGeometry()}
    >
      <meshStandardMaterial
        color="#e33365"
        roughness={1}
        flatShading
      />
    </mesh>
  );
};

export interface MazeViewSettings {
  mazeSize: number;
  wireframe: boolean;
}

export default function MazeView() {
  const [maze, setMaze] = useState<Maze>();
  const [settings, setSettings] = useState<MazeViewSettings>({
    mazeSize: 3,
    wireframe: false,
  })
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    generateMaze(settings.mazeSize, settings.mazeSize).then(maze => {
      setMaze(maze);
      setIsLoading(false);
    });
  }, [settings]);


  return (
    <Sheet
      component="div"
      sx={{
        height: '100%',
        width: '100%',
        bgcolor: "#2b2b32"
      }}
    >
      <Canvas shadows camera={{ position: [10, 12, 12], fov: 25 }}>
        <OrbitControls makeDefault enablePan={false} />
        <Environment preset="city" />

        <group position={[0, 0, 0]}>
          {maze && <Walls maze={maze} />}
          <ContactShadows frames={1} position={[0, -0.1, 0]} scale={10 + settings.mazeSize} opacity={0.5} far={1} blur={2} />
          <Grid
            position={[0, -0.05, 0]}
            renderOrder={-1}
            args={[2 * settings.mazeSize, 2 * settings.mazeSize]}
            cellSize={0.5}
            cellThickness={1}
            cellColor="#6b6767"
            sectionSize={4}
            sectionThickness={1.5}
            sectionColor="#b13c69"
            fadeDistance={4 * settings.mazeSize + 20}
            fadeStrength={1}
            followCamera
            infiniteGrid
          />
        </group>
        <GizmoHelper alignment="bottom-left" margin={[80, 80]}>
          <GizmoViewport axisColors={['#9d4b4b', '#2f7f4f', '#3b5b9d']} labelColor="white" />
        </GizmoHelper>
      </Canvas>

      <MazeControls loading={isLoading} settings={settings} setSettings={setSettings} />
    </Sheet>
  );
}
