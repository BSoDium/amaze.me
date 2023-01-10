import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber'
import { Box, Button } from '@mui/joy';



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

function generateMaze(width: number, height: number): Maze {
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
  const ref = useRef() as any;
  return (
    <>
      {cells.map((cellRow, i) => {
        return cellRow.map((cell, j) => {
          if (!cell.value) {
            return (
              <mesh
                key={`${i}-${j}`}
                ref={ref}
                position={[cell.x - maze.cells.length / 2, cell.y - cellRow.length / 2, -40]}
              >
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color={'#363949'} />
              </mesh>
            );
          }
        });
      })}
    </>
  );
};


export default function MazeView() {
  const [maze, setMaze] = useState<Maze>();
  return (
    <Box
    sx={{
      width: '100vw',
      height: '100vh',
    }}
    >
      <Canvas frameloop="demand" style={{
        width: '100%',
        height: '100%',
      }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        {maze && <Walls maze={maze} />}
      </Canvas>
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        p: 2
      }}>
        <Button
          onClick={() => {
            setMaze(generateMaze(50, 50));
          }}
        >
          Generate Maze
        </Button>
      </Box>
    </Box>
  );
}
