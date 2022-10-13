import { Point } from "./point";

export class Rectangle {
  constructor(topLeft: Point, size: Point) {
    this.topLeft = topLeft;
    this.size = size;
  }
  topLeft: Point;
  size: Point;

  getTopLeft(): Point {
    return this.topLeft;
  }
  getBottomRight(): Point {
    return new Point(
      this.topLeft.x + this.size.x,
      this.topLeft.y + this.size.y
    );
  }
  getSize(): Point {
    return this.size;
  }
}
