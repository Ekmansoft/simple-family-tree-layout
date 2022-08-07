import { Point } from './point';

export const layoutNextPoint: Point = new Point(200,200);
export const defaultProfileSize: Point = new Point(180, 80);
export const defaultProfileOffsetHorizontal = 220;
//const defaultProfileOffsetVertical: number = 120;
//const defaultFamilyOffsetHorizontal: number = 120;
export const defaultParentOffsetVertical = -100;
export const defaultChildOffsetVertical = 60;
export const defaultFamilySize: Point = new Point(40, 40);

export { Point } from './point';
export { Rectangle } from './rectangle'
export { RootLayout } from './root-layout'
export { FamilyLayout } from './family-layout'
export { ProfileInfo } from './profile-info'
export { createFamilyLayout } from './create-family-layout'
export { RenderFamilySVG } from './render-family-svg'
export { generateLayout } from './generate-layout'
export { RenderProfileSVG } from './render-profile-svg'

