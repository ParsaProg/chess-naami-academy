// types/react-chessboard.d.ts
import * as React from "react";

declare module "react-chessboard" {
  // Position can be a FEN string like "start" or a FEN full string
  export type BoardPosition = string | Record<string, string>;

  export interface ChessboardProps {
    position?: BoardPosition;
    boardWidth?: number;
    arePiecesDraggable?: boolean;
    /**
     * onPieceDrop returns boolean:
     * true  => board should accept the move (and board position is controlled by `position`)
     * false => illegal move, chessboard will snap back
     */
    onPieceDrop?: (sourceSquare: string, targetSquare: string, piece?: string) => boolean;
    autoPromoteToQueen?: boolean;
    // add more props here if you use them later
  }

  export const Chessboard: React.FC<ChessboardProps>;
  export default Chessboard;
}
