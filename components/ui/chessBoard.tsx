"use client";

import React, { useEffect, useRef, useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

interface InteractiveChessboardProps {
  pgn?: string;
  fen?: string;
  boardWidth?: number;
}

export default function InteractiveChessboard({
  pgn,
  fen: initialFen,
  boardWidth = 560,
}: InteractiveChessboardProps) {
  const gameRef = useRef(new Chess());
  const [fen, setFen] = useState("start");

  useEffect(() => {
    const game = new Chess();
    if (pgn) {
      try {
        game.loadPgn(pgn);
        console.log("PGN loaded:", game.fen());
      } catch (e) {
        console.error("Failed to load PGN:", e);
      }
    } else if (initialFen) {
        
        //   if (game.load(initialFen)) {
        //     console.log("FEN loaded:", initialFen);
        //   } else {
        //     console.warn("Invalid FEN, resetting to start.");
        //     game.reset();
        //   }
    } else {
      game.reset();
    }
    gameRef.current = game;
    setFen(game.fen());
  }, [pgn, initialFen]);

  const onDrop = (source: string, target: string) => {
    const game = gameRef.current;
    const move = game.move({ from: source, to: target, promotion: "q" });

    if (move === null) return false;

    setFen(game.fen());
    console.log("Move made:", move);
    return true;
  };

  return (
    <div style={{ maxWidth: boardWidth, margin: "0 auto" }}>
      <Chessboard
        position={fen}
        onPieceDrop={onDrop}
        arePiecesDraggable={true}
        boardWidth={boardWidth}
        autoPromoteToQueen={true}
      />
    </div>
  );
}
