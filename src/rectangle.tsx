import { Point } from "./point";

export class Rectangle {
  constructor(topLeft: Point, size: Point) {
    this.topLeft = topLeft;
    this.size = size;
  }
  topLeft: Point;
  size: Point;
}
