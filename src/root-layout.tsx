import { Point } from './point';
import { FamilyLayout } from './family-layout';

export class RootLayout {
    families: Map<string,FamilyLayout>;
    profiles: Map<string,string>;
    anchorPosition: Point;
    anchorProfile: string;

    constructor()
    {
      this.families = new Map<string,FamilyLayout>();
      this.profiles = new Map<string,string>();
      this.anchorPosition = new Point(100, 100);
      this.anchorProfile = "";
    }
  }
